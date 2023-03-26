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

  async clearTables(): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(ProjectResponse)
      .execute();
    await this.dataSource.createQueryBuilder().delete().from(TagLink).execute();
    await this.dataSource.createQueryBuilder().delete().from(Tag).execute();
    await this.dataSource.createQueryBuilder().delete().from(Answer).execute();
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(Question)
      .execute();
    await this.dataSource.createQueryBuilder().delete().from(Project).execute();
  }

  async insertSeedData(): Promise<void> {
    try {
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(Project)
        .values(seedProjects)
        .execute();
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(Question)
        .values(seedQuestions)
        .execute();
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(Answer)
        .values(seedAnswers)
        .execute();
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(Tag)
        .values(seedTags)
        .execute();
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(TagLink)
        .values(seedTagLinks)
        .execute();
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(ProjectResponse)
        .values(seedProjectResponses)
        .execute();
    } catch (err) {
      throw new Error(
        JSON.stringify({
          message: 'Failed to insert seed data into the database',
          innerException: err,
        }),
      );
    }
  }

  async seedDatabase(): Promise<void> {
    await this.clearTables();
    await this.insertSeedData();
  }
}
