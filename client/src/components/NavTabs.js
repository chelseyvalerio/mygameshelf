import React from 'react';

// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
function NavTabs({ currentPage, handlePageChange }) {
  return (
    <ul className="nav quick-links header">
      <li className="nav-item">
        <a
          href="#gameShelf"
          onClick={() => handlePageChange('gameShelf')}
          // This is a conditional (ternary) operator that checks to see if the current page is "Home"
          // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
          className={currentPage === 'gameShelf' ? 'nav-link active' : 'nav-link'}
        >
          Game Shelf
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#Search"
          onClick={() => handlePageChange('Search')}
          // Check to see if the currentPage is `Blog`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentPage === 'Search' ? 'nav-link active' : 'nav-link'}
        >
          Search
        </a>
      </li>
    </ul>
  );
}

export default NavTabs;
