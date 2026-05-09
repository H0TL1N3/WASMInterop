import struct

from wasm_runtime import WasmRuntime

# WASM load
_runtime = WasmRuntime("wasm_modules/quick_sort.wasm")

# Internal funcs
def quick_sort_python_internal(arr: list[float], low: int = 0, high: int | None = None):
    if high is None:
        high = len(arr) - 1

    if low >= high:
        return arr

    pivot = arr[high]
    i = low

    for j in range(low, high):
        if arr[j] < pivot:
            arr[i], arr[j] = arr[j], arr[i]
            i += 1

    arr[i], arr[high] = arr[high], arr[i]

    quick_sort_python_internal(arr, low, i - 1)
    quick_sort_python_internal(arr, i + 1, high)

    return arr

def quick_sort_wasm_internal(arr: list[float]):
    # Allocate Wasm memory, write input array into it
    length = len(arr)
    in_ptr = _runtime.call("quick_sort_input_alloc", length)
    memory = _runtime.instance.exports(_runtime.store)["memory"]
    for i, v in enumerate(arr):
        memory.write(_runtime.store, struct.pack("<d", v), in_ptr + i * 8)

    # Access Wasm memory, read the u32 array, convert it into Python list via struct
    out_ptr = _runtime.call("quick_sort_raw", in_ptr, length)
    out_len = _runtime.call("quick_sort_len")
    data = memory.read(_runtime.store, out_ptr, out_ptr + out_len * 8)
    result = list(struct.unpack(f"{out_len}d", data))

    # Free Wasm memory and return
    _runtime.call("quick_sort_free", out_ptr, out_len)
    _runtime.call("quick_sort_input_dealloc", in_ptr, length)

    return result
