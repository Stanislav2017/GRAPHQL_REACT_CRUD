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
exports.FilmEntity = void 0;
const typeorm_1 = require("typeorm");
const GenreEntity_1 = require("./GenreEntity");
const type_graphql_1 = require("type-graphql");
let FilmEntity = class FilmEntity {
    constructor(partial) {
        Object.assign(this, partial);
    }
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FilmEntity.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ nullable: false, unique: true }),
    __metadata("design:type", String)
], FilmEntity.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], FilmEntity.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [GenreEntity_1.GenreEntity]),
    (0, typeorm_1.ManyToMany)(() => GenreEntity_1.GenreEntity, (genre) => genre.films, {
        cascade: true,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        eager: true,
    }),
    (0, typeorm_1.JoinTable)({
        name: "films_genres",
        joinColumn: { name: "film_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "genre_id", referencedColumnName: "id" },
    }),
    __metadata("design:type", Array)
], FilmEntity.prototype, "genres", void 0);
FilmEntity = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)("film"),
    __metadata("design:paramtypes", [Object])
], FilmEntity);
exports.FilmEntity = FilmEntity;
