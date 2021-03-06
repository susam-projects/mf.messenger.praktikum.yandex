import Api from "../../../common/http/api";
import config from "../../../config/config";
import { isOkResponseStatus } from "../../../common/http/utils";

export interface UpdateProfileRequestData {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone?: string;
}

class EditProfileApi {
    private readonly _api = new Api(`${config.apiUrl}/user/`);

    update(data: UpdateProfileRequestData): Promise<boolean> {
        return this._api
            .put("profile", data)
            .then(isOkResponseStatus)
            .catch(() => false);
    }

    uploadAvatar(avatar: File): Promise<boolean> {
        const data = new FormData();
        data.append("avatar", avatar);

        return this._api
            .uploadForm("profile/avatar", data)
            .then(isOkResponseStatus)
            .catch(() => false);
    }

    changePassword(oldPassword: string, newPassword: string): Promise<boolean> {
        return this._api
            .put("password", { oldPassword, newPassword })
            .then(isOkResponseStatus)
            .catch(() => false);
    }
}

export default EditProfileApi;
