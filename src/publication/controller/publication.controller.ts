import { Request, Response, NextFunction } from "express";
import publicationRepository from "../repository/publication.repository";
import { CreatePublicationDTO } from "../dto/create-publication.dto";
import session from "../../middleware/session";
import logger from "../../logger";
import { AppSessionDTO } from "../../common/dto/app-session.dto";

const getPublications = async (req: Request, res: Response) => {
    const sessionVariables: AppSessionDTO = res.locals.session;
    const publications = await publicationRepository.getPublications(sessionVariables.userId);
    const dtos = publications.map((e) => e.toPublicationDTO());
    res.send(dtos);
};

const getPublication = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const publication = await publicationRepository.getPublicationById(id);
    if (!publication) {
        return res.status(404).json({ message: 'Publication not found' });
    }
    res.json(publication.toPublicationDTO());
}

const setPublication = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const sessionVariables: AppSessionDTO = res.locals.session;
    sessionVariables.currentPublicationId = id;
    session.commitSession(req, res, next, session.sessionVariables);
    res.noContent();
};

const createPublication = async (req: Request, res: Response) => {
    const sessionVariables: AppSessionDTO = res.locals.session;
    const body: CreatePublicationDTO = req.body;
    await publicationRepository.createPublication(sessionVariables.userId, body);
    return res.success(200);
};

const updatePublicationName = async (req: Request, res: Response) => {
    const id = parseInt(req.params.publicationId);
    const name = req.body.name;
    await publicationRepository.updatePublicationName(id, name);
    return res.success(200);
};

const deletePublication = async (req: Request, res: Response) => {
    const id = parseInt(req.params.itemId);
    await publicationRepository.deletePublication(id);
    return res.success(200);
};

export default {
    getPublication,
    getPublications,
    createPublication,
    updatePublicationName,
    deletePublication,
    setPublication,
};