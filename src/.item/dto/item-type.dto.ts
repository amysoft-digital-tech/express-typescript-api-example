import { ItemAttribute } from "../entities/item-attribute.entity";
import { Item } from "../entities/item.entity";

export class ItemTypeDTO {
    id: number;
    name: string;
    items: Item[];
    attributes: ItemAttribute[];
}