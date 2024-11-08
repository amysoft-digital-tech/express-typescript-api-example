import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { Item } from "../../item/entities/item.entity";
import { List } from "./list.entity";
import { ListItemValues } from "./list-item-value.entity";
import { ListItemDTO } from "../dto/list-item.dto";

@Entity()
export class ListItem extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    listId: number;

    @Column()
    itemId: number;

    @Column()
    userId: number;

    @CreateDateColumn()
    createdDate: Date;

    @ManyToOne(() => List, list => list.id)
    list: List;
 
    @ManyToOne(() => Item, item => item.id)
    item: Item;

    @OneToMany(() => ListItemValues, (listItemValues) => listItemValues.listItem)
    itemAttributes: ListItemValues[];

    toListItemDTO() {
        const dto: ListItemDTO = {
            id: this.id,
            listId: this.listId,
            itemId: this.itemId,
            userId: this.userId
        };
    }

}