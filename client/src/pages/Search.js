import './search.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { ADD_GAME } from "../utils/mutations";
import { selectedGame } from './GameShelf';

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
      const response = await axios.get('https://api.boardgameatlas.com/api/search', {
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

  const handleGameSelection = (game) => {
    setSelectedGame(game);
  };

  const handleAddToShelf = async (selectedGame) => {
    try {
      console.log('Selected game:', selectedGame);
      const mutationResponse = await addGame({
        variables: {
          gameData: {
            gameId: selectedGame.id,
            gameName: selectedGame.name,
            gameImg: selectedGame.image_url
          }
        }
      });
      console.log('Mutation response:', mutationResponse);
      // ...
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
                <button onClick={() => handleAddToShelf(game)}>Add to Board Game Shelf</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
