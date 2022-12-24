import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectDetailResponse } from './dto/get-project.dto';

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
