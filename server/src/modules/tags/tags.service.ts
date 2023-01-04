import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { TagResponse } from './dto/get-tags';

@Injectable()
export class TagsService {
  constructor(private dataSource: DataSource) {}

  async findAll(): Promise<TagResponse[]> {
    return this.databaseService.tag.findMany({
      select: {
        title: true,
        id: true,
      },
    });
  }
}
