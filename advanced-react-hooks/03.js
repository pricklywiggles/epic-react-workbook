// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import React, {useContext} from 'react'

const CountStateContext = React.createContext(null)
const CountDispatchContext = React.createContext(null)

const CountProvider = props => {
  const [count, setCount] = React.useState(0)

  return (
    <CountStateContext.Provider value={count}>
      <CountDispatchContext.Provider value={setCount} {...props} />
    </CountStateContext.Provider>
  )
}

const useCount = () => {
  let count = useContext(CountStateContext)
  if (count === null) {
    throw new Error('useCount must be used inside a CountProvider')
  }
  return count
}
const useCountDispatch = () => {
  let countDispatch = useContext(CountDispatchContext)
  if (countDispatch === null) {
    throw new Error(
      'useCountDispatch must be used inside a CountDispatchProvider',
    )
  }
  return countDispatch
}

// 🐨 create your CountContext here with React.createContext

// 🐨 create a CountProvider component here that does this:
//   🐨 get the count state and setCount updater with React.useState
//   🐨 create a `value` array with count and setCount
//   🐨 return your context provider with the value assigned to that array and forward all the other props
//   💰 more specifically, we need the children prop forwarded to the context provider

function CountDisplay() {
  // 🐨 get the count from useContext with the CountContext
  const count = useCount()
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  // 🐨 get the setCount from useContext with the CountContext
  const setCount = useCountDispatch()
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}

export default App
