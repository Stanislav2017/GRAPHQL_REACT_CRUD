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
exports.DELETE_GENRE = exports.UPDATE_GENRE = exports.CREATE_GENRE = void 0;
const graphql_1 = require("graphql");
const Genre_1 = require("../typedefs/Genre");
const models_1 = require("../../db/models");
exports.CREATE_GENRE = {
    type: Genre_1.GenreType,
    args: {
        title: { type: graphql_1.GraphQLString },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdGenre = yield models_1.GenreModel.create(args);
            return args;
        });
    },
};
exports.UPDATE_GENRE = {
    type: Genre_1.GenreType,
    args: {
        id: { type: graphql_1.GraphQLID },
        title: { type: graphql_1.GraphQLString },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, title, description } = args;
            const updatedGenre = yield models_1.GenreModel.update({ title, description }, { where: { id } });
            return args;
        });
    },
};
exports.DELETE_GENRE = {
    type: Genre_1.GenreType,
    args: {
        id: { type: graphql_1.GraphQLID },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdGenre = yield models_1.GenreModel.destroy({ where: { args } });
            return createdGenre;
        });
    },
};
