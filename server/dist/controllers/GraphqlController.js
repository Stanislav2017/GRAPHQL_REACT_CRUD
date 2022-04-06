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
const express_graphql_1 = require("express-graphql");
const type_graphql_1 = require("type-graphql");
const FilmResolver_1 = require("../graphql/resolvers/FilmResolver");
const GenreResolver_1 = require("../graphql/resolvers/GenreResolver");
class GraphqlController {
    constructor() { }
    main() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initSchema();
            return (0, express_graphql_1.graphqlHTTP)({ schema: this.schema, graphiql: true });
        });
    }
    initSchema() {
        return __awaiter(this, void 0, void 0, function* () {
            this.schema = yield (0, type_graphql_1.buildSchema)({
                resolvers: [FilmResolver_1.FilmResolver, GenreResolver_1.GenreResolver],
            });
        });
    }
}
exports.default = new GraphqlController();
