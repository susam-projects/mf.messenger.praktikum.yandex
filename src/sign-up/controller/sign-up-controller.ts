import SignUpApi, { ISignUpData } from "../api/sign-up-api";
import { isOkResponseStatus } from "../../common/http/utils";

class SignUpController {
    private _api = new SignUpApi();

    signUp(data: ISignUpData): Promise<boolean> {
        return this._api
            .signUp(data)
            .then(isOkResponseStatus)
            .catch(() => false);
    }
}

export default SignUpController;
