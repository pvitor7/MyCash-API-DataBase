export class AppError extends Error {
    statusCode: number
    constructor(message: string, status: number = 400){
        super()
        this.statusCode = status;
        this.message = message;
    }
};