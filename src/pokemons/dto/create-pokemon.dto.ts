import {
  IsBoolean,
  IsInt,
  IsOptional,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePokemonDto {
  @ApiProperty()
  @IsInt()
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
  @IsInt()
  @Min(1)
  total: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  hp: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  attack: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  defense: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  sp_atk: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  sp_def: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  speed: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  generation: number;

  @ApiProperty()
  @IsBoolean()
  legendary: boolean;

  constructor(
    number?: number,
    name?: string,
    type_1?: string,
    type_2?: string,
    total?: number,
    hp?: number,
    attack?: number,
    defense?: number,
    sp_atk?: number,
    sp_def?: number,
    speed?: number,
    generation?: number,
    legendary?: boolean,
  ) {
    this.number = number;
    this.name = name;
    this.type_1 = type_1;
    this.type_2 = type_2;
    this.total = total;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.sp_atk = sp_atk;
    this.sp_def = sp_def;
    this.speed = speed;
    this.generation = generation;
    this.legendary = legendary;
  }
}
