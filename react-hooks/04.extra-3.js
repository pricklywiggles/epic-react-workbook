// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import React, {useEffect, useState} from 'react'

const useLocalStorageState = (key, initialValue) => {
  const [state, setState] = React.useState(
    () => JSON.parse(localStorage.getItem(key)) || initialValue
  )

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

function Board({moves, setMoves}) {
  const squares = calculateSquares(moves)
  const nextValue = calculateNextValue(squares)
  const winner = calculateWinner(squares)
  const status = calculateStatus(winner, squares, nextValue)

  function selectSquare(square) {
    if (winner || squares[square]) return
    setMoves([...moves, square])
  }

  function restart() {
    setMoves([])
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

function Game() {
  const [moves, setMoves] = useLocalStorageState('moves', [])
  const [currentMoveStep, setCurrentMoveStep] = useState(0)

  useEffect(() => {
    setCurrentMoveStep(moves.length)
  }, [moves])

  const renderButton = moveStep => {
    const isCurrent = moveStep === currentMoveStep
    return (
      <li key={moveStep}>
        <button
          disabled={isCurrent}
          onClick={() => setCurrentMoveStep(moveStep)}
        >
          {moveStep === 0 ? 'Go to game start' : `Go to move #${moveStep}`}{' '}
          {isCurrent ? '(current}' : ''}
        </button>
      </li>
    )
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          moves={moves.slice(0, currentMoveStep)}
          current={currentMoveStep}
          setMoves={setMoves}
        />
      </div>
      <div className="game-info">
        <ol>
          {renderButton(0)}
          {moves.map((move, i) => renderButton(i + 1))}
        </ol>
      </div>
    </div>
  )
}

function calculateSquares(moves) {
  const squares = Array(9).fill(null)
  for (let i = 0; i < moves.length; i++) {
    squares[moves[i]] = i % 2 === 0 ? 'X' : 'O'
  }
  return squares
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
