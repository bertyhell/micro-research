import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { DatabaseService } from '../database/database.service';
import { ProjectRankedResponse } from './dto/get-projects-by-title.dto';

@Injectable()
export class ProjectsService {
  constructor(private databaseService: DatabaseService) {}

  async create(createProjectDto: CreateProjectDto) {
    const projectId: string = await this.databaseService.$transaction(
      async (prisma) => {
        const project = await prisma.project.create({
          data: {
            title: createProjectDto.title,
          },
        });
        await Promise.all([
          prisma.question.create({
            data: {
              title: createProjectDto.questions[0].title,
              projectId: project.id,
              answers: {
                createMany: {
                  data: createProjectDto.questions[0].answers.map(
                    (answer, index) => ({
                      title: answer,
                      order: index,
                    }),
                  ),
                },
              },
            },
          }),
          prisma.question.create({
            data: {
              title: createProjectDto.questions[1].title,
              projectId: project.id,
              answers: {
                createMany: {
                  data: createProjectDto.questions[1].answers.map(
                    (answer, index) => ({
                      title: answer,
                      order: index,
                    }),
                  ),
                },
              },
            },
          }),
        ]);

        return project.id;
      },
    );
    return this.findOne(projectId);
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
  ): Promise<ProjectRankedResponse[]> {
    return this.databaseService.$queryRaw<ProjectRankedResponse[]>`
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

  async getByAnswerCount(
    skip: number,
    take: number,
  ): Promise<ProjectRankedResponse[]> {
    return this.databaseService.$queryRaw<ProjectRankedResponse[]>`
        SELECT "Project"."id", "Project"."title", SUM("Response"."count") as "count"
        from "Project"
                 JOIN "Response" ON "Project"."id" = "Response"."projectId"
        GROUP BY "Project"."id", "Project"."title"
        ORDER BY SUM("Response"."count") DESC
            LIMIT ${take}
        OFFSET ${skip}
    `;
  }

  async incrementTagLink(projectId: string, tagId: string): Promise<number> {
    const tagLink = await this.databaseService.tagLink.findFirst({
      where: {
        projectId,
        tagId,
      },
    });
    if (tagLink) {
      // increment
      const response = await this.databaseService.tagLink.update({
        data: {
          count: tagLink.count + 1,
        },
        where: { id: tagLink.id },
      });
      return response.count;
    } else {
      // create and set to 1
      const response = await this.databaseService.tagLink.create({
        data: {
          projectId,
          tagId,
          count: 1,
        },
      });
      return response.count;
    }
  }
}
