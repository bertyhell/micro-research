import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { ProjectResponse } from './project-response.entity';

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

  @ManyToOne((type) => Question, (question) => question.answers)
  @JoinColumn({ name: 'questionId' })
  question: Question;

  @OneToMany((type) => ProjectResponse, (response) => response.firstAnswer)
  firstResponses: ProjectResponse[];

  @OneToMany((type) => ProjectResponse, (response) => response.secondAnswer)
  secondResponses: ProjectResponse[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
