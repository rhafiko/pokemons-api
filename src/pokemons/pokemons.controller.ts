import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { GetPokemonsFilterDto } from './dto/get-pokemons-filter.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entity/pokemon.entity';
import { PokemonsService } from './services/pokemons.service';

@Controller('pokemons')
@UseGuards(AuthGuard())
export class PokemonsController {
  constructor(private pokemonsService: PokemonsService) {}

  @Get()
  getPokemons(
    @Query()
    filterDto: GetPokemonsFilterDto,
  ): Promise<Pokemon[]> {
    return this.pokemonsService.getPokemons(filterDto);
  }

  @Get(':id')
  getPokemonById(@Param('id') id: number): Promise<Pokemon> {
    return this.pokemonsService.getPokemonById(id);
  }

  @Post()
  createPokemon(
    @Body()
    createPokemonDto: CreatePokemonDto,
  ): Promise<Pokemon> {
    return this.pokemonsService.createPokemon(createPokemonDto);
  }

  @Delete(':id')
  deletePokemon(@Param('id') id: number): Promise<void> {
    return this.pokemonsService.deletePokemon(id);
  }

  @Patch(':id')
  updatePokemon(
    @Param('id') id: number,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ): Promise<Pokemon> {
    return this.pokemonsService.updatePokemon(id, updatePokemonDto);
  }
}
