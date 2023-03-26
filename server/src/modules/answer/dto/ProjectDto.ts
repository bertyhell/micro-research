import { ApiProperty } from '@nestjs/swagger';

export class AnswerDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  order: number;
}

export class QuestionDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty({
    isArray: true,
    type: AnswerDto,
  })
  answers: AnswerDto[];
}

export class ProjectDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty({
    isArray: true,
    type: QuestionDto,
  })
  questions: QuestionDto[];
}

export class AnswerProjectDto {
  @ApiProperty()
  message: 'success';
}
