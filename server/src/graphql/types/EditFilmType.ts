import { Field, ID, InputType } from "type-graphql";

@InputType("EditFilmType")
export default class EditFilmType {
  @Field(() => ID!)
  id: number;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => [Number], { defaultValue: Array<number>() })
  genreIds: Array<number>;
}
