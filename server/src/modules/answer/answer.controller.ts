import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Query,
  ParseArrayPipe,
  Post,
  DefaultValuePipe,
  NotFoundException,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import {
  ProjectResponse,
  QuestionResponse,
  AnswerResponse,
  AnswerProjectResponse,
} from './dto/ProjectResponse';

@ApiTags('answer')
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @ApiOperation({ description: 'Get unanswered questions' })
  @ApiResponse({
    status: 200,
    description: '1 unanswered project with their questions and answer options',
    type: ProjectResponse,
  })
  @Get()
  async findUnanswered(
    @Query(
      'answeredIds',
      new DefaultValuePipe([]),
      new ParseArrayPipe({ optional: true }),
    )
    answeredIds: string[],
  ): Promise<ProjectResponse> {
    const project = await this.answerService.findUnanswered(
      answeredIds.filter((id) => !!id),
    );

    if (!project) {
      throw new NotFoundException({
        message: 'No more unanswered questions',
        code: 'NO_MORE_UNANSWERED_QUESTIONS',
      });
    }

    // Map response to only the fields that te frontend needs
    return {
      title: project.title,
      id: project.id,
      questions: project.questions.map(
        (question): QuestionResponse => ({
          id: question.id,
          title: question.title,
          answers: question.answers.map(
            (answer): AnswerResponse => ({
              title: answer.title,
              id: answer.id,
              order: answer.order,
            }),
          ),
        }),
      ),
    };
  }

  @ApiOperation({ description: 'Enter a response for a project' })
  @ApiResponse({
    status: 200,
    description: 'success message',
    type: AnswerProjectResponse,
  })
  @Post()
  async submitAnswerToProject(
    @Query('projectId') projectId: string,
    @Query('firstAnswerId') firstAnswerId: string,
    @Query('secondAnswerId') secondAnswerId: string,
  ): Promise<AnswerProjectResponse> {
    await this.answerService.incrementResponseCount(
      projectId,
      firstAnswerId,
      secondAnswerId,
    );

    return {
      message: 'success',
    };
  }
}
