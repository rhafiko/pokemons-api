import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetPokemonsFilterDto {
  @IsOptional()
  @ApiProperty()
  @IsString()
  search?: string;
}
