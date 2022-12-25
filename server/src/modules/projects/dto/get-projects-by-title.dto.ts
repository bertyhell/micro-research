import { ApiProperty } from '@nestjs/swagger';

export class ProjectByTagResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  count: number;
}
