import Api from "../../common/http/api";
import config from "../../config/config";

interface UserInfo {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string | null;
    login: string;
    email: string;
    phone: string;
    avatar: string | null;
}

class AppUserApi {
    private readonly _api = new Api(`${config.apiUrl}/auth/`);

    getUserInfo(): Promise<UserInfo | null> {
        return this._api
            .get("user")
            .then(response => {
                if (response.status !== 200) return null;
                try {
                    return JSON.parse(response.response as string);
                } catch {
                    return null;
                }
            })
            .catch(() => null);
    }
}

export default AppUserApi;
