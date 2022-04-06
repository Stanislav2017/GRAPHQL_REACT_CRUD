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
exports.GET_FILM = exports.GET_ALL_FILMS = void 0;
const graphql_1 = require("graphql");
const Film_1 = require("../typedefs/Film");
const models_1 = require("../../db/models");
exports.GET_ALL_FILMS = {
    type: new graphql_1.GraphQLList(Film_1.FilmType),
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUsers = yield models_1.FilmModel.findAll({
                include: [{ model: models_1.GenreModel, as: "genres" }],
            });
            return foundUsers;
        });
    },
};
exports.GET_FILM = {
    type: new graphql_1.GraphQLList(Film_1.FilmType),
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUsers = yield models_1.FilmModel.findOne({ where: { id: args.id } });
            return foundUsers;
        });
    },
};
