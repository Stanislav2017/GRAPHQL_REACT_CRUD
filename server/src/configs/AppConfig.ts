import IAppConfig from "./interfaces/IAppConfig";
import Config from "./Config";

class AppConfig extends Config<IAppConfig> {}

export default new AppConfig();
