import { Entity, Column, ColumnType, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToOne, BaseEntity } from "typeorm";
import { ObjectDTO } from "object/dto/object.dto";

@Entity()
export class Object extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    toObjectDTO() {
        const dto: ObjectDTO = {
            id: this.id,
            name: this.name,
        }
        return dto;
    }
}