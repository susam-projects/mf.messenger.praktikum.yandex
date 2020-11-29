import LoginApi from "../api/login-api";
import { isOkResponseStatus } from "../../common/http/utils";

class LoginController {
    private _api = new LoginApi();

    login(login: string, password: string): Promise<boolean> {
        return this._api
            .login(login, password)
            .then(isOkResponseStatus)
            .catch(() => false);
    }
}

export default LoginController;
