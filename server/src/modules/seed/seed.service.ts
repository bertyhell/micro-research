import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Answer } from '../../entities/answer.entity';
import { Project } from '../../entities/project.entity';
import { Question } from '../../entities/question.entity';
import { TagLink } from '../../entities/tag-link.entity';
import { ProjectResponse } from '../../entities/project-response.entity';
import { Tag } from '../../entities/tag.entity';
import seedProjects from './seeds/seed-projects.json';
import seedQuestions from './seeds/seed-questions.json';
import seedAnswers from './seeds/seed-answers.json';
import seedTags from './seeds/seed-tags.json';
import seedTagLinks from './seeds/seed-tag-links.json';
import seedProjectResponses from './seeds/seed-project-responses.json';

@Injectable()
export class SeedService {
  constructor(private dataSource: DataSource) {}

  async seedDatabase(): Promise<void> {
    await Promise.all([
      this.dataSource
        .createQueryBuilder()
        .insert()
        .into(Project)
        .values(seedProjects)
        .execute(),
      this.dataSource
        .createQueryBuilder()
        .insert()
        .into(Question)
        .values(seedQuestions)
        .execute(),
      this.dataSource
        .createQueryBuilder()
        .insert()
        .into(Answer)
        .values(seedAnswers)
        .execute(),
      this.dataSource
        .createQueryBuilder()
        .insert()
        .into(Tag)
        .values(seedTags)
        .execute(),
      this.dataSource
        .createQueryBuilder()
        .insert()
        .into(TagLink)
        .values(seedTagLinks)
        .execute(),
      this.dataSource
        .createQueryBuilder()
        .insert()
        .into(ProjectResponse)
        .values(seedProjectResponses)
        .execute(),
    ]);
  }
}
