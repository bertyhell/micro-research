import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Tag } from '../../entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(private dataSource: DataSource) {}

  async findAll(): Promise<Tag[]> {
    return this.dataSource.getRepository(Tag).find({});
  }
}
