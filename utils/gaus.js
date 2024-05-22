// utils/gauss.js
export function gaussElimination(a, b) {
  const n = a.length;
  const aug = a.map((row, i) => [...row, b[i]]);
  const steps = [];

  for (let i = 0; i < n; i++) {
    // Pivoting
    if (aug[i][i] === 0) {
      for (let j = i + 1; j < n; j++) {
        if (aug[j][i] !== 0) {
          [aug[i], aug[j]] = [aug[j], aug[i]];
          break;
        }
      }
    }

    const pivot = aug[i][i];
    if (pivot === 0) continue; // Skip if pivot is still zero

    // Eliminate below
    for (let j = i + 1; j < n; j++) {
      const factor = aug[j][i] / pivot;
      aug[j] = aug[j].map((val, k) => val - factor * aug[i][k]);
    }
    steps.push(JSON.parse(JSON.stringify(aug))); // Store step after elimination
  }

  const upperTriangular = aug.map((row) => row.slice(0, n));
  const newVector = aug.map((row) => row[n]);

  return { upperTriangular, newVector, steps };
}
