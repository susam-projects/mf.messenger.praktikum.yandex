import Api from "../../common/http/api";
import { Response } from "../../common/http/http-transport";
import config from "../../config/config";

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
