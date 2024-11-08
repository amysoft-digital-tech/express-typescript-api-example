import { Entity, Column, ColumnType, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToOne, BaseEntity } from "typeorm";
import { PublicationSettingsDTO } from "../dto/publication-settings.dto";

@Entity()
export class PublicationSettings extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    publicationId: number;

    @Column()
    heroImage: string;

    @Column()
    badgeImage: string;

    @Column()
    primaryColor: string;

    @Column()
    secondaryColor: string;

    @Column()
    buttonColor: string;

    @Column()
    textColor: string;

    @Column()
    textType: string;

    @Column()
    domainName: string;

    toPublicationSettingsDTO() {
        const dto: PublicationSettingsDTO = {
            id: this.id,
            publicationId: this.publicationId,
            heroImage: this.heroImage,
            badgeImage: this.badgeImage,
            primaryColor: this.primaryColor,
            secondaryColor: this.secondaryColor,
            buttonColor: this.buttonColor,
            textColor: this.textColor,
            textType: this.textType,
            domainName: this.domainName
        };

        return dto;
    }
}