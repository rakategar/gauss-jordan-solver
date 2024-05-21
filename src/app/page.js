// pages/index.js
"use client";
import { useState } from "react";
import { gaussJordan } from "../../utils/gausJordan";

export default function Home() {
  const [matrix, setMatrix] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [vector, setVector] = useState([0, 0, 0]);
  const [solution, setSolution] = useState(null);
  const [steps, setSteps] = useState([]);

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
    const { solution, steps } = gaussJordan(matrix, vector);
    setSolution(solution);
    setSteps(steps);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="px-20 py-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-white bg-primary flex justify-center p-4 rounded">
          Gauss-Jordan Elimination Solver
        </h1>
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

          <button
            type="submit"
            className="btn btn-accent text-white font-bold mx-auto mt-4 w-32"
          >
            Solve
          </button>
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
                              {val.toFixed(2)}
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
      <footer className="footer items-center p-4 bg-neutral text-neutral-content fixed bottom-0 w-full">
        <aside className="items-center grid-flow-col">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current"
          >
            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>
          <p>{"Copyright © 2024 - Kelompok 19 < Tim Gacor >"}</p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
            </svg>
          </a>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
        </nav>
      </footer>
    </div>
  );
}
