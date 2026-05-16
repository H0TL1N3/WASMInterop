from wasm_runtime import WasmRuntime

# WASM load
_runtime = WasmRuntime("wasm_modules/string_transformation.wasm")

# Internal funcs
def string_transformation_python_internal(string: str):
    upper_lower_diff = 32
    is_first_letter = True
    result = ""

    for ch in string:
        code = ord(ch)

        # Not a Latin letter
        if not ((65 <= code <= 90) or (97 <= code <= 122)):
            result += ch
            is_first_letter = True

        elif is_first_letter:
            if 97 <= code <= 122:
                code -= upper_lower_diff

            result += chr(code)
            is_first_letter = False

        else:
            if 65 <= code <= 90:
                code += upper_lower_diff

            result += chr(code)

    return result

def string_transformation_wasm_internal(string: str):
    # Allocate Wasm memory, write input array into it
    input_bytes = string.encode("utf-8")
    length = len(input_bytes)
    in_ptr = _runtime.call("string_transformation_input_alloc", length)
    memory = _runtime.instance.exports(_runtime.store)["memory"]
    memory.write(_runtime.store, input_bytes, in_ptr)

    # Access Wasm memory, read the utf-8 string, convert it into Python string via data.decode
    out_ptr = _runtime.call("string_transformation_raw", in_ptr, length)
    out_len = _runtime.call("string_transformation_len")
    data = memory.read(_runtime.store, out_ptr, out_ptr + out_len)
    result = data.decode("utf-8")

    return result
