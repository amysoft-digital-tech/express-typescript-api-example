import { Request, Response, NextFunction } from "express";
import { CreateItemDTO } from "../dto/create-object.dto";
import { validateRequest } from "../../middleware/validate-request"

export const validateCreateItem = async (req: Request, res: Response, next: NextFunction) => {
    await validateRequest(CreateItemDTO, req, res, next);
};