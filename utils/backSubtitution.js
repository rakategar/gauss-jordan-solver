// utils/backSubstitution.js
export function backSubstitution(upperTriangular, newVector) {
  const n = upperTriangular.length;
  const solution = Array(n).fill(0);

  for (let i = n - 1; i >= 0; i--) {
    solution[i] = newVector[i];
    for (let j = i + 1; j < n; j++) {
      solution[i] -= upperTriangular[i][j] * solution[j];
    }
    solution[i] /= upperTriangular[i][i];
  }

  return solution;
}
