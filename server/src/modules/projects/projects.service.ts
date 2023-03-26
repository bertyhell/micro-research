import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectRankedResponse } from './dto/get-projects-by-title.dto';
import { DataSource } from 'typeorm';
import { TagLink } from '../../entities/tag-link.entity';
import { Project } from '../../entities/project.entity';
import { Question } from '../../entities/question.entity';
import { Answer } from '../../entities/answer.entity';
import { orderBy } from 'lodash';

@Injectable()
export class ProjectsService {
  constructor(private dataSource: DataSource) {}

  async create(createProjectDto: CreateProjectDto) {
    const projectId: string = await this.dataSource.transaction(
      async (entityManager) => {
        // Insert project
        const projectResponse = await entityManager
          .getRepository(Project)
          .insert({
            title: createProjectDto.title,
          });

        // Insert questions
        const questionResponses = await Promise.all([
          entityManager.getRepository(Question).insert({
            title: createProjectDto.questions[0].title,
            projectId: projectResponse.raw.id,
          }),
          entityManager.getRepository(Question).insert({
            title: createProjectDto.questions[1].title,
            projectId: projectResponse.raw.id,
          }),
        ]);

        // Insert answers
        await entityManager
          .createQueryBuilder()
          .insert()
          .into(Answer)
          .values([
            ...createProjectDto.questions[0].answers.map(
              (answer, index): Partial<Answer> => ({
                title: answer,
                order: index,
                questionId: questionResponses[0].raw.id,
              }),
            ),
            ...createProjectDto.questions[1].answers.map(
              (answer, index): Partial<Answer> => ({
                title: answer,
                order: index,
                questionId: questionResponses[0].raw.id,
              }),
            ),
          ])
          .execute();

        return projectResponse.raw.id;
      },
    );
    return this.dataSource.getRepository(Project).findOne({
      where: {
        id: projectId,
      },
    });
  }

  findOne(id: string) {
    return this.dataSource.getRepository(Project).findOne({
      where: {
        id,
      },
      relations: {
        questions: {
          answers: true,
        },
        tagLinks: {
          tag: true,
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
    const projectRows = await this.dataSource
      .getRepository(Project)
      .createQueryBuilder('project')
      .select('project.id', 'id')
      .addSelect('project.title', 'title')
      .addSelect('tagLink.count', 'count')
      .leftJoin('project.tagLinks', 'tagLink', 'project.id = tagLink.projectId')
      .leftJoin('tagLink.tag', 'tag', 'tagLink.tagId = tag.id')
      .where('lower(tag.title) = lower(:tag)', { tag })
      .orderBy('tagLink.count', 'DESC')
      .skip(skip)
      .limit(take)
      .getRawMany();

    return projectRows.map((projectRow) => ({
      title: projectRow.title,
      id: projectRow.id,
      count: projectRow.count,
    }));
  }

  async getByAnswerCount(
    skip: number,
    take: number,
  ): Promise<ProjectRankedResponse[]> {
    const projectRows = await this.dataSource
      .getRepository(Project)
      .createQueryBuilder('project')
      .select('project.id', 'id')
      .addSelect('project.title', 'title')
      .addSelect('SUM(response.count)', 'count')
      .leftJoin(
        'project.responses',
        'response',
        'project.id = response.projectId',
      )
      .groupBy('project.id')
      .addGroupBy('project.title')
      .skip(skip)
      .limit(take)
      .getRawMany();

    return orderBy(
      projectRows.map((projectRow) => ({
        title: projectRow.title,
        id: projectRow.id,
        count: projectRow.count || 0,
      })),
      ['count'],
      ['desc'],
    );
  }

  async incrementTagLink(projectId: string, tagId: string): Promise<number> {
    const tagLink = await this.dataSource.getRepository(TagLink).findOne({
      where: {
        projectId,
        tagId,
      },
    });
    if (tagLink) {
      // increment
      const response = await this.dataSource.getRepository(TagLink).update(
        {
          id: tagLink.id,
        },
        {
          count: tagLink.count + 1,
        },
      );
      return response.raw.count;
    } else {
      // create and set to 1
      const response = await this.dataSource.getRepository(TagLink).insert({
        projectId,
        tagId,
        count: 1,
      });
      return response.raw.count;
    }
  }
}
