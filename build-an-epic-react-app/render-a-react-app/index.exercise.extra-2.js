import '@reach/dialog/styles.css'
import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import {Logo} from './components/logo.js'
import {Dialog} from '@reach/dialog'

// Notes on what I missed at first:
// * Didn't wrap the form in <form> instead doing an onClick in the submit button

function App() {
  const [openModal, setOpenModal] = useState('none')
  const handleClose = () => setOpenModal('none')
  const login = (username, password) =>
    alert(`Logging in with ${username}/${password}`)
  const register = (username, password) =>
    alert(`Registering with ${username}/${password}`)

  return (
    <>
      <Logo width={80} height={80} />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => setOpenModal('login')}>Login</button>
      </div>
      <div>
        <button onClick={() => setOpenModal('register')}>Register</button>
      </div>

      <Dialog
        aria-label="Login Form"
        isOpen={openModal === 'login'}
        onDismiss={handleClose}
      >
        <div>
          <button onClick={handleClose}>Close</button>
        </div>
        <h3>Login</h3>
        <LoginForm onSubmit={login} buttonText="Login" />
      </Dialog>

      <Dialog
        aria-label="Register form"
        isOpen={openModal === 'register'}
        onDismiss={handleClose}
      >
        <div>
          <button onClick={handleClose}>Close</button>
        </div>
        <h3>Register</h3>
        <LoginForm onSubmit={register} buttonText="Login" />
      </Dialog>
    </>
  )
}

function LoginForm({onSubmit, buttonText = 'Submit'}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = event => {
    event.preventDefault()
    onSubmit(username, password)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">{buttonText}</button>
    </form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
