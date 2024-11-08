import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany, BaseEntity  } from "typeorm";
import { Collection } from "../../collection/entities/collection.entity";
import { ListItem } from "./list-item.entity";
import { ListDTO } from "../dto/list.dto";

@Entity()
export class List extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    collectionId: number;

    @OneToMany(() => ListItem, (listItem) => listItem.list)
    listItems: ListItem[];

    @ManyToOne(() => Collection, collection => collection.lists)
    collection: Collection;

    toListDTO() {
        const dto: ListDTO = {
            id: this.id,
            name: this.name,
            collectionId: this.collectionId,
            collection: this.collection,
        }

        return dto;
    }
}