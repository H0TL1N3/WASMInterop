export function displayResults(prefix, time, result) {
    document.getElementById(`${prefix}-result`).textContent = result.toString();
    document.getElementById(`${prefix}-time`).textContent = time;
}
