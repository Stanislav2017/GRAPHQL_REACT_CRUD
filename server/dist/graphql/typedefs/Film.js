"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmType = void 0;
const graphql_1 = require("graphql");
exports.FilmType = new graphql_1.GraphQLObjectType({
    name: "Film",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        title: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
    }),
});
