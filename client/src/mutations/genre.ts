import { gql } from "@apollo/client";

export const CREATE_GENRE = gql`
  mutation createGenre($input: AddGenreType!) {
    createGenre(input: $input) {
      id
      title
    }
  }
`;

export const UPDATE_GENRE = gql`
  mutation updateGenre($input: EditGenreType!) {
    updateGenre(input: $input) {
      id
      title
    }
  }
`;

export const REMOVE_GENRE = gql`
  mutation removeGenre($id: ID!) {
    removeGenre(id: $id)
  }
`;
