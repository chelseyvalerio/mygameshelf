import React, { useState } from 'react';
import NavTabs from './NavTabs';
import Shelf from '../pages/GameShelf';
import SearchBar from '../pages/Search';
import Footer from './Footer';

export default function GameContainer() {
  const [currentPage, setCurrentPage] = useState('gameShelf');

  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === 'gameShelf') {
      return <Shelf />;
    }
    if (currentPage === 'Search') {
      return <SearchBar />;
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <header>
      <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
      </header>
      {renderPage()}
      <Footer />
    </div>
  );
}
