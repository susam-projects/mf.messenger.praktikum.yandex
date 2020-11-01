import IndexApi from "./index-api.js";

class IndexController {
    private readonly _indexApi = new IndexApi();

    isAuthorized(): Promise<boolean> {
        return this._indexApi
            .getUserInfo()
            .then(response => response.status === 200)
            .catch(() => false);
    }
}

export default IndexController;
