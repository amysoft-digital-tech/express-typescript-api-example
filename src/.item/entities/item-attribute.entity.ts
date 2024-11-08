import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { ItemType } from "./item-type.entity";
import { ItemAttributeDTO } from "../dto/item-attribute.dto";

@Entity()
export class ItemAttribute extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable:true,})
    initialValue: string;

    @Column()
    typeId: number;

    @Column()
    userId: number;
        
    @ManyToOne(() => ItemType, itemType => itemType.id)  
    type: ItemType;

    toItemAttributeDTO() {
        const dto:ItemAttributeDTO = {
            id: this.id,
            name: this.name,
            initialValue: this.initialValue,
            typeId: this.typeId
        };

        return dto;
    }
}