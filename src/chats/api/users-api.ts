import Api from "../../common/http/api.js";
import config from "../../config/config.js";

export interface UserInfo {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string | null;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

class UsersApi {
    private readonly _api = new Api(`${config.apiUrl}/user/`);

    searchUsers(login: string): Promise<UserInfo[]> {
        return this._api
            .post("search", { login })
            .then(response => {
                if (response.status !== 200) return [];
                try {
                    return JSON.parse(response.response as string);
                } catch {
                    return [];
                }
            })
            .catch(() => []);
    }
}

export default UsersApi;
