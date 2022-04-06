import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FilmEntity } from "./FilmEntity";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity("genre")
export class GenreEntity {
  constructor(partial: Partial<GenreEntity>) {
    Object.assign(this, partial);
  }

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ nullable: false, unique: true })
  title: string;

  @Field(() => [FilmEntity])
  @ManyToMany(() => FilmEntity, (film) => film.genres, { lazy: true })
  films: FilmEntity[];
}
