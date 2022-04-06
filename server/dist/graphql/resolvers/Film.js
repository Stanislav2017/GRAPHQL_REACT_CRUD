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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Film_1 = require("../../db/models/Film");
let FilmResolver = class FilmResolver {
    getFilms() {
        return __awaiter(this, void 0, void 0, function* () {
            const films = Film_1.Film.find();
            return films;
        });
    }
    getFilm(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const film = Film_1.Film.findOneBy({ id });
            return film;
        });
    }
    createFilm(title, description, genres) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdFilm = yield Film_1.Film.save({ title, description });
            return createdFilm;
        });
    }
    updateFilm(id, title, description, genres) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdFilm = yield Film_1.Film.update({ id }, { title, description });
            return createdFilm;
        });
    }
    removeFilm(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdFilm = yield Film_1.Film.delete(id);
            return createdFilm;
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Film_1.Film]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FilmResolver.prototype, "getFilms", null);
__decorate([
    (0, type_graphql_1.Query)(() => Film_1.Film),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FilmResolver.prototype, "getFilm", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Film_1.Film),
    __param(0, (0, type_graphql_1.Arg)("title")),
    __param(1, (0, type_graphql_1.Arg)("description")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array]),
    __metadata("design:returntype", Promise)
], FilmResolver.prototype, "createFilm", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => typeorm_1.UpdateResult),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("title")),
    __param(2, (0, type_graphql_1.Arg)("description")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Array]),
    __metadata("design:returntype", Promise)
], FilmResolver.prototype, "updateFilm", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => typeorm_1.DeleteResult),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FilmResolver.prototype, "removeFilm", null);
FilmResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], FilmResolver);
exports.FilmResolver = FilmResolver;
