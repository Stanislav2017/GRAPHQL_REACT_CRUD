import { FilmEntity } from "../../db/models/FilmEntity";
import AddFilmType from "../../graphql/types/AddFilmType";
import EditFilmType from "../../graphql/types/EditFilmType";

export default interface IFilmService {
  getOne(id: number): Promise<FilmEntity | null>;
  getAll(): Promise<Array<FilmEntity>>;
  create(input: AddFilmType): Promise<FilmEntity>;
  update(input: EditFilmType): Promise<FilmEntity | null>;
  remove(id: number): Promise<Boolean>;
}
