import { ApiProperty } from '@nestjs/swagger';

export class AnswerDetailResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  count: number;
}

export class QuestionDetailResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({
    isArray: true,
    type: AnswerDetailResponse,
  })
  answers: AnswerDetailResponse[];
}

export class TagResponse {
  @ApiProperty()
  title: string;
}

export class TagLinkResponse {
  @ApiProperty({
    type: TagResponse,
  })
  tag: TagResponse;

  @ApiProperty()
  count: number;
}

export class ResponseResponse {
  @ApiProperty()
  firstAnswerId: string;

  @ApiProperty()
  secondAnswerId: string;

  @ApiProperty()
  count: number;
}

export class ProjectDetailResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({
    isArray: true,
    type: QuestionDetailResponse,
  })
  questions: QuestionDetailResponse[];

  @ApiProperty({
    isArray: true,
    type: TagLinkResponse,
  })
  tagLinks: TagLinkResponse[];

  @ApiProperty({
    isArray: true,
    type: ResponseResponse,
  })
  responses: ResponseResponse[];
}
