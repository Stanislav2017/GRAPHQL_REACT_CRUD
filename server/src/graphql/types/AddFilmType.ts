import { Field, InputType } from "type-graphql";

@InputType("AddFilmType")
export default class AddFilmType {
  @Field(() => String!)
  title: string;

  @Field(() => String!)
  description: string;

  @Field(() => [Number]!)
  genreIds: Array<number>;
}
