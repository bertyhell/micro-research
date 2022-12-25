import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
  BadRequestException,
  DefaultValuePipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectDetailResponse } from './dto/get-project.dto';
import { ProjectByTagResponse } from './dto/get-projects-by-title.dto';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({
    description: 'Create a new project with 2 questions and their answers',
  })
  @ApiResponse({
    status: 200,
    description: 'success message',
    type: ProjectDetailResponse,
  })
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @ApiOperation({ description: 'Get project by tag count' })
  @ApiResponse({
    status: 200,
    description: 'List of projects by tags count, paginated',
    type: ProjectByTagResponse,
    isArray: true,
  })
  @Get('')
  getByTag(
    @Query('tag') tag: string,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip,
    @Query('take', new DefaultValuePipe(5), ParseIntPipe) take,
  ): Promise<ProjectByTagResponse[]> {
    if (!tag) {
      throw new BadRequestException(
        'You must provide a project tag query param. eg: /projects?tag=interesting',
      );
    }
    return this.projectsService.getByTag(tag, skip, take);
  }

  @ApiOperation({ description: 'Get one project by id' })
  @ApiResponse({
    status: 200,
    description: 'Project with questions, answers and response counts',
    type: ProjectDetailResponse,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }
}
