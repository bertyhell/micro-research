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
import { Response } from './response.entity';

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

  @OneToMany((type) => Response, (response) => response.firstAnswer)
  firstResponses: Response[];

  @OneToMany((type) => Response, (response) => response.secondAnswer)
  secondResponses: Response[];

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
