import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { Answer } from './answer.entity';

@Entity()
export class ProjectResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  projectId: string;

  @ManyToOne((type) => Project, (project) => project.responses)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  firstAnswerId: string;

  @ManyToOne((type) => Answer, (answer) => answer.firstResponses)
  @JoinColumn({ name: 'firstAnswerId' })
  firstAnswer: Answer;

  @Column()
  secondAnswerId: string;

  @ManyToOne((type) => Answer, (answer) => answer.secondResponses)
  @JoinColumn({ name: 'secondAnswerId' })
  secondAnswer: Answer;

  @Column({ default: 0 })
  count: number;

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
