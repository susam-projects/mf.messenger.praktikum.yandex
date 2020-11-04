import AppUserApi, { UserInfo } from "../api/app-user-api.js";

class ViewProfileController {
    private readonly _appUserApi = new AppUserApi();

    logout(): Promise<void> {
        return this._appUserApi.logout();
    }

    getUserInfo(): Promise<UserInfo | null> {
        return this._appUserApi.getUserInfo();
    }
}

export default ViewProfileController;
