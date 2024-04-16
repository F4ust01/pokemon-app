import React, { useState } from 'react';
import './App.css';
import PokemonList from './components/PokemonList';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPokemon = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
      const data = await response.json();
      const pokemonWithImages = await Promise.all(
        data.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const pokemonDetails = await response.json();
          return {
            name: pokemon.name,
            image: pokemonDetails.sprites.front_default,
          };
        })
      );
      setPokemonData(pokemonWithImages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      setLoading(false);
    }
  };

  const deletePokemon = (index) => {
    const updatedPokemon = [...pokemonData];
    updatedPokemon.splice(index, 1);
    setPokemonData(updatedPokemon);
  };

  return (
    <div className="App">
      <h1>Pokemon List</h1>
      <button onClick={fetchPokemon} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Pokemon'}
      </button>
      <PokemonList pokemonData={pokemonData} onDelete={deletePokemon} />
    </div>
  );
}

export default App;
