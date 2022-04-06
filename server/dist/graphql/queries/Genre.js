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
exports.GET_GENRE = exports.GET_ALL_GENRES = void 0;
const graphql_1 = require("graphql");
const Genre_1 = require("../typedefs/Genre");
const models_1 = require("../../db/models");
exports.GET_ALL_GENRES = {
    type: new graphql_1.GraphQLList(Genre_1.GenreType),
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUsers = yield models_1.GenreModel.findAll();
            return foundUsers;
        });
    },
};
exports.GET_GENRE = {
    type: Genre_1.GenreType,
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUsers = yield models_1.GenreModel.findOne({ where: { id: args.id } });
            return foundUsers;
        });
    },
};
