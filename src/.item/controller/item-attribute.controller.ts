import { Request, Response } from "express";
import itemAttributesRepository from "../repository/item-attribute.repository";
import logger from "../../logger";
import appOptions from "../../utilities/options";
import { CreateItemAttributeDTO } from "../dto/create-item-atttribute.dto";
import sessionController from "../../middleware/session";

import { parse } from "url";
import { ItemAttributeDTO } from "../dto/item-attribute.dto";

const getAttributes = async (req: Request, res: Response) => {
    sessionController.sessionVariables = res.locals.session;
    if(sessionController.sessionVariables && sessionController.sessionVariables.isLoggedIn){
        const originalRequest = parse(req.originalUrl);    
        const typeIdMatch = originalRequest.pathname?.match(/\/types\/(\d+)\/attributes/);
        const typeId = parseInt(typeIdMatch[1], 10);
        if(appOptions.verboseDebugging){ logger.info(`get attributes controller type: ${req.originalUrl} - ${typeId}`); }
        const attributes = await itemAttributesRepository.getItemAttributes(typeId, sessionController.sessionVariables.userId);
        const dtos = attributes.map((e) => e.toItemAttributeDTO());

        return res.success(dtos);
    }
};
const createAttribute = (req: Request, res: Response) => {
    const typeId: number = parseInt(req.params.typeId);
    const body: CreateItemAttributeDTO = req.body;
    itemAttributesRepository.createItemAttribute(body);

    return res.created();
};

export default {
    getAttributes,
    createAttribute,
}