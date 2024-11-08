import express, { Request, Response, NextFunction } from "express";
import subsectionRepository from "../repository/subsection.repository";
import { CreateSubsectionDTO } from "../dto/create-subsection.dto";
import session from '../../middleware/session';
import { AppSessionDTO } from '../../common/dto/app-session.dto';
import logger from '../../logger';

export const createSubsection = (req: Request, res: Response, next: NextFunction) => {
    const sessionVariables: AppSessionDTO = res.locals.session;
    logger.info(`Session Variables: ${JSON.stringify(sessionVariables)}`);
    const body: CreateSubsectionDTO = req.body;
    subsectionRepository.createSubsection(sessionVariables.userId, body);
    return res.success(200);
}

export const getSubsection = async (req: Request, res: Response, next: NextFunction) => {
    const subsectionId: number = parseInt(req.params.subsectionId);
    const subsection = await subsectionRepository.retrieveSubsection(subsectionId);
    if (!subsection) {
        return res.status(404).send("Subsection not found");
    }
    const dto = subsection.toSubsectionDTO();
    return res.send(dto);
}

export const getSubsections = async (req: Request, res: Response, next: NextFunction) => {
    const sessionVariables = res.locals.session;
    const subsections = await subsectionRepository.retrieveSubsections(sessionVariables.currentSectionId);
    const dtos = subsections.map((e) => e.toSubsectionDTO());
    return res.send(dtos);
}

export const updateSubsection = async (req: Request, res: Response, next: NextFunction) => {
    const subsectionId: number = parseInt(req.params.subsectionId);
    const body: CreateSubsectionDTO = req.body;
    const updatedSubsection = await subsectionRepository.updateSubsection(subsectionId, body);
    if (updatedSubsection === undefined) {
        return res.status(404).send("Subsection not found");
    }
    return res.success(200);
}

export const deleteSubsection = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await subsectionRepository.deleteSubsection(parseInt(id));
        return res.status(200).send("Subsection deleted successfully");
    } catch (error) {
        return res.status(500).send("An error occurred while deleting the subsection");
    }
};

export const setSubsection = async (req: Request, res: Response, next: NextFunction) => {
    const subsectionId = parseInt(req.params.subsectionId);
    const sessionVariables: AppSessionDTO = res.locals.session;
    sessionVariables.currentSubsectionId = subsectionId;
    session.commitSession(req, res, next, sessionVariables);
    return res.noContent();
}

export default {
    createSubsection,
    getSubsection,
    getSubsections,
    updateSubsection,
    deleteSubsection,
    setSubsection,
}