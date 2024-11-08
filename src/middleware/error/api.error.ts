export class ApiError extends Error {
    public code: number;
    public message: string;
    public error: Error;

    constructor(code, message, error) {
        super(message);
        this.code = code;
        this.message = message;
        this.error = error;
    }
};

export const badRequest = (_message: string = 'Bad Request', _error: Error) => {
    throw new ApiError(400, _message, _error);
};

export const unauthorized = (_message: string = 'Unauthorized', _error?: Error) => {
    throw new ApiError(401, _message, _error);
};

export const forbidden = (_message: string = 'Forbidden', _error?: Error) => {
    throw new ApiError(403, _message, _error);
};

export const notFound = (_message:string = 'Not Found',_error?: Error) => {
    throw new ApiError(404, _message, _error);
};

export const notAcceptable = (_message: string = 'Not Acceptable', _error?: Error) => {
    throw new ApiError(406, _message, _error);
};

export const unprocessableEnity = (_message: string = 'Unprocessable Entity', _error?: Error) => {
    throw new ApiError(422, _message, _error);
};

export const internalError = (_message: string = 'Internal Error', _error?: Error) => {
    throw new ApiError(500, _message, _error);
};