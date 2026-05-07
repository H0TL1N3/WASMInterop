import loadWasm, {
    bubble_sort_js as bubbleSortWasm
} from "./wasm/bubble_sort.js";

import { displayResults } from "../utils/uiHandling.js";
import { API_BASE_URL, BUBBLE_SORT_ARRAY } from "../const.js";

// function used to generate the randomized array,
// the array is stored as constants on both sides:
// BUBBLE_SORT_ARRAY on the frontend
// BUBBLE_SORT_LIST on the backend.
// reference: https://stackoverflow.com/a/43044960
function generateRandomArray(n) {
    return Array.from(
        { length: n },
        () => Math.floor(Math.random() * n)
    );
}

// Client JS implementation
function bubbleSort(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < (arr.length - i - 1); j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
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
        const clonedArray = BUBBLE_SORT_ARRAY.slice();

        const start = performance.now();
        const result = bubbleSort(clonedArray);
        const end = performance.now();

        displayResults("client-js", end - start, `Sorted an array with ${result.length} elements`);
    });

    runClientWasmBtn.addEventListener("click", () => {
        const clonedArray = BUBBLE_SORT_ARRAY.slice();

        const start = performance.now();
        const result = bubbleSortWasm(clonedArray);
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
});

// Server functions
// "data" has attributes "result" and "time"
async function getServerPython() {
    try {
        const response = await fetch(`${API_BASE_URL}/python/bubbleSort`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getServerWasm() {
    try {
        const response = await fetch(`${API_BASE_URL}/wasm/bubbleSort`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}
