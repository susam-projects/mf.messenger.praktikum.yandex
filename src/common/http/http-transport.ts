import { ensureArray } from "../utils/array-utils";

export enum RequestMethod {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE",
    PUT = "PUT",
}

type RequestOptions<TData = unknown> = {
    method: RequestMethod;
    data?: TData;
    headers?: Record<string, string>;
    onProgress?: (progress: number) => void;
};

export type PublicRequestOptions<TData = unknown> = Omit<RequestOptions<TData>, "method">;

export type Response = {
    status: number;
    response: unknown;
};

class HttpTransport {
    get(url: string, { data, ...opts }: PublicRequestOptions = {}): Promise<Response> {
        const urlWithQuery = url + toQuery(data);
        return this._request(urlWithQuery, { ...opts, method: RequestMethod.GET });
    }

    post(url: string, options: PublicRequestOptions = {}): Promise<Response> {
        return this._request(url, { ...options, method: RequestMethod.POST });
    }

    delete(url: string, options: PublicRequestOptions = {}): Promise<Response> {
        return this._request(url, { ...options, method: RequestMethod.DELETE });
    }

    put(url: string, options: PublicRequestOptions = {}): Promise<Response> {
        return this._request(url, { ...options, method: RequestMethod.PUT });
    }

    async uploadFile(url: string, options: PublicRequestOptions<File | File[]>): Promise<Response> {
        if (!options.data) throw new Error("specify the file to upload!");
        const formData = new FormData();
        const files = ensureArray(options.data);
        files.forEach((file, i) => {
            formData.append(`${file}${i}`, file);
        });
        return this.uploadForm(url, { ...options, data: formData });
    }

    uploadForm(url: string, options: PublicRequestOptions<FormData>): Promise<Response> {
        if (!options.data) throw new Error("specify data to upload!");
        return this._request(url, { ...options, method: RequestMethod.PUT });
    }

    private _request(url: string, options: RequestOptions = { method: RequestMethod.GET }): Promise<Response> {
        const { method, data, headers } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.withCredentials = true;

            for (const header in headers) {
                xhr.setRequestHeader(header, headers[header]);
            }

            let dataToSend: string | FormData | null;
            if (!data) {
                dataToSend = null;
            } else if (data instanceof FormData) {
                dataToSend = data;
            } else if (typeof data === "object") {
                dataToSend = JSON.stringify(data);
                xhr.setRequestHeader("Content-Type", "application/json");
            } else {
                dataToSend = `${data}`;
                xhr.setRequestHeader("Content-Type", "text/plain");
            }

            xhr.onload = () => {
                resolve({
                    status: xhr.status,
                    response: xhr.response,
                });
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            xhr.send(dataToSend);
        });
    }
}

function toQuery(data: unknown) {
    if (typeof data !== "object") return "";

    let result = "";
    let isFirst = true;
    for (const key in data) {
        const prefix = isFirst ? "?" : "&";
        result += `${prefix}${key}=${(data as { [index: string]: unknown })[key]}`;
        isFirst = false;
    }
    return result;
}

export default HttpTransport;
