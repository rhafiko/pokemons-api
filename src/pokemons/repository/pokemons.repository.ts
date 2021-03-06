import { EntityRepository, Repository } from 'typeorm';
import { CreatePokemonDto } from '../dto/create-pokemon.dto';
import { GetPokemonsFilterDto } from '../dto/get-pokemons-filter.dto';
import { UpdatePokemonDto } from '../dto/update-pokemon.dto';
import { Pokemon } from '../entity/pokemon.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

@EntityRepository(Pokemon)
export class PokemonsRepository extends Repository<Pokemon> {
  private logger = new Logger('PokemonsRepository', { timestamp: true });

  async getPokemons(
    filterDto: GetPokemonsFilterDto,
  ): Promise<Pagination<Pokemon>> {
    const { search, page, limit } = filterDto;
    const query = this.createQueryBuilder('pokemon');

    if (search) {
      query.andWhere(
        'LOWER(pokemon.name) LIKE LOWER(:search) \
        OR LOWER(pokemon.type_1) LIKE LOWER(:search) \
        OR LOWER(pokemon.type_2) LIKE LOWER(:search)',
        {
          search: `%${search}%`,
        },
      );
    }
    query.orderBy('number, name', 'ASC');

    try {
      return paginate<Pokemon>(query, {
        page,
        limit,
      });
    } catch (error) {
      this.logger.error(
        `Failed to get pokemons from . Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createPokemon(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    const {
      number,
      name,
      type_1,
      type_2,
      total,
      hp,
      attack,
      defense,
      sp_atk,
      sp_def,
      speed,
      generation,
      legendary,
    } = createPokemonDto;

    const pokemon = this.create({
      number,
      name,
      type_1,
      type_2,
      total,
      hp,
      attack,
      defense,
      sp_atk,
      sp_def,
      speed,
      generation,
      legendary,
    });

    try {
      await this.save(pokemon);
    } catch (error) {
      this.logger.error(`Failed to create a new pokemon ${name}.`, error.stack);
      throw new InternalServerErrorException();
    }
    return pokemon;
  }

  async updatePokemon(
    foundPokemon: Pokemon,
    updatePokemonDto: UpdatePokemonDto,
  ): Promise<Pokemon> {
    const {
      number,
      name,
      type_1,
      type_2,
      total,
      hp,
      attack,
      defense,
      sp_atk,
      sp_def,
      speed,
      generation,
      legendary,
    } = updatePokemonDto;

    foundPokemon.number = number;
    foundPokemon.name = name;
    foundPokemon.type_1 = type_1;
    foundPokemon.type_2 = type_2;
    foundPokemon.total = total;
    foundPokemon.hp = hp;
    foundPokemon.attack = attack;
    foundPokemon.defense = defense;
    foundPokemon.sp_atk = sp_atk;
    foundPokemon.sp_def = sp_def;
    foundPokemon.speed = speed;
    foundPokemon.generation = generation;
    foundPokemon.legendary = legendary;

    try {
      await this.save(foundPokemon);
    } catch (error) {
      this.logger.error(`Failed to update the pokemon ${name}.`, error.stack);
      throw new InternalServerErrorException();
    }
    return foundPokemon;
  }

  async createPokemonFromCsv(
    pokemonFromCsv: CreatePokemonDto,
  ): Promise<Pokemon> {
    const {
      number,
      name,
      type_1,
      type_2,
      total,
      hp,
      attack,
      defense,
      sp_atk,
      sp_def,
      speed,
      generation,
      legendary,
    } = pokemonFromCsv;

    const pokemon = this.create({
      number,
      name,
      type_1,
      type_2,
      total,
      hp,
      attack,
      defense,
      sp_atk,
      sp_def,
      speed,
      generation,
      legendary,
    });

    try {
      await this.save(pokemon);
    } catch (error) {
      this.logger.error(`Failed to create a new pokemon ${name}.`, error.stack);
      throw new InternalServerErrorException();
    }
    return pokemon;
  }
}
