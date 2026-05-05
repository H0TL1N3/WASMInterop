from wasm_runtime import WasmRuntime

# WASM load
_runtime = WasmRuntime("wasm_modules/nested_loops.wasm")

# Internal funcs
def nested_loops_python_internal(n: int):
    loop_sum = 0

    for i in range(n):
        for j in range(n):
            loop_sum += i * j

    return loop_sum

def nested_loops_wasm_internal(n: int):
    return _runtime.call("nested_loops_raw", n)
