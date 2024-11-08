import { List } from "../../list/entities/list.entity";
export enum CollectionType {
    LIST = "1",    
}
export class CollectionDTO {
    id:number;
    userId: number;
    name: string;
    type: CollectionType;
    lists: List[];
    createdDate: Date;
}