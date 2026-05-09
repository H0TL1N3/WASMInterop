import loadWasm, {
    fibonacci_js as fibonacciWasm
} from "./wasm/fibonacci.js";

import { displayResults } from "../utils/uiHandling.js";
import { API_BASE_URL } from "../const.js";

// Client JS implementation
function fibonacci(n) {
    if (n <= 1) {
        return n;
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
}

// UI Handling
document.addEventListener("DOMContentLoaded", async () => {
    await loadWasm();

    const input = document.getElementById("n-input");
    const runClientJsBtn = document.getElementById("run-client-js");
    const runClientWasmBtn = document.getElementById("run-client-wasm");
    const runServerPythonBtn = document.getElementById("run-server-python");
    const runServerWasmBtn = document.getElementById("run-server-wasm");

    function validateAndGetInput() {
        const val = parseInt(input.value);
        if (isNaN(val) || val < 1) {
            alert("Please enter a valid number greater than 1.");
            return null;
        }
        return val;
    }

    runClientJsBtn.addEventListener("click", () => {
        const n = validateAndGetInput();
        if (n === null) return;

        const start = performance.now();
        const result = fibonacci(n);
        const end = performance.now();

        displayResults("client-js", end - start, result);
    });

    runClientWasmBtn.addEventListener("click", () => {
        const n = validateAndGetInput();
        if (n === null) return;

        const start = performance.now();
        const result = fibonacciWasm(n);
        const end = performance.now();

        displayResults("client-wasm", end - start, result);
    });

    runServerPythonBtn.addEventListener("click", async () => {
        const n = validateAndGetInput();
        if (n === null) return;

        const data = await getServerPython(n);

        displayResults("server-python", data.time, data.result);
    })

    runServerWasmBtn.addEventListener("click", async () => {
        const n = validateAndGetInput();
        if (n === null) return;

        const data = await getServerWasm(n);

        displayResults("server-wasm", data.time, data.result);
    })
});

// Server functions
// "data" has attributes "result" and "time"
async function getServerPython(n) {
    try {
        const response = await fetch(`${API_BASE_URL}/python/fibonacci/${n}`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getServerWasm(n) {
    try {
        const response = await fetch(`${API_BASE_URL}/wasm/fibonacci/${n}`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}
