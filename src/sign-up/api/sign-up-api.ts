import Api from "../../common/infrastructure/api/api.js";
import { Response } from "../../common/infrastructure/api/http-transport.js";

export interface ISignUpData {
    first_name?: string;
    second_name?: string;
    login: string;
    email: string;
    password: string;
    phone?: string;
}

class SignUpApi {
    private _api = new Api("https://ya-praktikum.tech/api/v2/auth/");

    signUp(data: ISignUpData): Promise<Response> {
        return this._api.post("signup", data);
    }
}

export default SignUpApi;
