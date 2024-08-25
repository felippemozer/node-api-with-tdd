import { getReasonPhrase } from "http-status-codes";

export class ApiError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super();
        this.status = status ?? 500;
        this.name = getReasonPhrase(status);
        this.message = message;
    }
}