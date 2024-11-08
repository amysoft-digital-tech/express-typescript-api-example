import { List } from "../entities/list.entity";
import { CreateListDTO } from "../dto/create-list.dto";
import { ListDTO } from "../dto/list.dto";

const getLists = (relations?: boolean) => {
    return List.find({relations: {listItems: {itemAttributes: true}, collection: true}});
}

const createList = (body: CreateListDTO) => {
    List.save({ ...body });
}

export default {
    getLists,
    createList,
}