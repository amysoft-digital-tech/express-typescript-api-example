import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { ListItem } from "./list-item.entity";

@Entity()
export class ListItemValues extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @UpdateDateColumn({type: 'timestamp'})
    rFresh: Date;

    @CreateDateColumn({type: 'timestamp', default:'12/31/9999'})
    rStale: Date;

    @Column()
    userId: number;

    @Column()
    listId: number;

    @Column()
    listItemId: number;

    @ManyToOne(() => ListItem)
    listItem: ListItem;

    @Column()
    attributeId: number;

    @Column()
    attributeValue: string;
}