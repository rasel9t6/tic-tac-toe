import { useState } from 'react';
import './App.css';
import Board from './Board';
import History from './History';

function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];
  function handlePlay(nextSquare) {
    setXIsNext(!xIsNext);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  function jumpTo(move) {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to the move # ${move}`;
    } else {
      description = `Start game`;
    }
    return (
      <li
        key={move}
        className='border-b'
      >
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <>
      <h1 className='text-2xl font-bold p-4 border-b border-slate-400 bg-slate-300'>
        Tic Tac Toe
      </h1>
      <div className='flex gap-5 justify-center border p-6 '>
        <div className='border-r p-3'>
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className='font-bold list-none bg-slate-100 p-3 rounded-md'>
          <History moves={moves} />
        </div>
      </div>
    </>
  );
}

export default App;
