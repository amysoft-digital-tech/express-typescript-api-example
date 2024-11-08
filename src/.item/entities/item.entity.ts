import { Entity, Column, ColumnType, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToOne, BaseEntity } from "typeorm";
import { ItemType } from "./item-type.entity";
import { ItemDTO } from "../dto/item.dto";

@Entity()
export class Item extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    userId: number;

    @Column()
    typeId: number;

    @ManyToOne(() => ItemType, itemType => itemType.items)
    type: ItemType;

    toItemDTO() {
        const dto: ItemDTO = {
            id: this.id,
            name: this.name,
            typeId: this.typeId,
            type: this.type,
        }
        return dto;
    }
}