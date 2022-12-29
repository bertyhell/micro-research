import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [TagsController],
  imports: [DatabaseModule],
  providers: [TagsService],
})
export class TagsModule {}
