import './search.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { ADD_GAME } from "../utils/mutations";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [minPlayers, setMinPlayers] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [addGame, { error }] = useMutation(ADD_GAME);

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

  const handleSearch = async (event) => {
    event.preventDefault();
    console.log("try");
    try {
      const response = await axios.get('/api/search', {
        params: {
          name: searchTerm,
          fuzzy_match: true,
          categories: categories.join(','),
          'min-players': minPlayers,
          client_id: 'UryLwF1wvO' // move this ID to the backend 
        },
        headers: {
           // Replace with your Board Game Atlas client ID
        },
      });
      console.log(response);

      setSearchResults(response.data.games);
    } catch (error) {
      console.error('Error occurred during search:', error);
    }
  };

  const handleAddToShelf = async () => {
    // Add selected game to the boardGameShelf.js component
    console.log('Selected game:', selectedGame);
    try {
      const mutationResponse = await addGame({
        //variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      // Auth.login(token);
    } catch (e) {
      console.log(e);
    }
    // Implement your logic to add the game to the shelf here
  };
  
  return (
    <div>
      <form>
        <label>Search board games:</label>
      <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Search term" />
      <label htmlFor="categories">Search by Category:</label>
      <select multiple value={categories} onChange={handleCategoryChange}>
        <option value="strategy">Strategy</option>
        <option value="party">Party</option>
        <option value="cooperative">Cooperative</option>
        <option value="dice">Dice</option>
        {/* Add more categories as needed */}
      </select>
      <input type="number" value={minPlayers} onChange={handleMinPlayersChange} placeholder="Min Players" />
      <button onClick={handleSearch}>Search</button>
      </form>

      {searchResults.length > 0 && (
        <div>
          <ul>
            {searchResults.map((game) => (
              <li className='searchLi' key={game.id}>
                <h4 className="searchHeader">{game.name}</h4><br/>
                <p>Players: {game.players}</p><br/>
                {/* game.description_preview */}
                <img className="searchImg" src={game.image_url} alt={game.name} />
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