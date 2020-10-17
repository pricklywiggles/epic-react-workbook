import React from 'react'
import ReactDOM from 'react-dom'
import {Logo} from './components/logo.js'

function App() {
  const handleLogin = event => {
    alert('Login was clicked')
  }

  const handleRegister = event => {
    alert('Register was clicked')
  }

  return (
    <>
      <Logo width={80} height={80} />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
      <div>
        <button onClick={handleRegister}>Register</button>
      </div>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
