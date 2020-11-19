import SignUpApi, { ISignUpData } from "../api/sign-up-api";

class SignUpController {
    private _api = new SignUpApi();

    signUp(data: ISignUpData): Promise<boolean> {
        return this._api
            .signUp(data)
            .then(response => response.status === 200)
            .catch(() => false);
    }
}

export default SignUpController;
