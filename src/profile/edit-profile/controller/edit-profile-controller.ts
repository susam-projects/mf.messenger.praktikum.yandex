import EditProfileApi from "../api/edit-profile-api.js";
import AppUserApi from "../api/app-user-api.js";

export interface UserProfileGetData {
    avatar: string | null;
    firstName: string;
    secondName: string;
    displayName: string;
    login: string;
    email: string;
    phone: string;
}

export interface UserProfileUpdateData {
    avatar?: File;
    firstName: string;
    secondName: string;
    displayName: string;
    login: string;
    email: string;
    phone?: string;
    oldPassword?: string;
    newPassword?: string;
}

class EditProfileController {
    private readonly _appUserApi = new AppUserApi();
    private readonly _editProfileApi = new EditProfileApi();

    async getProfileData(): Promise<UserProfileGetData | null> {
        const userInfo = await this._appUserApi.getUserInfo();
        if (userInfo) {
            return {
                avatar: userInfo.avatar ? `https://ya-praktikum.tech${userInfo.avatar}` : null,
                firstName: userInfo.first_name,
                secondName: userInfo.second_name,
                displayName: userInfo.display_name ?? "",
                login: userInfo.login,
                email: userInfo.email,
                phone: userInfo.phone,
            };
        }
        return null;
    }

    async update(data: UserProfileUpdateData): Promise<boolean> {
        try {
            if (data.avatar) {
                if (!(await this._editProfileApi.uploadAvatar(data.avatar))) return false;
            }

            if (data.oldPassword && data.newPassword) {
                if (!(await this._editProfileApi.changePassword(data.oldPassword, data.newPassword))) return false;
            }

            if (
                !(await this._editProfileApi.update({
                    first_name: data.firstName ?? "",
                    second_name: data.secondName ?? "",
                    display_name: data.displayName ?? "",
                    login: data.login ?? "",
                    email: data.email ?? "",
                    phone: data.phone || undefined,
                }))
            )
                return false;
        } catch {
            return false;
        }

        return true;
    }
}

export default EditProfileController;
