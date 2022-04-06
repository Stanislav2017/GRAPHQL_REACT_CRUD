import { GenreEntity } from "../../db/models/GenreEntity";
import AddGenreType from "../../graphql/types/AddGenreType";
import EditGenreType from "../../graphql/types/EditGenreType";

export default interface IGenreService {
  getOne(id: number): Promise<GenreEntity | null>;
  getAll(): Promise<Array<GenreEntity>>;
  create(input: AddGenreType): Promise<GenreEntity>;
  update(input: EditGenreType): Promise<GenreEntity | null>;
  remove(id: number): Promise<Boolean>;
}
