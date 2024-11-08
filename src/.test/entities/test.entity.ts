import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class test {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
