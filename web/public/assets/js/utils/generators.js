// reference: https://stackoverflow.com/a/43044960

// function used to generate the randomized integer array,
// the array is stored as constants on both sides:
// BUBBLE_SORT_ARRAY on the frontend
// BUBBLE_SORT_LIST on the backend.
export function generateRandomIntegerArray(n) {
    return Array.from(
        { length: n },
        () => Math.floor(Math.random() * n)
    );
}

// function used to generate the randomized floating-point array,
// the array is stored as constants on both sides:
// QUICK_SORT_ARRAY on the frontend
// QUICK_SORT_LIST on the backend.
export function generateRandomFloatArray(n) {
    return Array.from(
        { length: n },
        () => Math.random() * n
    );
}
