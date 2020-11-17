import Api from "../../common/http/api.js";
import { Response } from "../../common/http/http-transport.js";
import config from "../../config/config.js";

export interface ISignUpData {
    first_name?: string;
    second_name?: string;
    login: string;
    email: string;
    password: string;
    phone?: string;
}

class SignUpApi {
    private _api = new Api(`${config.apiUrl}/auth/`);

    signUp(data: ISignUpData): Promise<Response> {
        return this._api.post("signup", data);
    }
}

export default SignUpApi;
