import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
