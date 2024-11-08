import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Section } from "../../section/entities/section.entity";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: number;

  @Column()
  cover_image: string;

  @ManyToOne(() => User, user => user.books)
  user: User;

  @OneToMany(() => Section, (section) => section.book)
  sections: Section[];

  @CreateDateColumn()
  createdDate: Date;
}
