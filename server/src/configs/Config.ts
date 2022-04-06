import * as dotenv from "dotenv";
dotenv.config();
import { env } from "process";

export default abstract class Config<T> {
  private variables: T;
  public constructor() {
    this.variables = this.getSanitzedConfig(env);
  }

  public get<T1>(name: keyof T) {
    return <T1>(<unknown>this.variables[name]);
  }

  private getSanitzedConfig(config: any): T {
    for (const [key, value] of Object.entries(config)) {
      if (value === undefined) {
        throw new Error(`Missing key ${key} in .env`);
      }
    }
    return config as T;
  }
}
