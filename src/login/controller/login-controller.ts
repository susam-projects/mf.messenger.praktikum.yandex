import LoginApi from "../api/login-api.js";

class LoginController {
    private _api = new LoginApi();

    login(login: string, password: string): Promise<boolean> {
        return this._api
            .login(login, password)
            .then(response => response.status === 200)
            .catch(() => false);
    }
}

export default LoginController;
