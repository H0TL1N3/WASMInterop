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

// function used to generate the randomized string,
// the string is stored as constants on both sides:
// STRING_TRANSFORMATION on the frontend
// STRING_TRANSFORMATION on the backend.
export function generateRandomString(word, n) {
    const asciiSeparators = [",", ".", ":", ";", "|", "1", "!", "2", "@", "3", "#", "4", "$", "5", "%", "6", "^", "7", "&", "8", "*", "9", "(", "0", ")", "-", "_", "=", "+"];
    const utf8Separators = ["→", "∞", "∑", "∏", "∈", "⌈", "⌉", "⌊", "⌋", "¬", "α", "∨", "β", "≠", "≡", "≤", "≪", "⇒", "⇔", "⇌", "Ω", "⌀"];

    return Array.from({ length: n }, (_, i) => {
        const useAscii = (i + 1) % 2 === 1;

        const pool = useAscii ? asciiSeparators : utf8Separators;
        const randomSeparator = pool[Math.floor(Math.random() * pool.length)];

        return word + randomSeparator;
    }).join("");
}
