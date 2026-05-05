from wasm_runtime import WasmRuntime

# WASM load
_runtime = WasmRuntime("wasm_modules/pi_approx.wasm")

# Internal funcs
def pi_approx_python_internal(n: int):
    span = 1 / n
    span4 = 4 * span
    halfSpanSqAdd1 = (span * span) / 4 + 1

    acc = 0
    x = 0

    for i in range(n):
        acc += span4 / (x * (x + span) + halfSpanSqAdd1)
        x += span

    return acc

def pi_approx_wasm_internal(n: int):
    return _runtime.call("pi_approx_raw", n)
