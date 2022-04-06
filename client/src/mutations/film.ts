import { gql } from "@apollo/client";

export const CREATE_FILM = gql`
  mutation createFilm($input: AddFilmType!) {
    createFilm(input: $input) {
      id
      title
      description
    }
  }
`;

export const UPDATE_FILM = gql`
  mutation updateFilm($input: EditFilmType!) {
    updateFilm(input: $input) {
      id
      title
      description
    }
  }
`;

export const REMOVE_FILM = gql`
  mutation removeFilm($id: ID!) {
    removeFilm(id: $id)
  }
`;
