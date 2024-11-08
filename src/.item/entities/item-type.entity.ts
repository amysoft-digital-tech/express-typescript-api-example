import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ItemAttribute } from "./item-attribute.entity";
import { Item } from "./item.entity";
import { dot } from "node:test/reporters";
import { ItemTypeDTO } from "../dto/item-type.dto";

@Entity()
export class ItemType extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column()
    userId: number;

    @OneToMany(() => Item, item => item.type)
    items: Item[];

    @OneToMany(() => ItemAttribute, (itemAttribute) => itemAttribute.type)
    attributes: ItemAttribute[];

    toItemTypeDTO() {
        const dto: ItemTypeDTO = {
            id: this.id,
            name: this.name,
            items: this.items,
            attributes: this.attributes
        }
        return dto;
    }

}