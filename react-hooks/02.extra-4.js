// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React, {useEffect} from 'react'

const useLocalStorageState = (key, initialValue) => {
  const [state, setState] = React.useState(
    () => JSON.parse(localStorage.getItem(key)) || initialValue
  )

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

function Greeting({initialName = {name: '', lastName: ''}}) {
  const [fullName, setFullName] = useLocalStorageState('fullName', initialName)

  function handleChange(event) {
    setFullName({...fullName, [event.target.id]: event.target.value})
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={fullName.name} onChange={handleChange} id="name" />
        <input
          value={fullName.lastName}
          onChange={handleChange}
          id="lastName"
        />
      </form>
      {fullName ? <strong>Hello {fullName.name} {fullName.lastName}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
