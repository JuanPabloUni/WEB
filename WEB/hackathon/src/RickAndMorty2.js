import React, { useState, useEffect } from 'react';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}&name=${searchTerm}`);
        if (!response.ok) {
          throw new Error('Failed to fetch characters');
        }
        const data = await response.json();
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();

    return () => {
    };
  }, [currentPage, searchTerm]);

  const fetchCharacterDetails = async (id) => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch character details');
      }
      const data = await response.json();
      setSelectedCharacter(data);
    } catch (error) {
      console.error('Error fetching character details:', error);
    }
  };

  const handleCharacterClick = (id) => {
    fetchCharacterDetails(id);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      <p>Click on a character's name to view details:</p>
      <input type="text" placeholder="Search characters" value={searchTerm} onChange={handleSearchChange} />
      <ul>
        {characters.map(character => (
          <li key={character.id} onClick={() => handleCharacterClick(character.id)} style={{ cursor: 'pointer' }}>
            {character.name}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous Page</button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next Page</button>
      </div>
      {selectedCharacter && (
        <div>
          <h2>Selected Character Details</h2>
          <p>Name: {selectedCharacter.name}</p>
          <p>Status: {selectedCharacter.status}</p>
          <p>Species: {selectedCharacter.species}</p>
          <p>Gender: {selectedCharacter.gender}</p>
          <img src={selectedCharacter.image} alt={selectedCharacter.name} />
        </div>
      )}
    </div>
  );
};

export default CharacterList;