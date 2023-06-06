import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavTabs from './NavTabs';
import Shelf from '../pages/GameShelf';
import SearchBar from '../pages/Search';
import Login from '../pages/Login';
import Footer from './Footer';

export default function GameContainer() {
  const [currentPage, setCurrentPage] = useState('gameShelf');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Router>
      <div>
        <header>
          <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
        </header>
        <Routes>
          <Route path='/gameShelf' element={<Shelf />} />
          <Route path='/search' element={<SearchBar />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
