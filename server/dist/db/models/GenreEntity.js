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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreEntity = void 0;
const typeorm_1 = require("typeorm");
const FilmEntity_1 = require("./FilmEntity");
const type_graphql_1 = require("type-graphql");
let GenreEntity = class GenreEntity {
    constructor(partial) {
        Object.assign(this, partial);
    }
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], GenreEntity.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ nullable: false, unique: true }),
    __metadata("design:type", String)
], GenreEntity.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [FilmEntity_1.FilmEntity]),
    (0, typeorm_1.ManyToMany)(() => FilmEntity_1.FilmEntity, (film) => film.genres, { lazy: true }),
    __metadata("design:type", Array)
], GenreEntity.prototype, "films", void 0);
GenreEntity = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)("genre"),
    __metadata("design:paramtypes", [Object])
], GenreEntity);
exports.GenreEntity = GenreEntity;
