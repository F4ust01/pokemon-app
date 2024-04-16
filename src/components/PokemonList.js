import React from 'react';

const PokemonList = ({ pokemonData, onDelete }) => {
  return (
    <ul className="pokemon-list">
      {pokemonData.map((pokemon, index) => (
        <li key={index} className="pokemon-item">
          <img src={pokemon.image} alt={pokemon.name} />
          <span>{pokemon.name}</span>
          <button onClick={() => onDelete(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default PokemonList;
