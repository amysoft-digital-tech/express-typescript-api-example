import { Request, Response, NextFunction } from "express";
import { CreateSectionDTO } from "../dto/create-section.dto";
import { validateRequest } from "../../middleware/validate-request"

export const validateCreateSection = async (req: Request, res: Response, next: NextFunction) => {
    await validateRequest(CreateSectionDTO, req, res, next);
};