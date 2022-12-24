import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { DatabaseService } from '../database/database.service';

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
}
