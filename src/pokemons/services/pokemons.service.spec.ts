import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PokemonsRepository } from '../../pokemons/repository/pokemons.repository';
import { PokemonsService } from './pokemons.service';

const mockPokemonsRepository = () => ({
  getPokemons: jest.fn(),
  findOne: jest.fn(),
  createPokemon: jest.fn(),
  delete: jest.fn(),
  save: jest.fn(),
});

const mockPokemons = [
  {
    id: 1,
    name: 'Bulbasaur',
    type_1: 'Grass',
    type_2: 'Poison',
    total: 318,
    hp: 45,
    attack: 49,
    defense: 49,
    sp_atk: 65,
    sp_def: 65,
    speed: 45,
    generation: 1,
    legendary: false,
  },
  {
    id: 2,
    name: 'Ivysaur',
    type_1: 'Grass',
    type_2: 'Poison',
    total: 405,
    hp: 60,
    attack: 62,
    defense: 63,
    sp_atk: 80,
    sp_def: 80,
    speed: 60,
    generation: 1,
    legendary: false,
  },
  {
    id: 3,
    name: 'Venusaur',
    type_1: 'Grass',
    type_2: 'Poison',
    total: 525,
    hp: 80,
    attack: 82,
    defense: 83,
    sp_atk: 100,
    sp_def: 100,
    speed: 80,
    generation: 1,
    legendary: false,
  },
];

describe('PokemonsService', () => {
  let pokemonsService: PokemonsService;
  let pokemonsRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PokemonsService,
        { provide: PokemonsRepository, useFactory: mockPokemonsRepository },
      ],
    }).compile();

    pokemonsService = module.get(PokemonsService);
    pokemonsRepository = module.get(PokemonsRepository);
  });

  describe('getPokemons', () => {
    it('calls PoinstRepository.getPokemons and returns the result', async () => {
      pokemonsRepository.getPokemons.mockResolvedValue(mockPokemons);
      const result = await pokemonsService.getPokemons(null);
      expect(result).toEqual(mockPokemons);
    });
  });

  describe('getPokemonById', () => {
    it('calls PokemonsRepository.findOne and return de result', async () => {
      pokemonsRepository.findOne.mockResolvedValue(mockPokemons[0]);
      const result = await pokemonsService.getPokemonById(1);
      expect(result).toEqual(mockPokemons[0]);
    });

    it('calls PokemonsRepository.findOne and handles an error', async () => {
      pokemonsRepository.findOne.mockResolvedValue(null);
      expect(pokemonsService.getPokemonById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createPokemon', () => {
    it('calls PoinstRepository.createPokemon, create new pokemon and returns the result', async () => {
      const newMockPokemon = [
        {
          name: 'Squirtle',
          type_1: 'Water',
          type_2: null,
          total: 314,
          hp: 44,
          attack: 48,
          defense: 65,
          sp_atk: 50,
          sp_def: 64,
          speed: 43,
          generation: 1,
          legendary: false,
        },
      ];
      pokemonsRepository.createPokemon.mockResolvedValue(newMockPokemon);
      const result = await pokemonsService.createPokemon(null);
      expect(result).toEqual(newMockPokemon);
    });
  });

  describe('deletePokemon', () => {
    it('calls PokemonsRepository.delete and remove the register', async () => {
      const rowsAffected = { affected: undefined };
      pokemonsRepository.delete.mockResolvedValue(rowsAffected);
      const result = await pokemonsService.deletePokemon(1);
      expect(result).toBeUndefined;
    });

    it('calls PokemonsRepository.delete and handles an error', async () => {
      const rowsAffected = { affected: 0 };
      pokemonsRepository.delete.mockResolvedValue(rowsAffected);
      expect(pokemonsService.deletePokemon(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
