import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BaseEntity, OneToOne, JoinColumn } from "typeorm";
import { UserDTO } from "../dto/user.dto";
import { UserSalt } from "./user-salt.entity";
import { UserPasscode } from "./user-passcode.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @CreateDateColumn()
    dateCreated: Date;

    @OneToOne(() => UserSalt)
    @JoinColumn()
    storedSalt: UserSalt;

    @OneToOne(() => UserPasscode)
    @JoinColumn()
    storedPasscode: UserPasscode;

    toUserDTO() {
        const dto: UserDTO = {
            id: this.id,
            username: this.username,
            dateCreated: this.dateCreated,
        }

        return dto;
    }
}