import math
import struct

from wasm_runtime import WasmRuntime

# WASM load
_runtime = WasmRuntime("wasm_modules/sieve.wasm")

# Internal funcs
def sieve_python_internal(n: int):
    # Initialization
    is_prime = [1] * (n + 1)
    is_prime[0] = 0
    is_prime[1] = 0

    # Find primes
    limit = int(math.sqrt(n))
    for i in range(2, limit + 1):
        if is_prime[i] == 1:
            for j in range(i * i, n + 1, i):
                is_prime[j] = 0

    # Collect results
    result = []
    for i in range(2, n + 1):
        if is_prime[i] == 1:
            result.append(i)

    return result

def sieve_wasm_internal(n: int):
    # Call Wasm function, calculate, get length, return early in an edge case
    ptr = _runtime.call("sieve_raw", n)
    length = _runtime.call("sieve_len")
    if length == 0:
        return []

    # Access Wasm memory, read the u32 array, convert it into Python list via struct
    memory = _runtime.instance.exports(_runtime.store)["memory"]
    data = memory.read(_runtime.store, ptr, ptr + length * 4)
    result = list(struct.unpack(f"{length}I", data))

    # Free Wasm memory (since length != 0) and return
    _runtime.call("sieve_free", ptr, length)

    return result
