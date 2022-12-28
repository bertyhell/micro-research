import { ApiProperty } from '@nestjs/swagger';

class CreateQuestionDto {
  @ApiProperty()
  title: string;

  @ApiProperty({
    isArray: true,
    type: String,
  })
  answers: string[];
}

export class CreateProjectDto {
  @ApiProperty()
  title: string;

  @ApiProperty({
    isArray: true,
    type: CreateQuestionDto,
  })
  questions: CreateQuestionDto[];
}
