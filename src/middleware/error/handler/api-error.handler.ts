import { Request, Response, NextFunction } from "express";
import { ApiError } from "../api.error";

export const ApiErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof ApiError) {
        return res.status(err.code).json(err.error?{message: err.message, error: err.error}:{message: err.message,})
    }

    return res.status(500).json({message: (err as Error).message, error: err,})

};