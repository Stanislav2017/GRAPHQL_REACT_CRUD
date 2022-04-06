"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmResolver = void 0;
const type_graphql_1 = require("type-graphql");
const FilmEntity_1 = require("../../db/models/FilmEntity");
const FilmService_1 = __importDefault(require("../../services/film/FilmService"));
const AddFilmType_1 = __importDefault(require("../types/AddFilmType"));
const EditFilmType_1 = __importDefault(require("../types/EditFilmType"));
let FilmResolver = class FilmResolver {
    constructor() {
        this.filmService = new FilmService_1.default();
    }
    getFilms() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.filmService.getAll();
        });
    }
    getFilm(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.filmService.getOne(id);
        });
    }
    createFilm(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.filmService.create(input);
        });
    }
    updateFilm(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.filmService.update(input);
        });
    }
    removeFilm(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.filmService.remove(id);
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [FilmEntity_1.FilmEntity]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FilmResolver.prototype, "getFilms", null);
__decorate([
    (0, type_graphql_1.Query)(() => FilmEntity_1.FilmEntity),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FilmResolver.prototype, "getFilm", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => FilmEntity_1.FilmEntity),
    __param(0, (0, type_graphql_1.Arg)("input", () => AddFilmType_1.default)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AddFilmType_1.default]),
    __metadata("design:returntype", Promise)
], FilmResolver.prototype, "createFilm", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => FilmEntity_1.FilmEntity),
    __param(0, (0, type_graphql_1.Arg)("input", () => EditFilmType_1.default)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EditFilmType_1.default]),
    __metadata("design:returntype", Promise)
], FilmResolver.prototype, "updateFilm", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FilmResolver.prototype, "removeFilm", null);
FilmResolver = __decorate([
    (0, type_graphql_1.Resolver)(() => FilmEntity_1.FilmEntity),
    __metadata("design:paramtypes", [])
], FilmResolver);
exports.FilmResolver = FilmResolver;
