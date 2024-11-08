import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToMany, ManyToOne, BaseEntity } from "typeorm";
import { Page } from "../../page/entities/page.entity";
import { Section } from "../../section/entities/section.entity";
import { SubsectionDTO } from "../dto/subsection.dto";

@Entity()
export class Subsection extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  userId: number;

  @Column()
  publicationId: number;

  @Column()
  sectionId: number;

  @ManyToOne(() => Section, (section) => section.subsections)
  section: Section;

  @OneToMany(() => Page, (page) => page.subsection)
  pages: Page[];

  @CreateDateColumn()
  createdDate: Date;

  toSubsectionDTO() {
    const dto: SubsectionDTO = {
      id: this.id,
      name: this.name,
      sectionId: this.sectionId,
      publicationId: this.publicationId,
    }

    return dto;
  }
}
