import { gql } from "@apollo/client";

export const GET_GENRES = gql`
  query {
    getGenres {
      id
      title
    }
  }
`;

export const GET_GENRE = gql`
  query getGenre($id: ID!) {
    getGenre(id: $id) {
      id
      title
    }
  }
`;
