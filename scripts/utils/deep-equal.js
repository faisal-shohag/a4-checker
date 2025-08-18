// Helper function for deep comparison of objects and arrays
const isDeepEqual = (a, b) => {
    if (a === b) return true;
    if (
        (typeof a === "number" && typeof b === "string" && a == b) ||
        (typeof a === "string" && typeof b === "number" && a == b)
    ) {
        return true;
    }
    if (a && b && typeof a === 'object' && typeof b === 'object') {
        if (Array.isArray(a) !== Array.isArray(b)) return false;
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        if (keysA.length !== keysB.length) return false;
        for (const key of keysA) {
            if (!keysB.includes(key) || !isDeepEqual(a[key], b[key])) {
                return false;
            }
        }
        return true;
    }
    return false;
};