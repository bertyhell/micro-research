import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../../entities/project.entity';
import { Answer } from '../../entities/answer.entity';
import { TagLink } from '../../entities/tag-link.entity';
import { Question } from '../../entities/question.entity';
import { ProjectResponse } from '../../entities/project-response.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Project,
      Question,
      Answer,
      TagLink,
      ProjectResponse,
    ]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
