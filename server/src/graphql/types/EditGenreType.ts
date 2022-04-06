import { Field, ID, InputType } from "type-graphql";

@InputType("EditGenreType")
export default class EditGenreType {
  @Field(() => ID!)
  id: number;

  @Field(() => String)
  title: string;
}
