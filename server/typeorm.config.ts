import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Answer } from './src/entities/answer.entity';
import { Project } from './src/entities/project.entity';
import { ProjectResponse } from './src/entities/project-response.entity';
import { Question } from './src/entities/question.entity';
import { Tag } from './src/entities/tag.entity';
import { TagLink } from './src/entities/tag-link.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  schema: configService.get('POSTGRES_SCHEMA'),
  entities: [Answer, Project, ProjectResponse, Question, Tag, TagLink],
  migrations: ['src/migration/**/*{.js,.ts}'],
});
