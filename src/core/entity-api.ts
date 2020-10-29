import Api from "../infrastructure/api/api.js";

class EntityApi<T> {
    protected _api: Api;

    constructor(basePath: string) {
        this._api = new Api(basePath);
    }

    create(data: T): Promise<T | Error> {
        return this._api
            .post("/", data)
            .then(response => response.response as T)
            .catch(() => new Error("unable to create entity"));
    }

    get(id: string): Promise<T | null> {
        return new Promise(resolve => {
            this._api
                .get(`/${id}`)
                .then(response => resolve(response.response as T))
                .catch(() => resolve(null));
        });
    }

    update(id: string, data: T): Promise<T | Error> {
        return this._api
            .put(`/${id}`, data)
            .then(response => response.response as T)
            .catch(() => new Error("unable to update entity"));
    }

    delete(id: string): Promise<void | Error> {
        return this._api
            .delete(`/${id}`)
            .then(() => {})
            .catch(() => new Error("unable to delete entity"));
    }
}

export default EntityApi;
