import { DataSource } from "typeorm";
import { GenreEntity } from "../../db/models/GenreEntity";
import IGenreService from "./IGenreService";
import db from "../../db/DB";
import EditGenreType from "../../graphql/types/EditGenreType";
import AddGenreType from "../../graphql/types/AddGenreType";

export default class GenreService implements IGenreService {
  private readonly connection: DataSource;
  constructor() {
    this.connection = db.getConnection();
  }

  async getOne(id: number): Promise<GenreEntity | null> {
    return this.connection.manager.findOneBy(GenreEntity, { id });
  }

  async getAll(): Promise<GenreEntity[]> {
    return this.connection.manager.find(GenreEntity);
  }

  async create(input: AddGenreType): Promise<GenreEntity> {
    const createdFilm: GenreEntity = this.connection.manager.create(
      GenreEntity,
      input
    );
    return this.connection.manager.save(GenreEntity, createdFilm);
  }

  async update(input: EditGenreType): Promise<GenreEntity | null> {
    const updatedFilm: GenreEntity = this.connection.manager.create(
      GenreEntity,
      input
    );
    return this.connection.manager
      .update(GenreEntity, { id: input.id }, updatedFilm)
      .then(() =>
        this.connection.manager.findOneBy(GenreEntity, { id: input.id })
      );
  }

  async remove(id: number): Promise<Boolean> {
    return this.connection.manager
      .delete(GenreEntity, { id })
      .then(({ affected }) => !!affected);
  }
}
