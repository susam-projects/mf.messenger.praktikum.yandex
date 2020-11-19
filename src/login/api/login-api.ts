import Api from "../../common/http/api";
import { Response } from "../../common/http/http-transport";
import config from "../../config/config";

class LoginApi {
    private readonly _api = new Api(`${config.apiUrl}/auth/`);

    login(login: string, password: string): Promise<Response> {
        return this._api.post("signin", { login, password });
    }
}

export default LoginApi;
