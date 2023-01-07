import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { TagLink } from './tag-link.entity';
import { ProjectResponse } from './project-response.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany((type) => Question, (question) => question.project)
  questions: Question[];

  @Column({ default: false })
  published: boolean;

  @OneToMany((type) => TagLink, (tagLink) => tagLink.project)
  tagLinks: TagLink[];

  @OneToMany((type) => ProjectResponse, (response) => response.project)
  responses: ProjectResponse[];

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
