import React from 'react';
import { Link } from 'react-router-dom';
import Auth from "../utils/auth";

// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
function NavTabs({ currentPage, handlePageChange, loggedIn, handleLogout }) {

  // if logged in, show logout link 
  function showNavigation() {

    if (Auth.loggedIn()) {
      return (
        <ul>
        <li className="nav-item">
          <Link
            to="/gameShelf"
            onClick={() => handlePageChange('gameShelf')}
            className={currentPage === 'gameShelf' ? 'nav-link active' : 'nav-link'}
          >
            Game Shelf
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/gameShelf"
            className='nav-link'
            onClick={() => {
              handlePageChange('gameShelf')
              handleLogout()
            }}>Logout
          </Link>
        </li>
        </ul>
      )
    }
    else { // if (Auth.loggedOut()) {
      return (
        <li className="nav-item">
          <Link to="/login" className='nav-link' onClick={() => handlePageChange('login')}>Login/Signup</Link>
        </li>
      );
    }
  }
  return (
    <div>
      <ul className="nav quick-links header">
        
        <li className="nav-item">
          <Link
            to="/search"
            onClick={() => handlePageChange('search')}
            // Check to see if the currentPage is `Blog`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
            className={currentPage === 'Search' ? 'nav-link active' : 'nav-link'}
          >
            Search
          </Link>
        </li>
        {showNavigation()}
      </ul>

    </div>
  );
}

export default NavTabs;
