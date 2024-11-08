import { Request, Response, NextFunction } from "express";
import { CreateCollectionDTO } from "../dto/create-collection.dto";
import { validateRequest } from "../../middleware/validate-request";

export const validateCreateCollection = async (req: Request, res: Response, next: NextFunction) => {
    await validateRequest(CreateCollectionDTO, req, res, next);
};