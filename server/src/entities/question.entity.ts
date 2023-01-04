import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Project } from './project.entity';
import { Answer } from './answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ default: 0 })
  order: number;

  @Column()
  answers: Answer[];

  @Column()
  projectId: string;

  @Column()
  project: Project;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
