import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne, BaseEntity } from "typeorm";
import { Publication } from "../../publication/entities/publication.entity";
import { Subsection } from "../../subsection/entities/subsection.entity";
import { SectionDTO } from "../dto/section.dto";

@Entity()
export class Section extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  userId: number;

  @Column()
  name: string;

  @Column()
  publicationId: number;

  @OneToMany(() => Subsection, (subsection) => subsection.section)
  subsections: Subsection[];

  @CreateDateColumn()
  createdDate: Date;

  toSectionDTO() {
    const dto: SectionDTO = {
      id: this.id,
      name: this.name,
      publicationId: this.publicationId,
    }

    return dto;
  }
}
