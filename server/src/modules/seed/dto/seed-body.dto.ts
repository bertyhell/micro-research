import { ApiProperty } from '@nestjs/swagger';

export class SeedBodyDto {
  @ApiProperty()
  apiKey: string;
}
