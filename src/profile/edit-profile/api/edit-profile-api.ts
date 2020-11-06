import Api from "../../../common/infrastructure/api/api.js";

export interface UpdateProfileRequestData {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone?: string;
}

class EditProfileApi {
    private readonly _api = new Api("https://ya-praktikum.tech/api/v2/user/");

    update(data: UpdateProfileRequestData): Promise<boolean> {
        return this._api
            .put("profile", data)
            .then(response => response.status === 200)
            .catch(() => false);
    }

    uploadAvatar(avatar: File) {
        return this._api
            .upload("profile/avatar", avatar)
            .then(response => response.status === 200)
            .catch(() => false);
    }

    changePassword(oldPassword: string, newPassword: string) {
        return this._api
            .put("password", { oldPassword, newPassword })
            .then(response => response.status === 200)
            .catch(() => false);
    }
}

export default EditProfileApi;