import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Project } from './project.entity';
import { Question } from './question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ default: 0 })
  order: number;

  @Column()
  questionId: string;

  @Column()
  question: Question;

  @Column()
  firstResponses: Response[];

  @Column()
  secondResponses: Response[];

  @Column({ default: new Date() })
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
