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
  Patch,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectDetailResponse } from './dto/get-project.dto';
import { ProjectRankedResponse } from './dto/get-projects-by-title.dto';
import { Throttle } from '@nestjs/throttler';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Throttle(1, 120)
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

  @Throttle(60, 60)
  @ApiOperation({ description: 'Get project by tag count' })
  @ApiResponse({
    status: 200,
    description: 'Get project by tag count',
    type: ProjectRankedResponse,
    isArray: true,
  })
  @Get('tags/:tag')
  getByTag(
    @Param('tag') tag: string,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip,
    @Query('take', new DefaultValuePipe(5), ParseIntPipe) take,
  ): Promise<ProjectRankedResponse[]> {
    if (!tag) {
      throw new BadRequestException(
        'You must provide a project tag query param. eg: /projects/tags/interesting',
      );
    }
    return this.projectsService.getByTag(tag, skip, take);
  }

  @ApiOperation({ description: 'Increment tag count by 1 for project' })
  @ApiResponse({
    status: 200,
    description: 'Increment tag count by 1 for project',
    type: ProjectRankedResponse,
    isArray: true,
  })
  @Patch('/:projectId/tags/:tagId')
  incrementTagCount(
    @Param('projectId') projectId: string,
    @Param('tagId') tagId: string,
  ): Promise<number> {
    if (!projectId || !tagId) {
      throw new BadRequestException(
        'You must provide a valid project and tag id in the url. eg: /projects/efa89dc5-398f-492b-ac18-d3cd4768cc6a/tags/89ab4bdd-e5b2-4786-ab42-4ea9944439ba',
      );
    }
    return this.projectsService.incrementTagLink(projectId, tagId);
  }

  @ApiOperation({ description: 'Get project by tag count' })
  @ApiResponse({
    status: 200,
    description: 'List of projects by answer count, paginated',
    type: ProjectRankedResponse,
    isArray: true,
  })
  @Get('answers')
  getByAnswerCount(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip,
    @Query('take', new DefaultValuePipe(5), ParseIntPipe) take,
  ): Promise<ProjectRankedResponse[]> {
    return this.projectsService.getByAnswerCount(skip, take);
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
