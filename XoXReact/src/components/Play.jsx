import React, { useState } from "react";
import Board from "./board.jsx";

const Play = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const xIsNext = stepNumber % 2 === 0;

  const handleClick = (index) => {
    const currentHistory = history.slice(0, stepNumber + 1);
    const current = currentHistory[currentHistory.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[index]) {
      return;
    }

    squares[index] = xIsNext ? "X" : "O";

    setHistory([...currentHistory, { squares }]);
    setStepNumber(currentHistory.length);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const status = winner
    ? `Winner: ${winner}`
    : stepNumber === 9
    ? "It's a draw!"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  const handleNewGame = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
  };
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        {status === "It's a draw!" && (
          <div>
            {status} <br /> <button onClick={handleNewGame}>New Game</button>
          </div>
        )}
        {winner && (
          <div>
            <button onClick={handleNewGame}>New Game</button>
          </div>
        )}
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

export default Play;
