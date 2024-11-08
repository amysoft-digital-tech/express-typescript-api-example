import { Request, Response } from "express";
import itemAttributeRepository from "../../item/repository/item-attribute.repository";
import itemRepository from "../../item/repository/item.repository";
import listItemRepository from "../repository/list-item.repository";
import listItemValueRepository from "../repository/list-item-value.repository";
import { CreateListItemDTO } from "../dto/create-list-item.dto";
import appOptions from "../../utilities/options";
import sessionController from "../../middleware/session";

import logger from "../../logger";
import { CreateListItemValueDTO } from "../dto/create-list-item-value.dto";
import { ItemTypeDTO } from "../../item/dto/item-type.dto";
import { ItemDTO } from "../../item/dto/item.dto";
import { ListItemDTO } from "../dto/list-item.dto";

const getListItems = async (req: Request, res: Response) => {
    const listItems = await listItemRepository.getListItems(sessionController.sessionVariables.userId);
    const dtos = listItems.map((e) => e.toListItemDTO());

    return res.success(dtos);
};

const createListItem = async (req: Request, res: Response) => {
    const body: CreateListItemDTO = req.body;
    const item: ItemDTO = await itemRepository.getItemById(body.itemId, body.userId);
    const itemAttributes = await itemAttributeRepository.getItemAttributes(item.typeId, body.userId);
    if(appOptions.verboseDebugging) { logger.info(`found ${itemAttributes.length} attributes`); }
    const listItem: ListItemDTO = await listItemRepository.createListItem(body);
    itemAttributes.forEach(attribute => {
        const listItemValue: CreateListItemValueDTO = {
            rFresh: new Date(),
            rStale: new Date('12/31/9999'),
            userId: body.userId,
            itemId: body.itemId,
            listId: body.listId,
            listItemId: listItem.id,
            attributeId: attribute.id,
            attributeValue: attribute.initialValue
        }
        listItemValueRepository.createListItemValue(listItemValue);
    });
    
    return res.created();
};

export default {
    getListItems,
    createListItem,
}