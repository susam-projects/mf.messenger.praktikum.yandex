import Api from "../../../../infrastructure/api/api.js";

class AppUserApi {
    private readonly _api = new Api("https://ya-praktikum.tech/api/v2/auth/");

    logout(): Promise<void> {
        return this._api
            .post("logout")
            .then(() => {})
            .catch(() => {});
    }
}

export default AppUserApi;
