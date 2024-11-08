import { ItemType } from "../entities/item-type.entity";

export class ItemDTO {
    id: number;
    name: string;
    typeId: number;
    type: ItemType;
}