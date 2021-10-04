import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  number: number;

  @Column()
  name: string;

  @Column()
  type_1: string;

  @Column()
  type_2: string;

  @Column()
  total: number;

  @Column()
  hp: number;

  @Column()
  attack: number;

  @Column()
  defense: number;

  @Column()
  sp_atk: number;

  @Column()
  sp_def: number;

  @Column()
  speed: number;

  @Column()
  generation: number;

  @Column()
  legendary: boolean;
}
