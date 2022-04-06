import { gql } from "@apollo/client";

export const GET_FILMS = gql`
  query {
    getFilms {
      id
      title
      description
      genres {
        id
        title
      }
    }
  }
`;

export const GET_FILM = gql`
  query getFilm($id: ID!) {
    getFilm(id: $id) {
      id
      title
      description
      genres {
        id
        title
      }
    }
  }
`;
