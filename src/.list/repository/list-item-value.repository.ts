import { ListItemValues } from "../entities/list-item-value.entity";
import { ItemAttribute } from "../../item/entities/item-attribute.entity";
import { CreateListItemValueDTO } from "../dto/create-list-item-value.dto";

const createListItemValue = (_body: CreateListItemValueDTO ) => {
    ListItemValues.save({ ..._body });
};

export default {
    createListItemValue,
}