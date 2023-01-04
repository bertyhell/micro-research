import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Question } from './question.entity';
import { TagLink } from '../modules/generated/tagLink.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  questions: Question[];

  @Column({ default: false })
  published: boolean;

  @OneToMany((type) => TagLink, (tagLink) => tagLink.project)
  tagLinks: TagLink[];

  @Column()
  responses: Response[];

  @Column({ default: new Date() })
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
