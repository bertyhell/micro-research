import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AnswerModule } from './modules/answer/answer.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TagsModule } from './modules/tags/tags.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../client/dist'),
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'micro-research',
      entities: [],
      synchronize: true,
    }),
    ProjectsModule,
    AnswerModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
