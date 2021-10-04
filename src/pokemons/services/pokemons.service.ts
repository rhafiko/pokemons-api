import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from '../dto/create-pokemon.dto';
import { GetPokemonsFilterDto } from '../dto/get-pokemons-filter.dto';
import { UpdatePokemonDto } from '../dto/update-pokemon.dto';
import { PokemonsRepository } from '../repository/pokemons.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Pokemon } from '../entity/pokemon.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
@Injectable()
export class PokemonsService {
  constructor(
    @InjectRepository(PokemonsRepository)
    private pokemonsRepository: PokemonsRepository,
  ) {}

  async getPokemons(
    filterDto: GetPokemonsFilterDto,
  ): Promise<Pagination<Pokemon>> {
    return this.pokemonsRepository.getPokemons(filterDto);
  }

  async getPokemonById(id: number): Promise<Pokemon> {
    const found = await this.pokemonsRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Pokemon with ID ${id} not found`);
    }
    return found;
  }

  createPokemon(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    return this.pokemonsRepository.createPokemon(createPokemonDto);
  }

  async deletePokemon(id: number): Promise<void> {
    const result = await this.pokemonsRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Pokemon with ID ${id} not found`);
    }
  }

  async updatePokemon(
    id: number,
    updatePokemonDto: UpdatePokemonDto,
  ): Promise<Pokemon> {
    const foundPokemon = await this.getPokemonById(id);
    return this.pokemonsRepository.updatePokemon(
      foundPokemon,
      updatePokemonDto,
    );
  }
}
