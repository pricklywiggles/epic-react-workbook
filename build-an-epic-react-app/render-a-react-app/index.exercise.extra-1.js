import '@reach/dialog/styles.css'
import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import {Logo} from './components/logo.js'
import {Dialog} from '@reach/dialog'

// Notes on what I missed at first:
// * I didn't import the styles
// * didn't add the aria-label.
// * didn't wrap my buttons in divs
// * didn't make modal text an h3, instead just wrapping it on a div.

function App() {
  const [openModal, setOpenModal] = useState('none')
  const handleClose = () => setOpenModal('none')

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
        <h3>Login Form Goes Here</h3>
      </Dialog>
      <Dialog
        aria-label="Register form"
        isOpen={openModal === 'register'}
        onDismiss={handleClose}
      >
        <div>
          <button onClick={handleClose}>Close</button>
        </div>
        <h3>Register Form Goes Here</h3>
      </Dialog>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
