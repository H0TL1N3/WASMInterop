import loadWasm, {
    string_transformation_js as stringTransformationWasm
} from "./wasm/string_transformation.js";

import { displayResults } from "../utils/uiHandling.js";
import { API_BASE_URL } from "../const.js";
import { STRING_TRANSFORMATION } from "./const.js";

// Client JS implementation
function stringTransformation(str) {
    const upperLowerDiff = 32;
    let isFirstLetter = true;
    let result = "";

    for (let i = 0; i < str.length; i++) {
        let code = str.charCodeAt(i);

        // Not a latin letter
        if (code < 65 || (code > 90 && code < 97) || code > 122) {
            result += str[i];
            isFirstLetter = true;
        } else if (isFirstLetter) {
            if (code >= 97 && code <= 122) {
                code -= upperLowerDiff;
            }

            result += String.fromCharCode(code);
            isFirstLetter = false;
        } else {
            if (code >= 65 && code <= 90) {
                code += upperLowerDiff;
            }

            result += String.fromCharCode(code);
        }
    }

    return result;
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
        const clonedString = STRING_TRANSFORMATION.slice();

        const start = performance.now();
        const result = stringTransformation(clonedString);
        const end = performance.now();

        displayResults("client-js", end - start, `Transformed a string with ${result.length} symbols`);
    });

    runClientWasmBtn.addEventListener("click", () => {
        const clonedString = STRING_TRANSFORMATION.slice();

        const start = performance.now();
        const result = stringTransformationWasm(clonedString);
        const end = performance.now();

        displayResults("client-wasm", end - start, `Transformed a string with ${result.length} symbols`);
    });

    runServerPythonBtn.addEventListener("click", async () => {
        const data = await getServerPython();

        displayResults("server-python", data.time, `Transformed a string with ${data.result.length} symbols`);
    })

    runServerWasmBtn.addEventListener("click", async () => {
        const data = await getServerWasm();

        displayResults("server-wasm", data.time, `Transformed a string with ${data.result.length} symbols`);
    })
});

// Server functions
// "data" has attributes "result" and "time"
async function getServerPython() {
    try {
        const response = await fetch(`${API_BASE_URL}/python/stringTransformation`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getServerWasm() {
    try {
        const response = await fetch(`${API_BASE_URL}/wasm/stringTransformation`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}
