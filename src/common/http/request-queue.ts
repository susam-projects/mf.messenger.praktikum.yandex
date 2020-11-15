import HttpTransport, { PublicRequestOptions, Response } from "./http-transport.js";

interface QueueItem {
    method: TransportMethod;
    url: string;
    options: PublicRequestOptions;
    callback: (response: Response) => void;
}

type TransportMethod = keyof HttpTransport;

class RequestQueue {
    private _requests = [] as QueueItem[];
    private _isRequesting = false;

    constructor(private _transport: HttpTransport) {}

    start() {
        this._next();
    }

    push(method: TransportMethod, url: string, options: PublicRequestOptions): Promise<Response> {
        const promise = new Promise<Response>(resolve => {
            this._requests.push({
                method,
                url,
                options,
                callback: response => resolve(response),
            });
        });
        this._next();
        return promise;
    }

    private async _next() {
        if (this._isRequesting) return;

        this._isRequesting = true;

        const request = this._requests.shift();
        if (!request) {
            this._isRequesting = false;
            return;
        }

        const { method, url, options, callback } = request;
        // TODO: think about more specific typings for upload methods here (data: File | FormData)
        const response = await this._transport[method](url, options as any);
        callback(response);
        setTimeout(() => {
            this._next();
        }, 0); // to prevent stack overflow

        this._isRequesting = false;
    }
}

export default RequestQueue;
