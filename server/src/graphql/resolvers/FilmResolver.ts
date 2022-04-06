import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { FilmEntity } from "../../db/models/FilmEntity";
import IFilmService from "../../services/film/IFilmService";
import FilmService from "../../services/film/FilmService";
import AddFilmType from "../types/AddFilmType";
import EditFilmType from "../types/EditFilmType";

@Resolver(() => FilmEntity)
export class FilmResolver {
  private readonly filmService: IFilmService;

  constructor() {
    this.filmService = new FilmService();
  }
  @Query(() => [FilmEntity])
  async getFilms(): Promise<FilmEntity[]> {
    return this.filmService.getAll();
  }

  @Query(() => FilmEntity)
  async getFilm(@Arg("id", () => ID!) id: number): Promise<FilmEntity | null> {
    return this.filmService.getOne(id);
  }

  @Mutation(() => FilmEntity)
  async createFilm(
    @Arg("input", () => AddFilmType!) input: AddFilmType
  ): Promise<FilmEntity> {
    return this.filmService.create(input);
  }

  @Mutation(() => FilmEntity)
  async updateFilm(
    @Arg("input", () => EditFilmType) input: EditFilmType
  ): Promise<FilmEntity | null> {
    return this.filmService.update(input);
  }

  @Mutation(() => Boolean)
  async removeFilm(@Arg("id", () => ID!) id: number): Promise<Boolean> {
    return this.filmService.remove(id);
  }
}
