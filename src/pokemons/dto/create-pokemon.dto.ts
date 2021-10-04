import {
  IsBoolean,
  IsNumber,
  IsOptional,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreatePokemonDto {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  number: number;

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
  @Min(1)
  total: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  hp: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  attack: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  defense: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  sp_atk: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  sp_def: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  speed: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  generation: number;

  @ApiProperty()
  @IsBoolean()
  legendary: boolean;
}
