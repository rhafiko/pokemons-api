import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @IsInt()
  @Min(1)
  number: number;

  @Column()
  @MinLength(1, {
    message: 'Name must be longer than or equal to 1 characters',
  })
  @MaxLength(80, {
    message: 'Name must be shorter than or equal to 80 characters',
  })
  name: string;

  @Column()
  @MinLength(1, {
    message: 'Type 1 must be longer than or equal to 1 characters',
  })
  @MaxLength(10, {
    message: 'Type 1 must be shorter than or equal to 10 characters',
  })
  type_1: string;

  @Column()
  @IsOptional()
  type_2: string;

  @Column()
  @IsInt()
  @Min(1)
  total: number;

  @Column()
  @IsInt()
  @Min(1)
  hp: number;

  @Column()
  @IsInt()
  @Min(1)
  attack: number;

  @Column()
  @IsInt()
  @Min(1)
  defense: number;

  @Column()
  @IsInt()
  @Min(1)
  sp_atk: number;

  @Column()
  @IsInt()
  @Min(1)
  sp_def: number;

  @Column()
  @IsInt()
  @Min(1)
  speed: number;

  @Column()
  @IsInt()
  @Min(1)
  generation: number;

  @Column()
  @IsBoolean()
  legendary: boolean;

  constructor(
    id?: number,
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
    this.id = id;
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
