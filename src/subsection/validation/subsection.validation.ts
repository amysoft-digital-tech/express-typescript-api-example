import { Request, Response, NextFunction } from "express";
import { CreateSubsectionDTO } from "../dto/create-subsection.dto";
import { validateRequest } from "../../middleware/validate-request"

export const validateCreateSection = async (req: Request, res: Response, next: NextFunction) => {
    await validateRequest(CreateSubsectionDTO, req, res, next);
};