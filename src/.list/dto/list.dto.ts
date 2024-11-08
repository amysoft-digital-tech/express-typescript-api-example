import { Collection } from "../../collection/entities/collection.entity";
import { ListItem } from "../entities/list-item.entity";

export class ListDTO {
    id: number;
    name: string;
    collectionId?: number;
    listItems?: ListItem;
    collection?: Collection;
}