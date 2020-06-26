import { gql } from 'apollo-boost';

const CREATE_ITEM = gql`
  mutation(
    $name: String!
    $description: String
    $link: String!
    $preview: String
    $rating: Int
    $favorite: Boolean
    $tags: [Int!]
  ) {
    createItem(
      name: $name
      description: $description
      link: $link
      preview: $preview
      rating: $rating
      favorite: $favorite
      tags: $tags
    ) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default CREATE_ITEM;
