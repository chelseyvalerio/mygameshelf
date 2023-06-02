import './search.css';
import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [minPlayers, setMinPlayers] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const selectedCategories = Array.from(event.target.selectedOptions, (option) => option.value);
    setCategories(selectedCategories);
  };

  const handleMinPlayersChange = (event) => {
    setMinPlayers(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('/api/search', {
        params: {
          name: searchTerm,
          fuzzy_match: true,
          categories: categories.join(','),
          'min-players': minPlayers
        }
      });

      setSearchResults(response.data.games);
    } catch (error) {
      console.error('Error occurred during search:', error);
    }
  };

  const handleAddToShelf = () => {
    // Add selected game to the boardGameShelf.js component
    console.log('Selected game:', selectedGame);
    // Implement your logic to add the game to the shelf here
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Search term" />
      <select multiple value={categories} onChange={handleCategoryChange}>
        <option value="strategy">Strategy</option>
        <option value="party">Party</option>
        <option value="cooperative">Cooperative</option>
        {/* Add more categories as needed */}
      </select>
      <input type="number" value={minPlayers} onChange={handleMinPlayersChange} placeholder="Min Players" />
      <button onClick={handleSearch}>Search</button>

      {searchResults.length > 0 && (
        <div>
          <ul>
            {searchResults.map((game) => (
              <li key={game.id}>
                {game.name}
                <button onClick={() => setSelectedGame(game)}>Add to Shelf</button>
              </li>
            ))}
          </ul>

          {selectedGame && (
            <div>
              <h2>Selected Game: {selectedGame.name}</h2>
              <button onClick={handleAddToShelf}>Add to Board Game Shelf</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const selectedGame = null

export { selectedGame };
export default SearchBar;