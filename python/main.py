# The base was taken from https://fastapi.tiangolo.com/#create-it

# note about time:
# it returns measurements as seconds (s),
# so we need to multiply output by 1000 to get milliseconds (ms)
import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pi_approx import pi_approx_python_internal, pi_approx_wasm_internal
from nested_loops import nested_loops_python_internal, nested_loops_wasm_internal
from fibonacci import fibonacci_python_internal, fibonacci_wasm_internal
from sieve import sieve_python_internal, sieve_wasm_internal
# For functions that pass arrays, ensure that at callsite a clone of the array is created
from bubble_sort import bubble_sort_python_internal, bubble_sort_wasm_internal
from quick_sort import quick_sort_python_internal, quick_sort_wasm_internal
from string_transformation import string_transformation_python_internal, string_transformation_wasm_internal

from const.bubble_sort import BUBBLE_SORT_LIST
from const.quick_sort import QUICK_SORT_LIST
from const.string_transformation import STRING_TRANSFORMATION

app = FastAPI()

# To bypass CORS errors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/python/piApprox/{n}")
def pi_approx_python(n: int):
    start_time = time.perf_counter()

    result = pi_approx_python_internal(n)

    finish_time = (time.perf_counter() - start_time) * 1000

    return {"result": result, "time": finish_time}

@app.get("/wasm/piApprox/{n}")
def pi_approx_wasm(n: int):
    start_time = time.perf_counter()

    result = pi_approx_wasm_internal(n)

    finish_time = (time.perf_counter() - start_time) * 1000

    return {"result": result, "time": finish_time}

@app.get("/python/nestedLoops/{n}")
def nested_loops_python(n: int):
    start_time = time.perf_counter()

    result = nested_loops_python_internal(n)

    finish_time = (time.perf_counter() - start_time) * 1000

    return {"result": result, "time": finish_time}

@app.get("/wasm/nestedLoops/{n}")
def nested_loops_wasm(n: int):
    start_time = time.perf_counter()

    result = nested_loops_wasm_internal(n)

    finish_time = (time.perf_counter() - start_time) * 1000

    return {"result": result, "time": finish_time}

@app.get("/python/fibonacci/{n}")
def fibonacci_python(n: int):
    start_time = time.perf_counter()

    result = fibonacci_python_internal(n)

    finish_time = (time.perf_counter() - start_time) * 1000

    return {"result": result, "time": finish_time}

@app.get("/wasm/fibonacci/{n}")
def fibonacci_wasm(n: int):
    start_time = time.perf_counter()

    result = fibonacci_wasm_internal(n)

    finish_time = (time.perf_counter() - start_time) * 1000

    return {"result": result, "time": finish_time}

@app.get("/python/sieve/{n}")
def sieve_python(n: int):
    start_time = time.perf_counter()

    result = sieve_python_internal(n)

    finish_time = (time.perf_counter() - start_time) * 1000

    return {"result": result, "time": finish_time}

@app.get("/wasm/sieve/{n}")
def sieve_wasm(n: int):
    start_time = time.perf_counter()

    result = sieve_wasm_internal(n)

    finish_time = (time.perf_counter() - start_time) * 1000

    return {"result": result, "time": finish_time}

@app.get("/python/bubbleSort")
def bubble_sort_python():
    list_clone = BUBBLE_SORT_LIST.copy()
    start_time = time.perf_counter()

    result = bubble_sort_python_internal(list_clone)

    finish_time = (time.perf_counter() - start_time) * 1000

    return {"result": result, "time": finish_time}

@app.get("/wasm/bubbleSort")
def bubble_sort_wasm():
    list_clone = BUBBLE_SORT_LIST.copy()
    start_time = time.perf_counter()

    result = bubble_sort_wasm_internal(list_clone)

    finish_time = (time.perf_counter() - start_time) * 1000

    return {"result": result, "time": finish_time}

@app.get("/python/quickSort")
def quick_sort_python():
    list_clone = QUICK_SORT_LIST.copy()
    start_time = time.perf_counter()

    result = quick_sort_python_internal(list_clone)

    finish_time = (time.perf_counter() - start_time) * 1000

    return {"result": result, "time": finish_time}

@app.get("/wasm/quickSort")
def quick_sort_wasm():
    list_clone = QUICK_SORT_LIST.copy()
    start_time = time.perf_counter()

    result = quick_sort_wasm_internal(list_clone)

    finish_time = (time.perf_counter() - start_time) * 1000

    return {"result": result, "time": finish_time}

@app.get("/python/quickSortShort")
def quick_sort_short_python():
    list_clone = QUICK_SORT_LIST.copy()[:1000]
    start_time = time.perf_counter()

    result = quick_sort_python_internal(list_clone)

    finish_time = (time.perf_counter() - start_time) * 1000

    return {"result": result, "time": finish_time}

@app.get("/wasm/quickSortShort")
def quick_sort_short_wasm():
    list_clone = QUICK_SORT_LIST.copy()[:1000]
    start_time = time.perf_counter()

    result = quick_sort_wasm_internal(list_clone)

    finish_time = (time.perf_counter() - start_time) * 1000

    return {"result": result, "time": finish_time}

@app.get("/python/stringTransformation")
def string_transformation_python():
    string_clone = STRING_TRANSFORMATION[:]
    start_time = time.perf_counter()

    result = string_transformation_python_internal(string_clone)

    finish_time = (time.perf_counter() - start_time) * 1000

    return {"result": result, "time": finish_time}

@app.get("/wasm/stringTransformation")
def string_transformation_wasm():
    string_clone = STRING_TRANSFORMATION[:]
    start_time = time.perf_counter()

    result = string_transformation_wasm_internal(string_clone)

    finish_time = (time.perf_counter() - start_time) * 1000

    return {"result": result, "time": finish_time}
