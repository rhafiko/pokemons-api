import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetPokemonsFilterDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  search?: string;
}
