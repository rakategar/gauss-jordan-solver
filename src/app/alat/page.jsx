
"use client"
import { useState } from "react";
import { gaussElimination } from "../../../utils/gaus";
import { gaussJordan } from "../../../utils/gausJordan";
import { backSubstitution } from "../../../utils/backSubtitution";
import Footer from "../../../utils/Footer";
import Navbar from "../../../utils/Navbar";


export default function Page() {
  const [matrix, setMatrix] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [vector, setVector] = useState([0, 0, 0]);
  const [solution, setSolution] = useState(null);
  const [steps, setSteps] = useState([]);
  const [method, setMethod] = useState("gauss");

  const handleMatrixChange = (i, j, value) => {
    const newMatrix = matrix.map((row, rowIndex) =>
      rowIndex === i
        ? row.map((val, colIndex) => (colIndex === j ? parseFloat(value) : val))
        : row
    );
    setMatrix(newMatrix);
  };

  const handleVectorChange = (i, value) => {
    const newVector = vector.map((val, index) =>
      index === i ? parseFloat(value) : val
    );
    setVector(newVector);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (method === "gauss") {
      const { upperTriangular, newVector, steps } = gaussElimination(matrix, vector);
      const solution = backSubstitution(upperTriangular, newVector);
      setSolution(solution);
      setSteps(steps);
    } else if (method === "gaussJordan") {
      const { solution, steps } = gaussJordan(matrix, vector);
      setSolution(solution);
      setSteps(steps);
    }
  };

  const handleReset = () => {
    setMatrix([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setVector([0, 0, 0]);
    setSolution(null);
    setSteps([]);
  };

  return (
    <div>
      <div className="sticky top-0">

      <Navbar/>
      </div>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="px-20 py-8 bg-white shadow-lg rounded-lg mb-8">
        <h1 className="text-2xl font-bold text-white bg-primary flex justify-center p-4 rounded">
          Matrix Solver
        </h1>
        <div className="flex justify-center gap-4 my-4">
          <button
            onClick={() => setMethod("gauss")}
            className={`btn ${method === "gauss" ? "btn-secondary " : "btn-secondary btn btn-outline"} px-16`}
          >
            Gauss Elimination
          </button>
          <button
            onClick={() => setMethod("gaussJordan")}
            className={`btn ${method === "gaussJordan" ? "btn-secondary " : "btn-secondary btn btn-outline"} px-16`}
          >
            Gauss-Jordan Elimination
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-row justify-center items-center p-4 gap-4">
            <div>
              <h2 className="font-bold">Matrix A</h2>
              {matrix.map((row, i) => (
                <div key={i} className="flex">
                  {row.map((val, j) => (
                    <input
                      key={j}
                      type="number"
                      value={val}
                      onChange={(e) => handleMatrixChange(i, j, e.target.value)}
                      className="input input-bordered w-16 mx-1 mb-2"
                    />
                  ))}
                </div>
              ))}
            </div>
            <h2>=</h2>
            <div className="flex flex-col">
              <h2 className="font-bold">Matrix B</h2>
              {vector.map((val, i) => (
                <input
                  key={i}
                  type="number"
                  value={val}
                  onChange={(e) => handleVectorChange(i, e.target.value)}
                  className="input input-bordered w-16 mb-2"
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="btn btn-accent text-white font-bold mx-auto mr-4 w-32"
            >
              Solve
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-outline text-accent font-bold mx-auto ml-4 w-32"
            >
              Reset
            </button>
          </div>
        </form>
        {solution && (
          <div className="mt-8">
            <h2 className="font-bold text-center">Solution</h2>
            <div className="flex justify-center mt-2">
              {solution.map((val, i) => (
                <p key={i} className="mx-2">
                  x<sub>{i + 1}</sub> = {val}
                </p>
              ))}
            </div>
          </div>
        )}
        {steps.length > 0 && (
          <div className="mt-8">
            <h2 className="font-bold text-center">Iteration Steps</h2>
            <div className="overflow-auto max-h-64">
              {steps.map((step, stepIndex) => (
                <div key={stepIndex} className="my-4">
                  <h3 className="font-bold text-center">
                    Step {stepIndex + 1}
                  </h3>
                  <table className="table-auto mx-auto">
                    <tbody>
                      {step.map((row, i) => (
                        <tr key={i}>
                          {row.map((val, j) => (
                            <td
                              key={j}
                              className="border px-2 py-1 text-center"
                            >
                              {val?.toFixed(2)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="fixed bottom-0">

      <Footer />
      </div>
    </div>
    </div>
  );
}
