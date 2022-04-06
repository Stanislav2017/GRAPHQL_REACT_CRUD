import { DataSource, DatabaseType } from "typeorm";
import dbConfig from "../configs/DBConfig";
import { FilmEntity } from "./models/FilmEntity";
import { GenreEntity } from "./models/GenreEntity";

class DB {
  private connection: DataSource;
  constructor() {
    this.connection = new DataSource({
      type: dbConfig.get<"postgres">("DB_TYPE"),
      host: dbConfig.get<string>("DB_HOST"),
      port: dbConfig.get<number>("DB_PORT"),
      username: dbConfig.get<string>("DB_USER"),
      password: dbConfig.get<string>("DB_PASSWORD"),
      database: dbConfig.get<string>("DB_NAME"),
      synchronize: false,
      logging: true,
      entities: [FilmEntity, GenreEntity],
      migrations: [],
    });
  }

  public getConnection(): DataSource {
    return this.connection;
  }
}

export default new DB();
