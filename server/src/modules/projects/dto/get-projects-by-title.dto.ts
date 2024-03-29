import { ApiProperty } from '@nestjs/swagger';

export class ProjectRankedResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  count: number;
}
