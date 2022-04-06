"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const express_graphql_1 = require("express-graphql");
const type_graphql_1 = require("type-graphql");
// import GraphqlController from "../controllers/GraphqlController";
const FilmResolver_1 = require("../graphql/resolvers/FilmResolver");
const GenreResolver_1 = require("../graphql/resolvers/GenreResolver");
class MainRouter {
    constructor() {
        this.router = express.Router();
        (0, type_graphql_1.buildSchema)({
            resolvers: [FilmResolver_1.FilmResolver, GenreResolver_1.GenreResolver],
        }).then((s) => this.router.use("/graphql", (0, express_graphql_1.graphqlHTTP)({ schema: s, graphiql: true })));
    }
    getRoutes() {
        return this.router;
    }
}
exports.default = new MainRouter();
