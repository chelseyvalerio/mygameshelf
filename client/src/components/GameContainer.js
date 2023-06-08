import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NavTabs from './NavTabs';
import Shelf from '../pages/GameShelf';
import SearchBar from '../pages/Search';
import Login from '../pages/Login';
import Footer from './Footer';
import Auth from '../utils/auth';
import axios from 'axios';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


export default function GameContainer() {
  const [currentPage, setCurrentPage] = useState();

  // useState for login/logout
  const [loggedIn, setLoggedIn] = useState(false);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLogin = async (credentials) => {
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
  
   // Create an HTTP link to your GraphQL API
   const httpLink = createHttpLink({
    uri: '/graphql',
  });

  // Create an auth link to include the JWT token in the request headers
  const authLink = setContext((_, { headers }) => {
    const token = Auth.getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  // Create the Apollo Client instance
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
    <Router>
      <div>
        <header>
          <NavTabs 
            currentPage={currentPage} 
            handlePageChange={handlePageChange}  
            loggedIn={loggedIn}
            handleLogout={handleLogout} />
        </header>
        <Routes>
        <Route path='/' element={<Home />} />
          <Route path='/gameShelf' element={<Shelf />} />
          <Route path='/search' element={<SearchBar />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
    </ApolloProvider>
  );
}
