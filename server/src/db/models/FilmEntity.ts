import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GenreEntity } from "./GenreEntity";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity("film")
export class FilmEntity {
  constructor(partial: Partial<FilmEntity>) {
    Object.assign(this, partial);
  }

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ nullable: false, unique: true })
  title: string;

  @Field(() => String)
  @Column({ nullable: false })
  description: string;

  @Field(() => [GenreEntity])
  @ManyToMany(() => GenreEntity, (genre) => genre.films, {
    cascade: true,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinTable({
    name: "films_genres",
    joinColumn: { name: "film_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "genre_id", referencedColumnName: "id" },
  })
  genres: GenreEntity[];
}
