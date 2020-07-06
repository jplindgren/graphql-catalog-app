import { gql } from 'apollo-boost';

export const REGISTER_USER = gql`
  mutation($email: String!, $password: String!, $name: String) {
    registerUser(email: $email, password: $password, name: $name) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;
