// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import React, { useState } from "react";

function UsernameForm({ onSubmitUsername }) {
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmitUsername(event.target.elements.usernameInput);
  };

  const handleChange = (event) => {
    if (event.target.value !== event.target.value.toLowerCase())
      setError("Username must be lower case");
    else setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input id="usernameInput" type="text" onChange={handleChange} />
        <div>{error}</div>
      </div>
      <button disabled={!!error} type="submit">
        Submit
      </button>
    </form>
  );
}

function App() {
  const onSubmitUsername = (username) => alert(`You entered: ${username}`);
  return <UsernameForm onSubmitUsername={onSubmitUsername} />;
}

export default App;
