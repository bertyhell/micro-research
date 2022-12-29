import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AnswerModule } from './modules/answer/answer.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TagsModule } from './modules/tags/tags.module';

@Module({
  imports: [ProjectsModule, AnswerModule, TagsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
