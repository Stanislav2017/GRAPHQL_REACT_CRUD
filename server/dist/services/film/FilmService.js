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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const FilmEntity_1 = require("../../db/models/FilmEntity");
const DB_1 = __importDefault(require("../../db/DB"));
const GenreEntity_1 = require("../../db/models/GenreEntity");
class FilmService {
    constructor() {
        this.connection = DB_1.default.getConnection();
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.connection.manager.findOneBy(FilmEntity_1.FilmEntity, { id });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.connection.manager.find(FilmEntity_1.FilmEntity);
        });
    }
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { genreIds = Array() } = input;
            return this.connection.manager
                .findBy(GenreEntity_1.GenreEntity, { id: (0, typeorm_1.In)(genreIds) })
                .then((genres) => {
                const createdFilmEntity = this.connection.manager.create(FilmEntity_1.FilmEntity, Object.assign(Object.assign({}, input), { genres }));
                return this.connection.manager.save(FilmEntity_1.FilmEntity, createdFilmEntity);
            });
        });
    }
    update(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, genreIds = Array() } = input;
            return this.connection.manager
                .findOneBy(FilmEntity_1.FilmEntity, { id })
                .then((film) => __awaiter(this, void 0, void 0, function* () {
                if (genreIds.length) {
                    this.updateFilmGenres(film, genreIds);
                }
                const updatedFilmEntity = this.connection.manager.create(FilmEntity_1.FilmEntity, input);
                return this.connection.manager
                    .update(FilmEntity_1.FilmEntity, { id }, updatedFilmEntity)
                    .then(() => this.connection.manager.findOneBy(FilmEntity_1.FilmEntity, { id }));
            }));
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.connection.manager
                .delete(FilmEntity_1.FilmEntity, { id })
                .then(({ affected }) => !!affected);
        });
    }
    updateFilmGenres(film, genreIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentIds = (film === null || film === void 0 ? void 0 : film.genres.map((v) => v.id)) || Array();
            const oldIds = currentIds.filter((v) => !genreIds.includes(v)) || Array();
            const newIds = genreIds.filter((v) => !oldIds.includes(v) && !currentIds.includes(v)) ||
                Array();
            if (oldIds.length) {
                yield this.connection
                    .createQueryBuilder()
                    .relation(FilmEntity_1.FilmEntity, "genres")
                    .of(film)
                    .remove(oldIds.map((v) => ({ id: v })));
            }
            if (newIds.length) {
                yield this.connection
                    .createQueryBuilder()
                    .relation(FilmEntity_1.FilmEntity, "genres")
                    .of(film)
                    .add(newIds.map((v) => ({ id: v })));
            }
        });
    }
}
exports.default = FilmService;
