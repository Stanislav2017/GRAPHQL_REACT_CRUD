"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const DBConfig_1 = __importDefault(require("../configs/DBConfig"));
const Film_1 = require("./models/Film");
const Genre_1 = require("./models/Genre");
class DB {
    constructor() {
        this.connection = new typeorm_1.DataSource({
            type: DBConfig_1.default.get("DB_TYPE"),
            host: DBConfig_1.default.get("DB_HOST"),
            port: DBConfig_1.default.get("DB_PORT"),
            username: DBConfig_1.default.get("DB_USER"),
            password: DBConfig_1.default.get("DB_PASSWORD"),
            database: DBConfig_1.default.get("DB_NAME"),
            synchronize: false,
            logging: true,
            entities: [Film_1.Film, Genre_1.Genre],
            migrations: [],
        });
    }
    getConnection() {
        return this.connection;
    }
}
exports.default = new DB();
