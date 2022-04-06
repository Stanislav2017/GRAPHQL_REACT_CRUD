import { DataSource, In } from "typeorm";
import { FilmEntity } from "../../db/models/FilmEntity";
import db from "../../db/DB";
import IFilmService from "./IFilmService";
import AddFilmType from "../../graphql/types/AddFilmType";
import EditFilmType from "../../graphql/types/EditFilmType";
import { GenreEntity } from "../../db/models/GenreEntity";

export default class FilmService implements IFilmService {
  private readonly connection: DataSource;
  constructor() {
    this.connection = db.getConnection();
  }

  async getOne(id: number): Promise<FilmEntity | null> {
    return this.connection.manager.findOneBy(FilmEntity, { id });
  }

  async getAll(): Promise<FilmEntity[]> {
    return this.connection.manager.find(FilmEntity);
  }
  async create(input: AddFilmType): Promise<FilmEntity> {
    const { genreIds = Array<number>() } = input;
    return this.connection.manager
      .findBy(GenreEntity, { id: In(genreIds) })
      .then((genres) => {
        const createdFilmEntity = this.connection.manager.create(FilmEntity, {
          ...input,
          genres,
        });
        return this.connection.manager.save(FilmEntity, createdFilmEntity);
      });
  }

  async update(input: EditFilmType) {
    const { id, genreIds = Array<number>() } = input;
    return this.connection.manager
      .findOneBy(FilmEntity, { id })
      .then(async (film) => {
        if (genreIds.length) {
          this.updateFilmGenres(film, genreIds);
        }
        const updatedFilmEntity = this.connection.manager.create(
          FilmEntity,
          input
        );
        return this.connection.manager
          .update(FilmEntity, { id }, updatedFilmEntity)
          .then(() => this.connection.manager.findOneBy(FilmEntity, { id }));
      });
  }

  async remove(id: number): Promise<Boolean> {
    return this.connection.manager
      .delete(FilmEntity, { id })
      .then(({ affected }) => !!affected);
  }

  private async updateFilmGenres(
    film: FilmEntity | null,
    genreIds: Array<number>
  ) {
    const currentIds = film?.genres.map((v) => v.id) || Array<number>();
    const oldIds: Array<number> =
      currentIds.filter((v) => !genreIds.includes(v)) || Array<number>();
    const newIds: Array<number> =
      genreIds.filter((v) => !oldIds.includes(v) && !currentIds.includes(v)) ||
      Array<number>();
    if (oldIds.length) {
      await this.connection
        .createQueryBuilder()
        .relation(FilmEntity, "genres")
        .of(film)
        .remove(oldIds.map((v) => ({ id: v })));
    }
    if (newIds.length) {
      await this.connection
        .createQueryBuilder()
        .relation(FilmEntity, "genres")
        .of(film)
        .add(newIds.map((v) => ({ id: v })));
    }
  }
}
