import Api from "../../common/http/api.js";
import { Response } from "../../common/http/http-transport.js";
import config from "../../config/config.js";

class LoginApi {
    private readonly _api = new Api(`${config.apiUrl}/auth/`);

    login(login: string, password: string): Promise<Response> {
        return this._api.post("signin", { login, password });
    }
}

export default LoginApi;
