"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreType = void 0;
const graphql_1 = require("graphql");
exports.GenreType = new graphql_1.GraphQLObjectType({
    name: "Genre",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        title: { type: graphql_1.GraphQLString },
    }),
});
