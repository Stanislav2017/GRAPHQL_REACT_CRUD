import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { GenreEntity } from "../../db/models/GenreEntity";
import AddGenreType from "../types/AddGenreType";
import EditGenreType from "../types/EditGenreType";
import IGenreService from "../../services/genre/IGenreService";
import GenreService from "../../services/genre/GenreService";

@Resolver(() => GenreEntity)
export class GenreResolver {
  private genreService: IGenreService;
  constructor() {
    this.genreService = new GenreService();
  }
  @Query(() => [GenreEntity])
  async getGenres(): Promise<GenreEntity[]> {
    return this.genreService.getAll();
  }

  @Query(() => GenreEntity)
  async getGenre(
    @Arg("id", () => ID!) id: number
  ): Promise<GenreEntity | null> {
    return this.genreService.getOne(id);
  }

  @Mutation(() => GenreEntity!)
  async createGenre(
    @Arg("input", () => AddGenreType) input: AddGenreType
  ): Promise<GenreEntity> {
    return this.genreService.create(input);
  }

  @Mutation(() => GenreEntity!)
  async updateGenre(
    @Arg("input", () => EditGenreType) input: EditGenreType
  ): Promise<GenreEntity | null> {
    return this.genreService.update(input);
  }

  @Mutation(() => Boolean)
  async removeGenre(@Arg("id", () => ID!) id: number): Promise<Boolean> {
    return this.genreService.remove(id);
  }
}
