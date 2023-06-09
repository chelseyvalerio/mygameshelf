const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {
    _id: ID
    email: String
    savedGames: [Game]
  }

  type Game {
    gameId: ID
    gameName: String!
    gameImg: String!
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  input GameInput {
    gameId: String!
    gameName: String!
    gameImg: String!
  }

  type Query {
    games: [Game]
    user: User
  }

  type Mutation {
    addUser(email: String!, password: String!): Auth
    addGame(gameData: GameInput!): Game
    removeGame(games: String!): Game
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
