import AppUserApi from "../api/app-user-api.js";

class ViewProfileController {
    private readonly _appUserApi = new AppUserApi();

    logout(): Promise<void> {
        return this._appUserApi.logout();
    }
}

export default ViewProfileController;
