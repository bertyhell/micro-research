import { ApiProperty } from '@nestjs/swagger';

export class SeedBodyDto {
  @ApiProperty()
  apiKey: string;
}

export class SeedResponseDto {
  @ApiProperty()
  message: 'success';
}
