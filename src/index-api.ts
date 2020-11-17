import Api from "./common/http/api.js";
import { Response } from "./common/http/http-transport.js";
import config from "./config/config.js";

class IndexApi {
    private readonly _api = new Api(`${config.apiUrl}/auth/`);

    getUserInfo(): Promise<Response> {
        return this._api.get("user");
    }
}

export default IndexApi;
