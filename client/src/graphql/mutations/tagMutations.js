import { gql } from 'apollo-boost';

export const DELETE_TAG = gql`
  mutation($id: Int!) {
    deleteTag(id: $id) {
      ok
    }
  }
`;

export const CREATE_TAG = gql`
  mutation($tagName: String!) {
    createTag(name: $tagName) {
      ok
      errors {
        path
        message
      }
    }
  }
`;
