export class AppError extends Error {
    statusCode: number;
    constructor(message: string, status: number = 400){
        this.statusCode = statusCode;
        this.message = message;
    }
};