import { Entity, Column, ColumnType, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToOne, BaseEntity } from "typeorm";
import { PublicationDTO } from "../dto/publication.dto";

@Entity()
export class Publication extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    name: string;

    @Column()
    title: string;

    toPublicationDTO() {
        const dto: PublicationDTO = {
            id: this.id,
            name: this.name,
            title: this.title,
        }
        return dto;
    }
}