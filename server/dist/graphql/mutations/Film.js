"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE_FILM = exports.UPDATE_FILM = exports.CREATE_FILM = void 0;
const graphql_1 = require("graphql");
const Film_1 = require("../typedefs/Film");
const models_1 = require("../../db/models");
const sequelize_1 = require("sequelize");
exports.CREATE_FILM = {
    type: Film_1.FilmType,
    args: {
        title: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        genres: { type: new graphql_1.GraphQLList(graphql_1.GraphQLID) },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, genres } = args;
            const foundedGenres = yield models_1.GenreModel.findAll({
                where: { id: { [sequelize_1.Op.or]: genres } },
            });
            const createdFilm = yield models_1.FilmModel.create({ title, description });
            yield models_1.FilmGenreModel.bulkCreate(foundedGenres.map((v) => ({
                filmId: createdFilm.id,
                genreId: v.id,
            })));
            const savedFilm = yield models_1.FilmModel.findOne({
                where: { id: createdFilm.id },
                include: { model: models_1.GenreModel, as: "genres" },
            });
            return savedFilm;
        });
    },
};
exports.UPDATE_FILM = {
    type: Film_1.FilmType,
    args: {
        id: { type: graphql_1.GraphQLID },
        title: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, title, description } = args;
            const updatedFilm = yield models_1.FilmModel.update({ title, description }, { where: { id } });
            return args;
        });
    },
};
exports.DELETE_FILM = {
    type: Film_1.FilmType,
    args: {
        id: { type: graphql_1.GraphQLID },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdFilm = yield models_1.FilmModel.destroy({ where: { args } });
            return createdFilm;
        });
    },
};
