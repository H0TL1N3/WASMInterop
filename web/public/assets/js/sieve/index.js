import loadWasm, {
    sieve_js as sieveWasm
} from "./wasm/sieve.js";

import { displayResults } from "../utils/uiHandling.js";
import { API_BASE_URL } from "../const.js";

// Client JS implementation
function sieve(n) {
    // Initialization
    const isPrime = new Int8Array(n + 1).fill(1);
    isPrime[0] = 0;
    isPrime[1] = 0;

    // Find primes
    const limit = Math.floor(Math.sqrt(n));
    for (let i = 2; i <= limit; i++) {
        if (isPrime[i] === 1) {
            for (let j = i * i; j <= n; j += i) {
                isPrime[j] = 0;
            }
        }
    }

    // Collect results
    let count = 0;
    for (let i = 2; i <= n; i++) {
        if (isPrime[i] == 1) count++;
    }
    const result = new Int32Array(count);
    let index = 0;
    for (let i = 2; i <= n; i++) {
        if (isPrime[i] === 1) {
            result[index] = i;
            index++;
        }
    }

    return result;
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
        const result = sieve(n);
        const end = performance.now();

        displayResults("client-js", end - start, `Found ${result.length} primes`);
    });

    runClientWasmBtn.addEventListener("click", () => {
        const n = validateAndGetInput();
        if (n === null) return;

        const start = performance.now();
        const result = sieveWasm(n);
        const end = performance.now();

        displayResults("client-wasm", end - start, `Found ${result.length} primes`);
    });

    runServerPythonBtn.addEventListener("click", async () => {
        const n = validateAndGetInput();
        if (n === null) return;

        const data = await getServerPython(n);

        displayResults("server-python", data.time, `Found ${data.result.length} primes`);
    })

    runServerWasmBtn.addEventListener("click", async () => {
        const n = validateAndGetInput();
        if (n === null) return;

        const data = await getServerWasm(n);

        displayResults("server-wasm", data.time, `Found ${data.result.length} primes`);
    })
});

// Server functions
// "data" has attributes "result" and "time"
async function getServerPython(n) {
    try {
        const response = await fetch(`${API_BASE_URL}/python/sieve/${n}`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getServerWasm(n) {
    try {
        const response = await fetch(`${API_BASE_URL}/wasm/sieve/${n}`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}
