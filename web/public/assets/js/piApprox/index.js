import loadWasm, {
    pi_approx_js as piApproxWasm
} from "./wasm/pi_approx.js";

import { displayResults } from "../utils/uiHandling.js";
import { API_BASE_URL } from "../const.js";

// Client JS implementation
function piApprox(n) {
    const span = 1 / n;
    const span4 = 4 * span;
    const halfSpanSqAdd1 = (span * span) / 4 + 1;

    let acc = 0;
    let x = 0;

    for (let i = 0; i < n; i++) {
        acc += span4 / (x * (x + span) + halfSpanSqAdd1);
        x += span;
    }

    return acc;
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
        const result = piApprox(n);
        const end = performance.now();

        displayResults("client-js", end - start, result);
    });

    runClientWasmBtn.addEventListener("click", () => {
        const n = validateAndGetInput();
        if (n === null) return;

        const start = performance.now();
        const result = piApproxWasm(n);
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
        const response = await fetch(`${API_BASE_URL}/python/piApprox/${n}`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getServerWasm(n) {
    try {
        const response = await fetch(`${API_BASE_URL}/wasm/piApprox/${n}`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}
