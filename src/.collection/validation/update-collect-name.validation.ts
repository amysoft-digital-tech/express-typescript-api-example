import { Request, Response, NextFunction } from "express";
import { UpdateCollectionNameDTO } from "../dto/update-collection-name.dto";
import { validateRequest } from "../../middleware/validate-request";

export const validateUpdateCollectionName = async (req: Request, res: Response, next: NextFunction) => {
    await validateRequest(UpdateCollectionNameDTO, req, res, next);
};