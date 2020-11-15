import Api from "./common/http/api.js";
import { Response } from "./common/http/http-transport.js";

class IndexApi {
    private readonly _api = new Api("https://ya-praktikum.tech/api/v2/auth/");

    getUserInfo(): Promise<Response> {
        return this._api.get("user");
    }
}

export default IndexApi;
