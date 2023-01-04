import { Entity, Column } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class Response {
  @Column()
  project: Project;

  @Column()
  firstAnswer: string;

  @Column()
  secondAnswer: string;

  @Column({ default: 0 })
  count: number;
}
