import { graphqlHTTP } from "express-graphql";
import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { FilmResolver } from "../graphql/resolvers/FilmResolver";
import { GenreResolver } from "../graphql/resolvers/GenreResolver";

class GraphqlController {
  private schema: GraphQLSchema;
  constructor() {}

  async main() {
    await this.initSchema();
    return graphqlHTTP({ schema: this.schema, graphiql: true });
  }

  private async initSchema() {
    this.schema = await buildSchema({
      resolvers: [FilmResolver, GenreResolver],
    });
  }
}

export default new GraphqlController();
