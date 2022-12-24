import { ApiProperty } from '@nestjs/swagger';

export class AnswerResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  order: number;
}

export class QuestionResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty({
    isArray: true,
    type: AnswerResponse,
  })
  answers: AnswerResponse[];
}

export class ProjectResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty({
    isArray: true,
    type: QuestionResponse,
  })
  questions: QuestionResponse[];
}

export class AnswerProjectResponse {
  @ApiProperty()
  message: 'success';
}
