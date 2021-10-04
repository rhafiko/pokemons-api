import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PokemonsRepository } from '../repository/pokemons.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Pokemon } from '../entity/pokemon.entity';
import { CreatePokemonDto } from '../dto/create-pokemon.dto';
import { CsvParser } from 'nest-csv-parser';
import { createReadStream } from 'fs';
import { validate } from 'class-validator';

@Injectable()
export class BulkImportService implements OnModuleInit {
  private logger = new Logger('BulkImportService', { timestamp: true });

  constructor(
    @InjectRepository(PokemonsRepository)
    private pokemonsRepository: PokemonsRepository,
    private readonly csvParser: CsvParser,
  ) {}

  onModuleInit() {
    this.parseAndImportCsv();
  }
  async parseAndImportCsv() {
    const existingPokemons = await this.pokemonsRepository.getPokemons({
      search: '',
      page: 1,
      limit: 1,
    });
    if (existingPokemons.items.length === 0) {
      this.logger.log('Performing bulk Pokemons creation based on csv file');
      const stream = createReadStream('./csv_db/pokemon.csv');
      const pokemonsList: any = await this.csvParser.parse(stream, Pokemon);

      pokemonsList.list.forEach(async (element) => {
        const line =
          element[
            '#,Name,Type 1,Type 2,Total,HP,Attack,Defense,Sp. Atk,Sp. Def,Speed,Generation,Legendary'
          ].split(',');

        const newPokemon = new CreatePokemonDto(
          parseInt(line[0]),
          line[1],
          line[2],
          line[3],
          parseInt(line[4]),
          parseInt(line[5]),
          parseInt(line[6]),
          parseInt(line[7]),
          parseInt(line[8]),
          parseInt(line[9]),
          parseInt(line[10]),
          parseInt(line[11]),
          line[12] === 'True' ? true : false,
        );
        const errors = await validate(newPokemon);
        if (errors.length > 0) {
          this.logger.error(errors, line);
        } else {
          await this.pokemonsRepository.createPokemonFromCsv(newPokemon);
        }
      });
    } else {
      this.logger.log(
        'Found Pokemons on database. Bulk Pokemons creation based on csv file WILL NOT be executed.',
      );
    }
  }
}
