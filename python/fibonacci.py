from wasm_runtime import WasmRuntime

# WASM load
_runtime = WasmRuntime("wasm_modules/fibonacci.wasm")

# Internal funcs
def fibonacci_python_internal(n: int):
    if (n <= 1):
        return n
    
    return fibonacci_python_internal(n - 1) + fibonacci_python_internal (n - 2)

def fibonacci_wasm_internal(n: int):
    return _runtime.call("fibonacci_raw", n)
