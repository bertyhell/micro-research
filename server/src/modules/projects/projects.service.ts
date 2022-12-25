import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { DatabaseService } from '../database/database.service';
import { Prisma, prisma } from '@prisma/client';
import { ProjectByTagResponse } from './dto/get-projects-by-title.dto';

@Injectable()
export class ProjectsService {
  constructor(private databaseService: DatabaseService) {}

  create(createProjectDto: CreateProjectDto) {
    this.databaseService.project.create({
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
        tagLinks: true,
      },
      data: {
        title: createProjectDto.title,
        questions: {
          createMany: {
            data: createProjectDto.questions.map((question) => {
              return {
                title: question.title,
              };
            }),
            skipDuplicates: true,
          },
        },
        tagLinks: {
          createMany: {
            data: createProjectDto.tagIds.map((tagId) => {
              return {
                tagId: tagId,
                count: 0,
              };
            }),
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.databaseService.project.findUnique({
      where: {
        id,
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
        tagLinks: {
          include: {
            tag: true,
          },
        },
        responses: true,
      },
    });
  }

  async getByTag(
    tag: string,
    skip: number,
    take: number,
  ): Promise<ProjectByTagResponse[]> {
    return this.databaseService.$queryRaw<ProjectByTagResponse[]>`
        SELECT "Project"."id", "Project"."title", "TagLink"."count"
        from "Project"
                 JOIN "TagLink" ON "Project"."id" = "TagLink"."projectId"
                 JOIN "Tag" ON "TagLink"."tagId" = "Tag"."id"
        WHERE lower("Tag"."title") = lower(${tag})
        ORDER BY "TagLink"."count" DESC
            LIMIT ${take}
        OFFSET ${skip}
    `;
  }
}
