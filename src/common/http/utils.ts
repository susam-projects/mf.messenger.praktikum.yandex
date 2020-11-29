import { Response } from "./http-transport";

export function isOkStatus(status: number | string): boolean {
    const numericStatus = typeof status === "string" ? Number.parseInt(status, 10) : status;

    return numericStatus >= 200 && numericStatus < 300;
}

export function isOkResponseStatus(response: Response): boolean {
    return isOkStatus(response.status);
}
