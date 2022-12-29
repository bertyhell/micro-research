import { Controller, Get } from '@nestjs/common';
import { TagsService } from './tags.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TagResponse } from './dto/get-tags';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiOperation({ description: 'Get all tags' })
  @ApiResponse({
    status: 200,
    description: 'List of tags',
    type: TagResponse,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.tagsService.findAll();
  }
}
