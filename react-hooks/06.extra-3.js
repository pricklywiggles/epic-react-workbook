// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React, {useState, useEffect} from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
  PokemonForm
} from '../pokemon'

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
      return (
        <div role="alert">
          There was an error:{' '}
          <pre style={{whiteSpace: 'normal'}}>{state.error.message}</pre>
        </div>
      )
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
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
