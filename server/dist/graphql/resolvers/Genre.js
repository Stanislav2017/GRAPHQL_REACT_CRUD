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
exports.GenreResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Genre_1 = require("../../db/models/Genre");
let GenreResolver = class GenreResolver {
    getGenres() {
        return __awaiter(this, void 0, void 0, function* () {
            const genres = Genre_1.Genre.find();
            return genres;
        });
    }
    getGenre(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const genre = Genre_1.Genre.findOneBy({ id });
            return genre;
        });
    }
    createGenre(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdGenre = yield Genre_1.Genre.save({ title });
            return createdGenre;
        });
    }
    updateGenre(id, title) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdGenre = yield Genre_1.Genre.update({ id }, { title });
            return createdGenre;
        });
    }
    removeGenre(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdGenre = yield Genre_1.Genre.delete(id);
            return createdGenre;
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Genre_1.Genre]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GenreResolver.prototype, "getGenres", null);
__decorate([
    (0, type_graphql_1.Query)(() => Genre_1.Genre),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GenreResolver.prototype, "getGenre", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Genre_1.Genre),
    __param(0, (0, type_graphql_1.Arg)("title")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GenreResolver.prototype, "createGenre", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => typeorm_1.UpdateResult),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("title")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], GenreResolver.prototype, "updateGenre", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => typeorm_1.DeleteResult),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GenreResolver.prototype, "removeGenre", null);
GenreResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], GenreResolver);
exports.GenreResolver = GenreResolver;
