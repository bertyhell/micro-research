import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Project } from './project.entity';
import { Question } from './question.entity';
import { Tag } from './tag.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  project: Project;

  @Column()
  tag: Tag;

  @Column()
  count: number;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
