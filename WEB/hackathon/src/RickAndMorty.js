import React, { useState, useEffect } from 'react';

const RickAndMorty = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        if (!response.ok) {
          throw new Error('Failed to fetch characters');
        }
        const data = await response.json();
        setCharacters(data.results);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();

    return () => {
    };
  }, []);

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      <ul>
        {characters.map(character => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RickAndMorty;
