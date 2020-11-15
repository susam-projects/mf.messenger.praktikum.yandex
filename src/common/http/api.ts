import HttpTransport from "./http-transport.js";
import RequestQueue from "./request-queue.js";

class Api {
    private _queue = new RequestQueue(new HttpTransport());

    constructor(private readonly _basePath: string) {}

    get(url: string, data?: unknown) {
        return this._queue.push("get", `${this._basePath}${url}`, { data });
    }

    post(url: string, data?: unknown) {
        return this._queue.push("post", `${this._basePath}${url}`, { data });
    }

    put(url: string, data?: unknown) {
        return this._queue.push("put", `${this._basePath}${url}`, { data });
    }

    delete(url: string, data?: unknown) {
        return this._queue.push("delete", `${this._basePath}${url}`, { data });
    }

    uploadFile(url: string, data: File | File[]) {
        return this._queue.push("uploadFile", `${this._basePath}${url}`, { data });
    }

    uploadForm(url: string, data: FormData) {
        return this._queue.push("uploadForm", `${this._basePath}${url}`, { data });
    }
}

export default Api;
