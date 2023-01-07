import {
  Controller,
  Post,
  Body,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { SeedService } from './seed.service';
import { CreateSeedDto } from './dto/create-seed.dto';
import { ConfigService } from '@nestjs/config';

@Controller('seed')
export class SeedController {
  constructor(
    private readonly configService: ConfigService,
    private readonly seedService: SeedService,
  ) {}

  @Post()
  create(@Query('apiKey') apiKey, @Body() createSeedDto: CreateSeedDto) {
    if (apiKey !== this.configService.get('API_KEY')) {
      throw new BadRequestException(
        'The apiKey query param was not present or not valid. Received value: ' +
          apiKey,
      );
    }
    return this.seedService.seedDatabase();
  }
}
