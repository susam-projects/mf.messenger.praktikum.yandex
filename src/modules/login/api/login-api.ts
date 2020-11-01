import Api from "../../../infrastructure/api/api.js";
import { Response } from "../../../infrastructure/api/http-transport.js";

class LoginApi {
    private readonly _api = new Api("https://ya-praktikum.tech/api/v2/auth/");

    login(login: string, password: string): Promise<Response> {
        return this._api.post("signin", { login, password });
    }
}

export default LoginApi;
