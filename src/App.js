import React, { useEffect, useState, useCallback  } from 'react';
import PokemonThumb from './components/pokemonthumbnails';
import PokemonModal from './components/PokemonModel';


const App = () => {

  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handlePokemonClick = (pokemon) => {
    if (selectedPokemon && selectedPokemon.id === pokemon.id) {
      setSelectedPokemon(null); // Deselect the current Pokemon if it's clicked again
    } else {
      setSelectedPokemon(pokemon); // Show the modal with the clicked Pokemon
    }
  };

  const getAllPokemons = useCallback(async () => {
    const res = await fetch(loadMore)
    const data = await res.json()
    setLoadMore(data.next)

    function createPokemonObject(results) {
      const promises = results.map(async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()
        return data;
      });

      Promise.all(promises).then((pokemonData) => {
        const sortedPokemonData = pokemonData.sort((a, b) => a.id - b.id);
        setAllPokemons((currentList) => [...currentList, ...sortedPokemonData]);
      });
    }
    createPokemonObject(data.results)
  }, [loadMore]);

  useEffect(() => {
    getAllPokemons()
  }, [getAllPokemons])

  return (
    <div className="app-container">
      <h1>Pokemon Growth</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemon, index) => (
            <div key={index} onClick={() => handlePokemonClick(pokemon)}>
              <PokemonThumb
                id={pokemon.id}
                image={pokemon.sprites.other.dream_world.front_default}
                name={pokemon.name}
                type={pokemon.types[0].type.name}
                baseExperience={pokemon.base_experience} 
                abilities={pokemon.abilities}
              />
            </div>
          ))}
        </div>
        <button className="load-more" onClick={() => getAllPokemons()}>Load more</button>
      </div>
      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
          baseExperience={selectedPokemon.base_experience} // Pass the base_experience to PokemonModal
          abilities={selectedPokemon.abilities} // Pass the abilities to PokemonModal
        />
      )}
    </div>
  );
};

export default App;