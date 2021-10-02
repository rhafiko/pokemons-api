import {
  IsBoolean,
  IsNumber,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreatePokemonDto {
  @ApiProperty()
  @MinLength(1, {
    message: 'Name must be longer than or equal to 1 characters',
  })
  @MaxLength(80, {
    message: 'Name must be shorter than or equal to 80 characters',
  })
  name: string;

  @ApiProperty()
  @MinLength(1, {
    message: 'Type 1 must be longer than or equal to 1 characters',
  })
  @MaxLength(10, {
    message: 'Type 1 must be shorter than or equal to 10 characters',
  })
  type_1: string;

  @ApiProperty()
  @IsOptional()
  type_2: string;

  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty()
  @IsNumber()
  hp: number;

  @ApiProperty()
  @IsNumber()
  attack: number;

  @ApiProperty()
  @IsNumber()
  defense: number;

  @ApiProperty()
  @IsNumber()
  sp_atk: number;

  @ApiProperty()
  @IsNumber()
  sp_def: number;

  @ApiProperty()
  @IsNumber()
  speed: number;

  @ApiProperty()
  @IsNumber()
  generation: number;

  @ApiProperty()
  @IsBoolean()
  legendary: boolean;
}
