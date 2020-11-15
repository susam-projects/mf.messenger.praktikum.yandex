import AppUserApi, { UserInfo } from "../api/app-user-api.js";

class ViewProfileController {
    private readonly _appUserApi = new AppUserApi();

    logout(): Promise<void> {
        return this._appUserApi.logout();
    }

    async getUserInfo(): Promise<UserInfo | null> {
        const info = await this._appUserApi.getUserInfo();
        if (!info) return null;
        return {
            ...info,
            avatar: info.avatar ? `https://ya-praktikum.tech${info.avatar}` : null,
        };
    }
}

export default ViewProfileController;
