import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, BaseEntity } from "typeorm";
import { Subsection } from "../../subsection/entities/subsection.entity";
import { PageDTO } from "../dto/page.dto";

@Entity()
export class Page extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  userId: number;

  @Column()
  publicationId: number;

  @Column({nullable: false})
  sectionId: number;

  @Column({nullable: false})
  subsectionId: number;

  @Column({nullable: false})
  name: string;

  @Column({type:"text", nullable: false})
  content: string;

  @ManyToOne(() => Subsection, (subsection) => subsection.pages)
  subsection: Subsection;

  @CreateDateColumn()
  createdDate: Date;

  toPageDTO() {
    const dto: PageDTO = {
      id: this.id,
      publicationId: this.publicationId,
      sectionId: this.sectionId,
      subsectionId: this.subsectionId,
      name: this.name,
      content: this.content,
    }

    return dto;
  }
}
