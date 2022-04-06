import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "type-graphql";
// import GraphqlController from "../controllers/GraphqlController";
import { FilmResolver } from "../graphql/resolvers/FilmResolver";
import { GenreResolver } from "../graphql/resolvers/GenreResolver";
class MainRouter {
  private router: express.Router = express.Router();
  constructor() {
    buildSchema({
      resolvers: [FilmResolver, GenreResolver],
    }).then((s) =>
      this.router.use("/graphql", graphqlHTTP({ schema: s, graphiql: true }))
    );
  }

  public getRoutes(): express.Router {
    return this.router;
  }
}

export default new MainRouter();
