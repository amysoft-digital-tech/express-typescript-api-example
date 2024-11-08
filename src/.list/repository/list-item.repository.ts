import { CreateListItemDTO } from "../dto/create-list-item.dto";
import { ListItem } from "../entities/list-item.entity";

const getListItems = (_userId: number) => {
    const listItems = ListItem.createQueryBuilder("listItem")
    .where("listItem.userId = :userId", {userId: _userId})
    .getMany();

    return listItems;
};

const getListItem = () => {};

const createListItem = (_body: CreateListItemDTO) => {

    return ListItem.save({ ..._body });

};

export default {
    getListItems,
    createListItem,
}