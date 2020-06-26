import { gql } from 'apollo-boost';

export const GET_TAGS = gql`
  {
    allTags {
      id
      name
    }
  }
`;
