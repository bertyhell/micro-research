import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../../entities/project.entity';
import { Question } from '../../entities/question.entity';
import { Answer } from '../../entities/answer.entity';
import { TagLink } from '../../entities/tag-link.entity';
import { ProjectResponse } from '../../entities/project-response.entity';
import { Tag } from '../../entities/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Project,
      Question,
      Answer,
      Tag,
      TagLink,
      ProjectResponse,
    ]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
