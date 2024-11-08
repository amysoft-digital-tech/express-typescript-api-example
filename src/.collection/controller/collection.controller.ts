import { NextFunction, Request, Response } from "express";
import { AppSessionDTO } from "../../common/dto/app-session.dto";
import sessionController from "../../middleware/session";
import logger from "../../logger";
import appOptions from "../../utilities/options";

import collectionRepository from "../repository/collection.repository";
import { CreateCollectionDTO } from "../dto/create-collection.dto";
import { UpdateCollectionNameDTO } from "../dto/update-collection-name.dto";

declare global {
    namespace Express {
        interface locals {
            session: AppSessionDTO
        }
    }
}


const getCollections = async (req: Request, res: Response) => {
    sessionController.sessionVariables = res.locals.session;
    if(sessionController.sessionVariables && sessionController.sessionVariables.isLoggedIn) {
        const collections = await collectionRepository.getCollections(sessionController.sessionVariables.userId);
        if(appOptions.verboseDebugging){logger.info(`[Collection][Controller] Found ${collections.length} Collections`);}
        collections.forEach((e) => {
            if(appOptions.verboseDebugging){logger.info(`[Collection][Controller] Found Collection ${e.name}`);}
        });
        const dtos = collections.map((e) => e.toCollectionDTO());
        if(appOptions.verboseDebugging){logger.info(`[Collection][Controller] Mapped ${dtos.length} DTOs`);}
        return res.status(200).json(dtos);
    }
};

const createCollection = async (req: Request, res: Response) => {
    sessionController.sessionVariables = res.locals.session;
    if(sessionController.sessionVariables && sessionController.sessionVariables.isLoggedIn) {
        if(appOptions.verboseDebugging) { logger.info(`Creating Collection By User: ${sessionController.sessionVariables.userId}`); }
        const uid = {userId:sessionController.sessionVariables.userId};
        const body: CreateCollectionDTO = { ...req.body, ...uid};
        await collectionRepository.createCollection(body);
        return res.status(200).end();
    }
};

const updateCollectionName = async (req: Request, res: Response) => {
    sessionController.sessionVariables = res.locals.session;
    if(sessionController.sessionVariables && sessionController.sessionVariables.isLoggedIn) {
        
        const uid = {userId:sessionController.sessionVariables.userId};
        const body: UpdateCollectionNameDTO = { ...req.body, ...uid};
        if(appOptions.verboseDebugging) { logger.info(`Updating Collection Name ${body.name} By User: ${sessionController.sessionVariables.userId}`); }
        await collectionRepository.updateCollectionName(body.id, body.name);
        return res.status(200).end();
    }
};
const removeCollection = async (req: Request, res: Response) => {};

export default {
    getCollections,
    createCollection,
    updateCollectionName,
}