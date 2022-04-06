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
const GenreEntity_1 = require("../../db/models/GenreEntity");
const DB_1 = __importDefault(require("../../db/DB"));
class GenreService {
    constructor() {
        this.connection = DB_1.default.getConnection();
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.connection.manager.findOneBy(GenreEntity_1.GenreEntity, { id });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.connection.manager.find(GenreEntity_1.GenreEntity);
        });
    }
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdFilm = this.connection.manager.create(GenreEntity_1.GenreEntity, input);
            return this.connection.manager.save(GenreEntity_1.GenreEntity, createdFilm);
        });
    }
    update(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedFilm = this.connection.manager.create(GenreEntity_1.GenreEntity, input);
            return this.connection.manager
                .update(GenreEntity_1.GenreEntity, { id: input.id }, updatedFilm)
                .then(() => this.connection.manager.findOneBy(GenreEntity_1.GenreEntity, { id: input.id }));
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.connection.manager
                .delete(GenreEntity_1.GenreEntity, { id })
                .then(({ affected }) => !!affected);
        });
    }
}
exports.default = GenreService;
