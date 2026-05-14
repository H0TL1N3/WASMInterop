import loadWasm, {
    dijkstra_js as dijkstraWasm
} from "./wasm/dijkstra.js";

import { displayResults } from "../utils/uiHandling.js";
import { API_BASE_URL } from "../const.js";
import { DIJKSTRA_OBJS_ARRAY, VALID_NODES } from "./const.js";

// Client JS implementation
function dijkstra(edges, start, end) {
    const graph = new Map();

    for (const edge of edges) {
        const from = edge.start;
        const to = edge.end;
        const weight = edge.weight;

        if (!graph.has(from)) {
            graph.set(from, []);
        }

        graph.get(from).push({
            node: to,
            weight
        });
    }

    const dist = new Map([[start, 0]]);
    const prev = new Map();
    const pq = [[0, start]];

    while (pq.length) {
        pq.sort((a, b) => a[0] - b[0]);

        const [d, node] = pq.shift();

        if (d > (dist.get(node) ?? Infinity)) continue;
        if (node === end) break;

        for (const { node: next, weight } of graph.get(node) ?? []) {
            const nd = d + weight;

            if (nd < (dist.get(next) ?? Infinity)) {
                dist.set(next, nd);
                prev.set(next, node);
                pq.push([nd, next]);
            }
        }
    }

    if (!dist.has(end)) return "No path found";

    const path = [];
    for (let at = end; at !== undefined; at = prev.get(at)) {
        path.push(at);
    }
    return path.reverse().join(" ");
}

// Note for client benchmarks:
// generate copy of the array to avoid mutating the original array:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice

// UI Handling
document.addEventListener("DOMContentLoaded", async () => {
    await loadWasm();

    const startInput = document.getElementById("start-input");
    const endInput = document.getElementById("end-input");

    const runClientJsBtn = document.getElementById("run-client-js");
    const runClientWasmBtn = document.getElementById("run-client-wasm");
    const runServerPythonBtn = document.getElementById("run-server-python");
    const runServerWasmBtn = document.getElementById("run-server-wasm");

    function validateAndGetInput() {
        const start = startInput.value;
        const end = endInput.value;

        // Validation
        if (!VALID_NODES.has(start)) {
            alert(`Invalid start node: ${start}`);
            return null;
        }

        if (!VALID_NODES.has(end)) {
            alert(`Invalid end node: ${end}`);
            return null;
        }

        return { "startPoint": start, "endPoint": end };
    }

    runClientJsBtn.addEventListener("click", () => {
        const { startPoint, endPoint } = validateAndGetInput();
        const clonedArray = DIJKSTRA_OBJS_ARRAY.slice();

        const start = performance.now();
        const result = dijkstra(clonedArray, startPoint, endPoint);
        const end = performance.now();

        displayResults("client-js", end - start, result);
    });

    runClientWasmBtn.addEventListener("click", () => {
        const { startPoint, endPoint } = validateAndGetInput();
        const clonedArray = DIJKSTRA_OBJS_ARRAY.slice();

        const start = performance.now();
        const result = dijkstraWasm(clonedArray, startPoint, endPoint);
        const end = performance.now();

        displayResults("client-wasm", end - start, result);
    });

    runServerPythonBtn.addEventListener("click", async () => {
        const { startPoint, endPoint } = validateAndGetInput();

        const data = await getServerPython(startPoint, endPoint);

        displayResults("server-python", data.time, data.result);
    })

    runServerWasmBtn.addEventListener("click", async () => {
        const { startPoint, endPoint } = validateAndGetInput();

        const data = await getServerWasm(startPoint, endPoint);

        displayResults("server-wasm", data.time, data.result);
    })
});

// Server functions
// "data" has attributes "result" and "time"
async function getServerPython(start, end) {
    try {
        const response = await fetch(`${API_BASE_URL}/python/dijkstra/${start}/${end}`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getServerWasm(start, end) {
    try {
        const response = await fetch(`${API_BASE_URL}/wasm/dijkstra/${start}/${end}`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}
