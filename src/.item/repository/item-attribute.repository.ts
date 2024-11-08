import { ItemAttribute } from "../entities/item-attribute.entity";
import { CreateItemAttributeDTO } from "../dto/create-item-atttribute.dto";
import { ItemAttributeDTO } from "../dto/item-attribute.dto";
import appOptions from "../../utilities/options";
import logger from "../../logger";

const getItemAttributes = (_id: number, _userId: number) => {
    return ItemAttribute.findBy({ userId: _userId, typeId: _id });
};
const createItemAttribute = (body: CreateItemAttributeDTO) => {
    ItemAttribute.save({ ...body });
};

export default {
    getItemAttributes,
    createItemAttribute,
}