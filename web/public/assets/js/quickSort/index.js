import loadWasm, {
    quick_sort_js as quickSortWasm
} from "./wasm/quick_sort.js";

import { displayResults } from "../utils/uiHandling.js";
import { API_BASE_URL } from "../const.js";;
import { QUICK_SORT_ARRAY } from "./const.js";

// Client JS implementation
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low >= high) return arr;

    const pivot = arr[high];
    let i = low;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            const tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
            i++;
        }
    }

    const tmp = arr[i];
    arr[i] = arr[high];
    arr[high] = tmp;

    quickSort(arr, low, i - 1);
    quickSort(arr, i + 1, high);

    return arr;
}

// Note for client benchmarks:
// generate copy of the array to avoid mutating the original array:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice

// UI Handling
document.addEventListener("DOMContentLoaded", async () => {
    await loadWasm();

    const runClientJsBtn = document.getElementById("run-client-js");
    const runClientWasmBtn = document.getElementById("run-client-wasm");
    const runServerPythonBtn = document.getElementById("run-server-python");
    const runServerWasmBtn = document.getElementById("run-server-wasm");

    runClientJsBtn.addEventListener("click", () => {
        const clonedArray = QUICK_SORT_ARRAY.slice();

        const start = performance.now();
        const result = quickSort(clonedArray);
        const end = performance.now();

        displayResults("client-js", end - start, `Sorted an array with ${result.length} elements`);
    });

    runClientWasmBtn.addEventListener("click", () => {
        const clonedArray = QUICK_SORT_ARRAY.slice();

        const start = performance.now();
        const result = quickSortWasm(clonedArray);
        const end = performance.now();

        displayResults("client-wasm", end - start, `Sorted an array with ${result.length} elements`);
    });

    runServerPythonBtn.addEventListener("click", async () => {
        const data = await getServerPython();

        displayResults("server-python", data.time, `Sorted an array with ${data.result.length} elements`);
    })

    runServerWasmBtn.addEventListener("click", async () => {
        const data = await getServerWasm();

        displayResults("server-wasm", data.time, `Sorted an array with ${data.result.length} elements`);
    })

    const runClientJsShortBtn = document.getElementById("run-client-js-short");
    const runClientWasmShortBtn = document.getElementById("run-client-wasm-short");
    const runServerPythonShortBtn = document.getElementById("run-server-python-short");
    const runServerWasmShortBtn = document.getElementById("run-server-wasm-short");

    runClientJsShortBtn.addEventListener("click", () => {
        const clonedArray = QUICK_SORT_ARRAY.slice(0, 1000);

        const start = performance.now();
        const result = quickSort(clonedArray);
        const end = performance.now();

        displayResults("client-js-short", end - start, `Sorted an array with ${result.length} elements`);
    });

    runClientWasmShortBtn.addEventListener("click", () => {
        const clonedArray = QUICK_SORT_ARRAY.slice(0, 1000);

        const start = performance.now();
        const result = quickSortWasm(clonedArray);
        const end = performance.now();

        displayResults("client-wasm-short", end - start, `Sorted an array with ${result.length} elements`);
    });

    runServerPythonShortBtn.addEventListener("click", async () => {
        const data = await getServerShortPython();

        displayResults("server-python-short", data.time, `Sorted an array with ${data.result.length} elements`);
    })

    runServerWasmShortBtn.addEventListener("click", async () => {
        const data = await getServerShortWasm();

        displayResults("server-wasm-short", data.time, `Sorted an array with ${data.result.length} elements`);
    })
});

// Server functions
// "data" has attributes "result" and "time"
async function getServerPython() {
    try {
        const response = await fetch(`${API_BASE_URL}/python/quickSort`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getServerWasm() {
    try {
        const response = await fetch(`${API_BASE_URL}/wasm/quickSort`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getServerShortPython() {
    try {
        const response = await fetch(`${API_BASE_URL}/python/quickSortShort`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getServerShortWasm() {
    try {
        const response = await fetch(`${API_BASE_URL}/wasm/quickSortShort`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}

