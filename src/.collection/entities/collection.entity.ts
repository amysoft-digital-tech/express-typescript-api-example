import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, BaseEntity } from "typeorm";
import { List } from '../../list/entities/list.entity';
import { CollectionDTO } from "../dto/collection.dto";
import logger from "../../logger";
import appOptions from "../../utilities/options";

export enum CollectionType {
    LIST = "1",    
}
@Entity()
export class Collection extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    userId: number;

    @Column({
        type: "enum",
        enum: CollectionType,
        default: CollectionType.LIST
    })
    type: CollectionType;

    @OneToMany(() => List, (list) => list.collection)
    lists: List[];

    @CreateDateColumn()
    createdDate: Date;

    toCollectionDTO() {
        const dto: CollectionDTO = {
            id: this.id,
            userId: this.userId,
            name: this.name,
            type: this.type,
            lists: this.lists,
            createdDate: this.createdDate,
        }
        if(appOptions.verboseDebugging){logger.info(`[Collection][Controller] DTO ${dto.name}`);}
        return dto;
        
    }
}