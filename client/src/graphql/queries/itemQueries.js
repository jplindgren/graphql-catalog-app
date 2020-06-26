import { gql } from 'apollo-boost';

export const GET_ITEMS = gql`
  query($queryItemsInput: QueryItemsInput!) {
    allItems(queryItemsInput: $queryItemsInput) {
      id
      name
      description
      link
      preview
      rating
      favorite
      tags {
        id
        name
      }
    }
  }
`;

export const GET_CATALOG = gql`
  query {
    allTags {
      id
      name
    }
    favorites {
      id
      name
      description
      link
      preview
      rating
      favorite
      tags {
        id
        name
      }
    }
    featuredItems {
      id
      name
      description
      link
      preview
      rating
      favorite
    }
  }
`;
