// reference: https://stackoverflow.com/a/43044960

// function used to generate the randomized integer array,
// the array is stored as constants on both sides:
// BUBBLE_SORT_ARRAY on the frontend
// BUBBLE_SORT_LIST on the backend.
export function generateRandomIntegerArray(n = 1000) {
    return Array.from(
        { length: n },
        () => Math.floor(Math.random() * n)
    );
}

// function used to generate the randomized floating-point array,
// the array is stored as constants on both sides:
// QUICK_SORT_ARRAY on the frontend
// QUICK_SORT_LIST on the backend.
export function generateRandomFloatArray(n = 25000) {
    return Array.from(
        { length: n },
        () => Math.random() * n
    );
}

// function used to generate the randomized string,
// the string is stored as constants on both sides:
// STRING_TRANSFORMATION on the frontend
// STRING_TRANSFORMATION on the backend.
export function generateRandomString(word = "test", n = 1000) {
    const asciiSeparators = [",", ".", ":", ";", "|", "1", "!", "2", "@", "3", "#", "4", "$", "5", "%", "6", "^", "7", "&", "8", "*", "9", "(", "0", ")", "-", "_", "=", "+"];
    const utf8Separators = ["→", "∞", "∑", "∏", "∈", "⌈", "⌉", "⌊", "⌋", "¬", "α", "∨", "β", "≠", "≡", "≤", "≪", "⇒", "⇔", "⇌", "Ω", "⌀"];

    return Array.from({ length: n }, (_, i) => {
        const useAscii = (i + 1) % 2 === 1;

        const pool = useAscii ? asciiSeparators : utf8Separators;
        const randomSeparator = pool[Math.floor(Math.random() * pool.length)];

        return word + randomSeparator;
    }).join("");
}

// function used to generate a predetermined graph for Djikstra,
// the array is stored as constants on both sides:
// DIJKSTRA_OBJS_ARRAY on the frontend
// DIJKSTRA_OBJS_LIST on the backend.
export function generateGraph(nodeCount = 1000, extraEdges = 3000) {
    const edges = [];

    // Generate node names
    const nodes = ["A"];
    for (let i = 1; i < nodeCount - 1; i++) {
        nodes.push(`N${i}`);
    }
    nodes.push("B");

    // Create guaranteed main path:
    // A -> N1 -> N2 -> ... -> B
    for (let i = 0; i < nodes.length - 1; i++) {
        edges.push({
            start: nodes[i],
            end: nodes[i + 1],
            weight: 1
        });
    }

    // Add many distracting edges
    for (let i = 0; i < extraEdges; i++) {
        const from = nodes[Math.floor(Math.random() * nodes.length)];
        const to = nodes[Math.floor(Math.random() * nodes.length)];

        if (from === to) continue;

        edges.push({
            start: from,
            end: to,
            weight: Math.floor(Math.random() * 20) + 5
        });
    }

    return edges;
}
