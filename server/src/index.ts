import express from "express";
import appConfig from "./configs/AppConfig";
import cors from "cors";
import MainRouter from "./routes/MainRouter";
import db from "./db/DB";
import { DataSource } from "typeorm";

class Server {
  private app: express.Application;
  private connection: DataSource;
  constructor() {
    this.app = express();
    this.configuration();
    this.routes();
    this.connection = db.getConnection();
  }

  private configuration() {
    this.app.set("port", appConfig.get<number>("APP_PORT") || 3001);
    this.app.set("host", appConfig.get<string>("APP_HOST") || "localhost");
  }

  private routes() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use("/api", MainRouter.getRoutes());
  }

  public async start() {
    const PORT: number = this.app.get("port");
    try {
      await this.connection.initialize();
      this.app.listen(PORT, () =>
        console.log(`Server is running on port ${PORT}`)
      );
    } catch (err) {
      console.error(err);
    }
  }
}

const server = new Server();
server.start();
