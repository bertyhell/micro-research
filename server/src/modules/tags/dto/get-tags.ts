import { ApiProperty } from '@nestjs/swagger';

export class TagResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;
}
