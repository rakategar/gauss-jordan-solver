// utils/gaussJordan.js
export function gaussJordan(a, b) {
    const n = a.length;
    const aug = a.map((row, i) => [...row, b[i]]);

    for (let i = 0; i < n; i++) {
        // Find pivot
        if (aug[i][i] === 0) {
            for (let j = i + 1; j < n; j++) {
                if (aug[j][i] !== 0) {
                    [aug[i], aug[j]] = [aug[j], aug[i]];
                    break;
                }
            }
        }

        // Normalize pivot row
        const pivot = aug[i][i];
        aug[i] = aug[i].map(x => x / pivot);

        // Eliminate other rows
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                const factor = aug[j][i];
                aug[j] = aug[j].map((x, k) => x - factor * aug[i][k]);
            }
        }
    }

    return aug.map(row => row[row.length - 1]);
}
