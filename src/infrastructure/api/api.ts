import HttpTransport from "./http-transport.js";

class Api {
    private _transport = new HttpTransport();

    constructor(private readonly _basePath: string) {}

    get(url: string, data?: unknown) {
        return this._transport.get(`${this._basePath}${url}`, { data });
    }

    post(url: string, data?: unknown) {
        return this._transport.post(`${this._basePath}${url}`, { data });
    }

    put(url: string, data?: unknown) {
        return this._transport.put(`${this._basePath}${url}`, { data });
    }

    delete(url: string, data?: unknown) {
        return this._transport.delete(`${this._basePath}${url}`, { data });
    }

    upload(url: string, fileOrFiles: File | File[]) {
        return this._transport.upload(`${this._basePath}${url}`, { data: fileOrFiles });
    }
}

export default Api;