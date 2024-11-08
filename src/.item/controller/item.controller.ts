import { Request, Response } from "express";
import itemRepository from "../repository/item.repository";
import { CreateItemDTO } from "../dto/create-item.dto";
import logger from "../../logger";
import sessionController from "../../middleware/session";

const getItems = async (req: Request, res: Response) => {
    const items = await itemRepository.getItems(sessionController.sessionVariables.userId);
    const dtos = items.map((e) => e.toItemDTO());
    res.success(dtos);
};

const getItemById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.itemId);
    const item = await itemRepository.getItemById(id, sessionController.sessionVariables.userId);
    return res.success(item);
    
};

const createItem = async (req: Request, res: Response) => {
    //logger.info(`Item Controller::Create Item ${req.body}`);
    const body: CreateItemDTO = req.body;
    //logger.info(`Item Controller::Create Item DTO ${body}`);
    await itemRepository.createItem(body);
    return res.created(true);
};

const updateItemName = async (req: Request, res: Response) => {
    const id = parseInt(req.params.itemId);
    const name = req.body.name;
    await itemRepository.updateItemName(id, name);
    res.sendStatus(200);

};

const updateItemType = async (req: Request, res: Response) => {
    const id = parseInt(req.params.itemId);
    const itemTypeId = parseInt(req.body.typeId);
    await itemRepository.updateItemType(id, itemTypeId);
};

export default {
    getItems,
    getItemById,
    createItem,
    updateItemName,
    updateItemType,
};