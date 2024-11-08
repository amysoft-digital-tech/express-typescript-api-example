import { NextFunction, Request, Response } from 'express';
import sectionRepository from '../repository/section.repository';
import { CreateSectionDTO } from '../dto/create-section.dto';
import session from '../../middleware/session';
import { AppSessionDTO } from '../../common/dto/app-session.dto';
import logger from '../../logger';

export const getSection = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const section = await sectionRepository.retrieveSection(parseInt(id));
        if (!section) {
            return res.status(404).json({ message: 'Section not found' });
        }
        res.json(section);
    } catch (error) {
        console.error('Error getting section:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const setSection = async (req: Request, res: Response, next: NextFunction) => {
    const sectionId = parseInt(req.params.id);
    const sessionVariables: AppSessionDTO = res.locals.session;
    sessionVariables.currentSectionId = sectionId;
    session.commitSession(req, res, next, sessionVariables);
    res.noContent();
};

export const getSections = async (req: Request, res: Response) => {
    const sessionVariables: AppSessionDTO = res.locals.session;
    logger.info(`Getting sections for current publication ${sessionVariables.currentPublicationId}`);
    
    const sections = await sectionRepository.retrieveSections(sessionVariables.currentPublicationId);
    if (!sections === undefined) {
        return res.status(404).json({ message: 'Section not found' });
    }
    const dtos = sections.map((e) => e.toSectionDTO());
    logger.info(`DTO Object ${JSON.stringify(dtos)}`);
    res.success(dtos);
};

export const updateSection = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const sectionData = req.body;
        const updatedSection = await sectionRepository.updateSection({id, ...sectionData});
        if (!updatedSection) {
            return res.status(404).json({ message: 'Section not found' });
        }
        res.success(200);
    } catch (error) {
        console.error('Error updating section:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteSection = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedSection = await sectionRepository.deleteSection(parseInt(id));
        if (!deletedSection) {
            return res.status(404).json({ message: 'Section not found' });
        }
        res.success(200);
    } catch (error) {
        console.error('Error deleting section:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createSection = async (req: Request, res: Response) => {
    const sessionVariables: AppSessionDTO = res.locals.session;
    const sectionData: CreateSectionDTO = req.body;
    logger.info(`Creating section for user ${sessionVariables.userId}`);
    const createdSection = await sectionRepository.createSection(sessionVariables.userId, sectionData);
    res.success(200);
};

export default {
    createSection,
    setSection,
    getSection,
    getSections,
    updateSection,
    deleteSection,
};
