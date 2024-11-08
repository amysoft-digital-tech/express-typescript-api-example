import { Item } from "../entities/item.entity";
import { CreateItemDTO } from "../dto/create-item.dto";
import logger from "../../logger";
import { ItemDTO } from "../dto/item.dto";

const getItems = (_userId) => {
    const items = Item.createQueryBuilder("item")
    .leftJoinAndSelect("item.type", "itemType")
    .leftJoinAndSelect("itemType.attributes", "itemAttribute")
    .where("item.userId = :userId", {userId: _userId})
    .getMany();
    return items;
    //return Item.find({relations:{type:{attributes:true}}});
};

const getItemById = (_id, _userId) => {
    const item = Item.createQueryBuilder("item")
    .leftJoinAndSelect("item.type", "itemType")
    .leftJoinAndSelect("itemType.attributes", "itemAttribute")
    .where("item.userId = :userId", {userId: _userId})
    .andWhere("item.id = :id", {id: _id})
    .getOne();
    return item;
};

const createItem = (body: CreateItemDTO) => {
    //logger.info(`Item Repository:Create Item ${body}`);
    return Item.save({ ...body });
};

const updateItemName = (id: number, name: string) => {
    
    return Item.update({id}, {name});
};

const updateItemType = (id: number, typeId: number) => {
    return Item.update({id},{typeId});
};

export default {
    getItems,
    getItemById,
    createItem,
    updateItemName,
    updateItemType,
}