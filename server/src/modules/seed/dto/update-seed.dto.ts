import { PartialType } from '@nestjs/swagger';
import { SeedBodyDto } from './seed-body.dto';

export class UpdateSeedDto extends PartialType(SeedBodyDto) {}
