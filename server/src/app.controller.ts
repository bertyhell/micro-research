import { Controller, Get } from '@nestjs/common';
import packageJson from '../package.json';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('status')
@Controller()
export class AppController {
  @Get()
  status(): { message: string; version: string } {
    return {
      message: 'API is up and running',
      version: packageJson.version,
    };
  }
}
