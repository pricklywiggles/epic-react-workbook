// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import React from 'react'

const reducer = (state, action) => ({...state, ...action})

function Counter({initialCount = 1, step = 1}) {
  const [state, setState] = React.useReducer(reducer, {count: initialCount})

  const increment = () => setState({count: state.count + step})
  return <button onClick={increment}>{state.count}</button>
}

function App() {
  return <Counter />
}

export default App
