// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React, {useState, useEffect} from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
  PokemonForm
} from '../pokemon'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {hasError: false}
  }

  static getDerivedStateFromError(error) {
    console.log('Error is', error)
    return {hasError: true, message: error.message}
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo)
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    } else {
      return <this.props.fallbackComponent message={this.state.message} />
    }
  }
}

function ErrorFallback({message}) {
  return (
    <div role="alert">
      There was an error: <pre style={{whiteSpace: 'normal'}}>{message}</pre>
    </div>
  )
}

function PokemonInfo({pokemonName}) {
  const [state, setState] = useState({status: 'idle'})
  useEffect(() => {
    if (pokemonName) {
      setState({status: 'pending'})
      fetchPokemon(pokemonName)
        .then(pokemonData => {
          setState({status: 'resolved', pokemonData})
        })
        .catch(error => {
          setState({status: 'rejected', error})
        })
    }
  }, [pokemonName])

  switch (state.status) {
    case 'idle':
      return 'Submit a pokemon'
    case 'resolved':
      return <PokemonDataView pokemon={state.pokemonData} />
    case 'rejected':
      throw state.error
    default:
      return <PokemonInfoFallback name={pokemonName} />
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary fallbackComponent={ErrorFallback}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
