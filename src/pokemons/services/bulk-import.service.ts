import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PokemonsRepository } from '../repository/pokemons.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Pokemon } from '../entity/pokemon.entity';
import { CsvParser } from 'nest-csv-parser';
import { createReadStream } from 'fs';

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
    });
    if (existingPokemons.length === 0) {
      this.logger.log('Performing bulk Pokemons creation based on csv file');
      const stream = createReadStream('./csv_db/pokemon.csv');
      const pokemonsList: any = await this.csvParser.parse(stream, Pokemon);

      pokemonsList.list.forEach(async (element) => {
        const line =
          element[
            '#,Name,Type 1,Type 2,Total,HP,Attack,Defense,Sp. Atk,Sp. Def,Speed,Generation,Legendary'
          ].split(',');

        const newPokemon = [
          {
            number: line[0],
            name: line[1],
            type_1: line[2],
            type_2: line[3],
            total: line[4],
            hp: line[5],
            attack: line[6],
            defense: line[7],
            sp_atk: line[8],
            sp_def: line[9],
            speed: line[10],
            generation: line[11],
            legendary: line[12] === 'True' ? true : false,
          },
        ][0];

        if (newPokemon.number != null) {
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
