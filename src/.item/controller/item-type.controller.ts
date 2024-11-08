import { Request, Response } from "express";
import itemTypeRepository from "../repository/item-type.repository";
import { CreateItemTypeDTO } from "../dto/create-item-type.dto";
import logger from "../../logger";
import appOptions from "../../utilities/options";
import sessionController from "../../middleware/session";

const getItemTypes = async (req: Request, res: Response) => {
    if(appOptions.verboseDebugging){ logger.info(`get types controller`); }
    const itemTypes = await itemTypeRepository.getTypes(sessionController.sessionVariables.userId);
    const dtos = itemTypes.map((e) => e.toItemTypeDTO());
    return res.success(dtos);
};
const getItemTypeById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.typeId);
    const itemType = await itemTypeRepository.getTypeById(id, sessionController.sessionVariables.userId);
    return res.success(itemType);
};
const updateItemTypeName = (req: Request, res: Response) => {};
const createItemType = (req: Request, res: Response) => {
    if(appOptions.verboseDebugging){ logger.info(`create types controller`); }
    const body: CreateItemTypeDTO = req.body;
    itemTypeRepository.createType(body);
    res.created();
};

export default {
    getItemTypes,
    getItemTypeById,
    updateItemTypeName,
    createItemType,
}