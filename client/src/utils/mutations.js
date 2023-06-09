import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_GAME = gql`
  mutation addGame($gameData: GameInput!) {
    addGame(gameData: $gameData) {
      games {
        gameId
        gameName
        gameImg
      }
    }
  }
`;

export const REMOVE_GAME = gql`
  mutation removeGame($game: [ID]!) {
    removeOrder(products: $products) {
      products {
        _id
        name
        description
      }
    }
  }
`;

export const SAVE_GAME = gql`
  mutation saveGame($gameData: GameInput!) {
    saveGame(gameData: $gameData) {
      _id
      username
      email
      savedGames {
        gameId
        gameName
        gameImg
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;
