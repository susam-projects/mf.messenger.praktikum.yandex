import Api from "./common/http/api";
import { Response } from "./common/http/http-transport";
import config from "./config/config";

class IndexApi {
    private readonly _api = new Api(`${config.apiUrl}/auth/`);

    getUserInfo(): Promise<Response> {
        return this._api.get("user");
    }
}

export default IndexApi;
