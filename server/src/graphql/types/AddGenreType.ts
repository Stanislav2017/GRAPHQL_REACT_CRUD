import { Field, InputType } from "type-graphql";

@InputType("AddGenreType")
export default class AddGenreType {
  @Field(() => String!)
  title: string;
}
