import AppUserApi from "../api/app-user-api.js";

interface AppUserInfo {
    displayName: string;
    avatar: string;
}

class ChatsController {
    private readonly _appUserApi = new AppUserApi();

    async getAppUserInfo(): Promise<AppUserInfo> {
        const userInfo = await this._appUserApi.getUserInfo();

        let displayName = userInfo?.login ?? "";
        if (userInfo?.display_name) {
            displayName = userInfo.display_name;
        } else if (userInfo?.first_name || userInfo?.second_name) {
            displayName = `${userInfo.first_name ?? ""} ${userInfo.second_name ?? ""}`;
        }

        return {
            displayName,
            avatar: userInfo?.avatar ?? "",
        };
    }
}

export default ChatsController;
