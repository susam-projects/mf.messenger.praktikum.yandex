import HttpTransport from "./http-transport";
import RequestQueue from "./request-queue";

class Api {
    private _queue = new RequestQueue(new HttpTransport());

    constructor(private readonly _basePath: string) {}

    get(url: string, data?: unknown): ReturnType<HttpTransport["get"]> {
        return this._queue.push("get", `${this._basePath}${url}`, { data });
    }

    post(url: string, data?: unknown): ReturnType<HttpTransport["post"]> {
        return this._queue.push("post", `${this._basePath}${url}`, { data });
    }

    put(url: string, data?: unknown): ReturnType<HttpTransport["put"]> {
        return this._queue.push("put", `${this._basePath}${url}`, { data });
    }

    delete(url: string, data?: unknown): ReturnType<HttpTransport["delete"]> {
        return this._queue.push("delete", `${this._basePath}${url}`, { data });
    }

    uploadFile(url: string, data: File | File[]): ReturnType<HttpTransport["uploadFile"]> {
        return this._queue.push("uploadFile", `${this._basePath}${url}`, { data });
    }

    uploadForm(url: string, data: FormData): ReturnType<HttpTransport["uploadForm"]> {
        return this._queue.push("uploadForm", `${this._basePath}${url}`, { data });
    }
}

export default Api;
