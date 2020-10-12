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
  const [pokemon, setPokemon] = useState(null)
  useEffect(() => {
    if (pokemonName) {
      setPokemon(null)
      fetchPokemon(pokemonName).then(pokemonData => {
        setPokemon(pokemonData)
      })
    }
  }, [pokemonName])

  if (!pokemonName) {
    return 'Submit a pokemon'
  } else if (pokemon) {
    return <PokemonDataView pokemon={pokemon} />
  } else {
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
