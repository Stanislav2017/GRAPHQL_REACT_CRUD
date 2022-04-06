import IGenre from "./IGenre";

export default interface IFilm {
  id: number;
  title: string;
  description: string;
  genres: Array<IGenre>;
}
