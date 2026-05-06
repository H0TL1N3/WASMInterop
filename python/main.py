# The base was taken from https://fastapi.tiangolo.com/#create-it
import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pi_approx import pi_approx_python_internal, pi_approx_wasm_internal
from nested_loops import nested_loops_python_internal, nested_loops_wasm_internal
from sieve import sieve_python_internal, sieve_wasm_internal

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
    start_time = time.time()

    result = pi_approx_python_internal(n)

    finish_time = time.time() - start_time

    return {"result": result, "time": finish_time}

@app.get("/wasm/piApprox/{n}")
def pi_approx_wasm(n: int):
    start_time = time.time()

    result = pi_approx_wasm_internal(n)

    finish_time = time.time() - start_time

    return {"result": result, "time": finish_time}

@app.get("/python/nestedLoops/{n}")
def nested_loops_python(n: int):
    start_time = time.time()

    result = nested_loops_python_internal(n)

    finish_time = time.time() - start_time

    return {"result": result, "time": finish_time}

@app.get("/wasm/nestedLoops/{n}")
def nested_loops_wasm(n: int):
    start_time = time.time()

    result = nested_loops_wasm_internal(n)

    finish_time = time.time() - start_time

    return {"result": result, "time": finish_time}

@app.get("/python/sieve/{n}")
def sieve_python(n: int):
    start_time = time.time()

    result = sieve_python_internal(n)

    finish_time = time.time() - start_time

    return {"result": result, "time": finish_time}

@app.get("/wasm/sieve/{n}")
def sieve_wasm(n: int):
    start_time = time.time()

    result = sieve_wasm_internal(n)

    finish_time = time.time() - start_time

    return {"result": result, "time": finish_time}
