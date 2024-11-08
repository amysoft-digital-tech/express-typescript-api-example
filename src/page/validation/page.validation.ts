import { Request, Response, NextFunction } from "express";
import { CreatePageDTO } from "../dto/create-page.dto";
import { validateRequest } from "../../middleware/validate-request"

export const validateCreateItem = async (req: Request, res: Response, next: NextFunction) => {
    await validateRequest(CreatePageDTO, req, res, next);
};