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
exports.GenreResolver = void 0;
const type_graphql_1 = require("type-graphql");
const GenreEntity_1 = require("../../db/models/GenreEntity");
const AddGenreType_1 = __importDefault(require("../types/AddGenreType"));
const EditGenreType_1 = __importDefault(require("../types/EditGenreType"));
const GenreService_1 = __importDefault(require("../../services/genre/GenreService"));
let GenreResolver = class GenreResolver {
    constructor() {
        this.genreService = new GenreService_1.default();
    }
    getGenres() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.genreService.getAll();
        });
    }
    getGenre(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.genreService.getOne(id);
        });
    }
    createGenre(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.genreService.create(input);
        });
    }
    updateGenre(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.genreService.update(input);
        });
    }
    removeGenre(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.genreService.remove(id);
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [GenreEntity_1.GenreEntity]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GenreResolver.prototype, "getGenres", null);
__decorate([
    (0, type_graphql_1.Query)(() => GenreEntity_1.GenreEntity),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GenreResolver.prototype, "getGenre", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => GenreEntity_1.GenreEntity),
    __param(0, (0, type_graphql_1.Arg)("input", () => AddGenreType_1.default)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AddGenreType_1.default]),
    __metadata("design:returntype", Promise)
], GenreResolver.prototype, "createGenre", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => GenreEntity_1.GenreEntity),
    __param(0, (0, type_graphql_1.Arg)("input", () => EditGenreType_1.default)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EditGenreType_1.default]),
    __metadata("design:returntype", Promise)
], GenreResolver.prototype, "updateGenre", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GenreResolver.prototype, "removeGenre", null);
GenreResolver = __decorate([
    (0, type_graphql_1.Resolver)(() => GenreEntity_1.GenreEntity),
    __metadata("design:paramtypes", [])
], GenreResolver);
exports.GenreResolver = GenreResolver;
