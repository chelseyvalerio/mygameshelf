import React, { useState } from 'react';
// import { validateEmail } from './utils/helpers';

function Search() {

  const [search, setSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const game = "";

  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { game, value } = e.target;
    //const inputType = target.name;
    //const inputValue = target.value;

    if (game === 'search') {
      setSearch(value);
    }
  
  };

  const handleFormSubmit = (e) => {
    // Preventing the default behavior of the form submit
    e.preventDefault();

    setSearch('');
  };

  return (
    <div className="searchBar">
      <h2>Search for games</h2>
      
      <p>Use the search bar below. </p>
      <form className="form" onSubmit={e => e.preventDefault()}>
        <input
          value={game}
          name="game"
          onChange={handleInputChange}
          type="text"
          placeholder="Search for game"
        />
        
        <button type="submit" className="submit" onClick={handleFormSubmit}>Submit</button>
      </form>
      {errorMessage && (
        <div>
          <p className="error-text">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default Search;