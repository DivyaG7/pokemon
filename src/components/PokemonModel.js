import React, { useEffect, useState } from 'react';

const PokemonModal = ({ pokemon, onClose, baseExperience, abilities }) => {
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Fetch detailed information about the Pokemon species
    const fetchSpeciesData = async () => {
      try {
        const response = await fetch(pokemon.species.url);
        const speciesData = await response.json();

        // Find the English flavor text entry
        const englishEntry = speciesData.flavor_text_entries.find(
          (entry) => entry.language.name === 'en'
        );

        if (englishEntry) {
          setDescription(englishEntry.flavor_text);
        }
      } catch (error) {
        console.error('Error fetching species data:', error);
      }
    };

    fetchSpeciesData();
  }, [pokemon.species.url]);

  const handleModalClick = (e) => {
    // Prevent closing the modal if the user clicks inside the modal content
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={handleModalClick}>
        <span className="close" onClick={onClose}>&times;</span>
        <div className='poke-img'>
          <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
        </div>
        <div className="left-column">
          <h2>{pokemon.name}</h2>
          <p>Type: {pokemon.types[0].type.name}</p>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Base Experience: {baseExperience}</p>
        </div>
        <div className="right-column">
          <p>Description:{description}</p>
          <div>
            <h3>Abilities:</h3>
            <ul>
              {abilities.map((ability) => (
                <li key={ability.ability.name}>{ability.ability.name}</li>
              ))}
            </ul>
          </div>
          {/* Add other information you want to display in the right column */}
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;
