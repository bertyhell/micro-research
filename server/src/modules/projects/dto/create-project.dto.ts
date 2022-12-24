import { ApiProperty } from '@nestjs/swagger';

class CreateAnswerDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  order: number;
}

class CreateQuestionDto {
  @ApiProperty()
  title: string;

  @ApiProperty({
    isArray: true,
    type: CreateAnswerDto,
  })
  answer: CreateAnswerDto[];
}

export class CreateProjectDto {
  @ApiProperty()
  title: string;

  @ApiProperty({
    isArray: true,
    type: CreateQuestionDto,
  })
  questions: CreateQuestionDto[];

  @ApiProperty()
  published: false;

  @ApiProperty()
  tagIds: string[];
}
