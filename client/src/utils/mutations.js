import { gql } from '@apollo/client';

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
mutation addGame($games: String!) {
  addGame(games: $games) {
    games{
      _id
        name
        image_url
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

export const ADD_USER = gql`
  mutation addUser(
    $email: String!
    $password: String!
  ) {
    addUser(
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;
