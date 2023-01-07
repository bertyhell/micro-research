import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../../entities/project.entity';
import { ProjectResponse } from '../../entities/project-response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectResponse])],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
