const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
require ('dotenv').config();

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const axios = require('axios');
const bodyParser = require('body-parser');

// variables for boardgame atlas 
const YOUR_CLIENT_ID = process.env.YOUR_CLIENT_ID;
const YOUR_CLIENT_SECRET = process.env.YOUR_CLIENT_SECRET;
const YOUR_REDIRECT_URI = process.env.YOUR_REDIRECT_URI;

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
app.use('/images', express.static(path.join(__dirname, '../client/images')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Serve the login page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Serve the gameShelf page
app.get('/gameShelf', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Handle the authorization callback
app.get('/auth/callback', async (req, res) => {
  const authCode = req.query.code;

  try {
    // Exchange authorization code for access token
    const tokenResponse = await axios.post('https://api.boardgameatlas.com/oauth/token', null, {
      params: {
        client_id: YOUR_CLIENT_ID,
        client_secret: YOUR_CLIENT_SECRET,
        code: authCode,
        redirect_uri: YOUR_REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const accessToken = tokenResponse.data.access_token;
    const refreshToken = tokenResponse.data.refresh_token;

    // Render a success page with the obtained access token
    res.send(`<h1>Login Successful!</h1><p>Access Token: ${accessToken}</p>`);
  } catch (error) {
    // Render an error page if something goes wrong
    res.send(`<h1>Error: ${error.message}</h1>`);
  }
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer();
