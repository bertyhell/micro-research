import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { Tag } from './tag.entity';

@Entity()
export class TagLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  projectId: string;

  @ManyToOne((type) => Project, (project) => project.tagLinks)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  tagId: string;

  @ManyToOne((type) => Tag, (tag) => tag.tagLinks)
  @JoinColumn({ name: 'tagId' })
  tag: Tag;

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
