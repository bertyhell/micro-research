import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SeedBodyDto, SeedResponseDto } from './dto/seed-body.dto';

@ApiTags('seed')
@Controller('seed')
export class SeedController {
  constructor(
    private readonly configService: ConfigService,
    private readonly seedService: SeedService,
  ) {}

  @ApiOperation({ description: 'Put initial data into the database' })
  @ApiResponse({
    status: 200,
    description: 'Put initial data into the database',
    type: SeedResponseDto,
  })
  @Post()
  async seed(@Body() body: SeedBodyDto): Promise<SeedResponseDto> {
    if (body.apiKey !== this.configService.get('API_KEY')) {
      throw new BadRequestException(
        'The apiKey query param was not present or not valid. Received value: ' +
          body.apiKey,
      );
    }
    await this.seedService.seedDatabase();
    return { message: 'success' };
  }
}
