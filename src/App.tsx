import React, { useEffect, useState } from "react";

function App() {
  const [startText, setStartText] = useState<"X" | "O">("X");

  const [startCells, setStartCells] = useState(new Array(9).fill(""));

  const [startAgain, setStartAgain] = useState(false);

  const [endText, setEndText] = useState("");

  const cellsFilled = startCells.every((element) => element !== "");

  const startAgainHandler = () => {
    setStartCells(new Array(9).fill(""));

    setStartText("X");

    setEndText("");

    setStartAgain(false);
  };

  const onClickHandler = (index: number) => {
    if (startCells[index] !== "" || startAgain) return;

    const updatedCells = [...startCells];

    updatedCells[index] = startText;

    setStartCells(updatedCells);

    setStartText((prev) => (prev === "X" ? "O" : "X"));
  };

  const checkResult = () => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winningCombos.forEach((combo) => {
      const crossWins = combo.every((cell) => startCells[cell] === "X");

      const circleWins = combo.every((cell) => startCells[cell] === "O");

      if (crossWins) {
        setEndText("Cross wins!");

        setStartAgain(true);

        return;
      }

      if (circleWins) {
        setEndText("Circle wins!");

        setStartAgain(true);

        return;
      }

      if (cellsFilled && (!circleWins || !crossWins)) {
        setEndText("It's a draw!");

        setStartAgain(true);

        return;
      }
    });
  };

  useEffect(() => {
    checkResult();
  }, [startCells]);

  return (
    <div className="w-screen h-screen flex flex-col gap-5 items-center justify-center">
      <div className="w-[300px] h-[300px] grid grid-cols-3">
        {startCells.map((cell, index) => (
          <div
            key={index}
            id={`${index}`}
            className="bg-white w-[100px] h-[100px] flex items-center justify-center border border-black cursor-pointer"
            onClick={() => onClickHandler(index)}
          >
            {startCells[index] !== "" && (
              <div className="w-[90px] h-[90px] flex items-center justify-center text-4xl font-bold">
                {startCells[index]}
              </div>
            )}
          </div>
        ))}
      </div>

      {endText.trim() !== "" && <p>{endText}</p>}

      {startAgain && (
        <button
          className="bg-black text-white py-2 px-4 rounded"
          onClick={startAgainHandler}
        >
          Start Again
        </button>
      )}
    </div>
  );
}

export default App;
