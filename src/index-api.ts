import Api from "./common/infrastructure/api/api.js";
import { Response } from "./common/infrastructure/api/http-transport.js";

class IndexApi {
    private readonly _api = new Api("https://ya-praktikum.tech/api/v2/auth/");

    getUserInfo(): Promise<Response> {
        return this._api.get("user");
    }
}

export default IndexApi;
