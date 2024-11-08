import { Request, Response, NextFunction } from "express";
import { CreatePublicationDTO } from "../dto/create-publication.dto";
import { validateRequest } from "../../middleware/validate-request"

export const validateCreatePublication = async (req: Request, res: Response, next: NextFunction) => {
    await validateRequest(CreatePublicationDTO, req, res, next);
};