import HttpTransport, { PublicRequestOptions, Response } from "./http-transport";

interface QueueItem {
    method: TransportMethod;
    url: string;
    options: PublicRequestOptions;
    callback: (response: Response | null, err?: unknown) => void;
}

type TransportMethod = keyof HttpTransport;

class RequestQueue {
    private _requests = [] as QueueItem[];
    private _isRequesting = false;

    constructor(private _transport: HttpTransport) {}

    start(): void {
        this._next();
    }

    push(method: TransportMethod, url: string, options: PublicRequestOptions): Promise<Response> {
        const promise = new Promise<Response>((resolve, reject) => {
            this._requests.push({
                method,
                url,
                options,
                callback: (response, err) => (err ? reject(err) : resolve(response!)),
            });
        });
        this._next();
        return promise;
    }

    private _next() {
        if (this._isRequesting) return;

        this._isRequesting = true;

        const request = this._requests.shift();
        if (!request) {
            this._isRequesting = false;
            return;
        }

        const { method, url, options, callback } = request;
        // TODO: think about more specific typings for upload methods here (data: File | FormData)
        this._transport[method](url, options as any)
            .then(response => callback(response))
            .catch(err => callback(null, err));

        setTimeout(() => {
            this._next();
        }, 0); // to prevent stack overflow

        this._isRequesting = false;
    }
}

export default RequestQueue;
