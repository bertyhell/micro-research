import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AnswerService {
  constructor(private dataSource: DataSource) {}

  findUnanswered(answeredIds: string[]) {
    return this.databaseService.project.findFirst({
      where: {
        NOT: {
          id: {
            in: answeredIds,
          },
        },
      },
      include: {
        questions: {
          include: {
            answers: {
              orderBy: {
                order: 'asc',
              },
            },
          },
          orderBy: {
            order: 'asc',
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
    const responseObject = await this.databaseService.response.findFirst({
      where: {
        projectId: {
          equals: projectId,
        },
        firstAnswerId: {
          in: [firstAnswerId, secondAnswerId],
        },
        secondAnswerId: {
          in: [firstAnswerId, secondAnswerId],
        },
      },
    });
    if (responseObject) {
      await this.databaseService.response.updateMany({
        where: {
          projectId: {
            equals: projectId,
          },
          firstAnswerId: {
            in: [firstAnswerId, secondAnswerId],
          },
          secondAnswerId: {
            in: [firstAnswerId, secondAnswerId],
          },
        },
        data: {
          count: {
            increment: 1,
          },
        },
      });
    } else {
      await this.databaseService.response.create({
        data: {
          projectId,
          firstAnswerId,
          secondAnswerId,
          count: 1,
        },
      });
    }
  }
}
