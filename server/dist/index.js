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
const express_1 = __importDefault(require("express"));
const AppConfig_1 = __importDefault(require("./configs/AppConfig"));
const cors_1 = __importDefault(require("cors"));
const MainRouter_1 = __importDefault(require("./routes/MainRouter"));
const DB_1 = __importDefault(require("./db/DB"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.configuration();
        this.routes();
        this.connection = DB_1.default.getConnection();
    }
    configuration() {
        this.app.set("port", AppConfig_1.default.get("APP_PORT") || 3001);
        this.app.set("host", AppConfig_1.default.get("APP_HOST") || "localhost");
    }
    routes() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use("/api", MainRouter_1.default.getRoutes());
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const PORT = this.app.get("port");
            try {
                yield this.connection.initialize();
                this.app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
            }
            catch (err) {
                console.error(err);
            }
        });
    }
}
const server = new Server();
server.start();
