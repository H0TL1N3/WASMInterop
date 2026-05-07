import struct

from wasm_runtime import WasmRuntime

# WASM load
_runtime = WasmRuntime("wasm_modules/bubble_sort.wasm")

# Internal funcs
def bubble_sort_python_internal(arr: list[int]):
    for i in range(len(arr)):
        for j in range(len(arr) - i - 1):
            if arr[j] > arr[j + 1]:
                temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
    return arr

def bubble_sort_wasm_internal(arr: list[int]):
    # Allocate Wasm memory, write input array into it
    length = len(arr)
    in_ptr = _runtime.call("bubble_sort_input_alloc", length)
    memory = _runtime.instance.exports(_runtime.store)["memory"]
    for i, v in enumerate(arr):
        memory.write(_runtime.store, struct.pack("<i", v), in_ptr + i * 4)

    # Access Wasm memory, read the u32 array, convert it into Python list via struct
    out_ptr = _runtime.call("bubble_sort_raw", in_ptr, length)
    out_len = _runtime.call("bubble_sort_len")
    data = memory.read(_runtime.store, out_ptr, out_ptr + out_len * 4)
    result = list(struct.unpack(f"{out_len}i", data))

    # Free Wasm memory and return
    _runtime.call("bubble_sort_free", out_ptr, out_len)
    _runtime.call("bubble_sort_input_dealloc", in_ptr, length)

    return result
