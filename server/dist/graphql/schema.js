"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const Film_1 = require("./queries/Film");
const Genre_1 = require("./queries/Genre");
const Film_2 = require("./mutations/Film");
const Genre_2 = require("./mutations/Genre");
const query = new graphql_1.GraphQLObjectType({
    name: "query",
    fields: {
        getAllFilms: Film_1.GET_ALL_FILMS,
        getFilm: Film_1.GET_FILM,
        getAllGenres: Genre_1.GET_ALL_GENRES,
        getGenre: Genre_1.GET_GENRE,
    },
});
const mutation = new graphql_1.GraphQLObjectType({
    name: "mutation",
    fields: {
        createFilm: Film_2.CREATE_FILM,
        updateFilm: Film_2.UPDATE_FILM,
        deleteFilm: Film_2.DELETE_FILM,
        createGenre: Genre_2.CREATE_GENRE,
        updateGenre: Genre_2.UPDATE_GENRE,
        deleteGenre: Genre_2.DELETE_GENRE,
    },
});
exports.schema = new graphql_1.GraphQLSchema({
    query,
    mutation,
});
