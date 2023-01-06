import { Injectable } from '@nestjs/common';
import { DataSource, In, Not } from 'typeorm';
import { Project } from '../../entities/project.entity';

@Injectable()
export class AnswerService {
  constructor(private dataSource: DataSource) {}

  findUnanswered(answeredIds: string[]): Promise<Project> {
    return this.dataSource.getRepository(Project).findOne({
      where: {
        id: Not(In(answeredIds)),
      },
      relations: {
        questions: {
          answers: true,
        },
      },
      order: {
        questions: {
          order: 'ASC',
          answers: {
            order: 'ASC',
          },
        },
      },
    });
  }

  async incrementResponseCount(
    projectId: string,
    firstAnswerId: string,
    secondAnswerId: string,
  ): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .update(Response)
      .set({ count: () => 'count + 1' })
      .where(
        'firstAnswerId = :firstAnswerId1 AND secondAnswerId = :secondAnswerId1 OR firstAnswerId = :secondAnswerId2 AND secondAnswerId = :firstAnswerId2',
        {
          firstAnswerId1: firstAnswerId,
          firstAnswerId2: firstAnswerId,
          secondAnswerId1: secondAnswerId,
          secondAnswerId2: secondAnswerId,
        },
      )
      .execute();
  }
}
