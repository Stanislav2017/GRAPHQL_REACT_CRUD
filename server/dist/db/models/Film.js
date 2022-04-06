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
exports.Film = void 0;
const typeorm_1 = require("typeorm");
const Genre_1 = require("./Genre");
const type_graphql_1 = require("type-graphql");
let Film = class Film extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Film.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Film.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Film.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Genre_1.Genre]),
    (0, typeorm_1.ManyToMany)(() => Genre_1.Genre, (genre) => genre.films, {
        lazy: true,
        cascade: true,
    }),
    (0, typeorm_1.JoinTable)({
        name: "films_genres",
        joinColumn: { name: "genre_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "film_id", referencedColumnName: "id" },
    }),
    __metadata("design:type", Array)
], Film.prototype, "genres", void 0);
Film = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)("film")
], Film);
exports.Film = Film;
