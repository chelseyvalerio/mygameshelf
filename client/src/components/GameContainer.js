import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavTabs from './NavTabs';
import Shelf from '../pages/GameShelf';
import SearchBar from '../pages/Search';
import Login from '../pages/Login';
import Footer from './Footer';
import Auth from '../utils/auth';


const handleLogin = async (credentials) => {

  // useState for login/logout
  const [loggedIn, setLoggedIn] = useState(false);

  try {
    // Make an API request to authenticate the user and retrieve a JWT
    const response = await axios.post('/api/login', credentials);

    // Store the JWT in browser storage
    //localStorage.setItem('token', response.data.token);
    Auth.login(response.data.token);

    // Set the loggedIn state to true
    setLoggedIn(true);
  } catch (error) {
    console.error('Error occurred during login:', error);
  }
};
const handleLogout = () => {
  // Clear the stored JWT from browser storage
  //localStorage.removeItem('token');
  Auth.logout();

  // Set the loggedIn state to false
  setLoggedIn(false);
};



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
