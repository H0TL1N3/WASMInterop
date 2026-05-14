from typing import List, TypedDict
import json
import struct

from wasm_runtime import WasmRuntime

# WASM load
_runtime = WasmRuntime("wasm_modules/dijkstra.wasm")

# Helper class for function typing
class Edge(TypedDict):
    start: str
    end: str
    weight: int

# Internal funcs
def dijkstra_python_internal(edges: list[Edge], start: str, end: str):
    graph = {}

    for edge in edges:
        from_node = edge["start"]
        to = edge["end"]
        weight = edge["weight"]

        graph.setdefault(from_node, []).append({
            "node": to,
            "weight": weight
        })

    dist = {start: 0}
    prev = {}
    pq = [[0, start]]

    while pq:
        pq.sort(key=lambda x: x[0])

        d, node = pq.pop(0)

        if d > dist.get(node, float("inf")):
            continue
        if node == end:
            break

        for neighbor in graph.get(node, []):
            next_node = neighbor["node"]
            weight = neighbor["weight"]
            nd = d + weight

            if nd < dist.get(next_node, float("inf")):
                dist[next_node] = nd
                prev[next_node] = node
                pq.append([nd, next_node])

    if end not in dist:
        return "No path found"

    path = []
    at = end
    while at is not None:
        path.append(at)
        at = prev.get(at)
    return " ".join(reversed(path))

def dijkstra_wasm_internal(edges: list[Edge], start: str, end: str):
    # Allocate Wasm memory, write input into it as JSON
    payload = json.dumps({
        "start": start,
        "end": end,
        "edges": edges
    })
    input_bytes = payload.encode("utf-8")
    length = len(input_bytes)
    in_ptr = _runtime.call("dijkstra_input_alloc", length)
    memory = _runtime.instance.exports(_runtime.store)["memory"]
    memory.write(_runtime.store, input_bytes, in_ptr)

    # Access Wasm memory, read the u32 array, convert it into Python list via struct
    out_ptr = _runtime.call("dijkstra_raw", in_ptr, length)
    out_len = _runtime.call("dijkstra_len")

    # Access Wasm memory, read the utf-8 string
    data = memory.read(_runtime.store, out_ptr, out_ptr + out_len)
    result = data.decode("utf-8")

    # Free Wasm memory and return
    _runtime.call("dijkstra_free", out_ptr, out_len)

    return result
