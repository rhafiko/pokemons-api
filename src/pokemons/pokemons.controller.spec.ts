import { Test } from '@nestjs/testing';
import { PokemonsController } from './pokemons.controller';
import { PokemonsService } from './services/pokemons.service';

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

const mockPokemonsSerice = () => ({
  getPokemons: jest.fn(),
  getPokemonById: jest.fn(),
  createPokemon: jest.fn(),
  deletePokemon: jest.fn(),
});

describe('PokemonsController', () => {
  let pokemonsController: PokemonsController;
  let pokemonsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [PokemonsController],
      providers: [
        PokemonsController,
        { provide: PokemonsService, useFactory: mockPokemonsSerice },
      ],
    }).compile();

    pokemonsService = module.get<PokemonsService>(PokemonsService);
    pokemonsController = module.get<PokemonsController>(PokemonsController);
  });

  describe('getPokemons', () => {
    it('calls PokemonsService.getPokemons and returns the result', async () => {
      pokemonsService.getPokemons.mockResolvedValue(mockPokemons);
      const result = await pokemonsController.getPokemons(null);
      expect(result).toEqual(mockPokemons);
    });
  });

  describe('getPokemonById', () => {
    it('calls PokemonsService.getPokemonById and returns the result', async () => {
      pokemonsService.getPokemonById.mockResolvedValue(mockPokemons[0]);
      const result = await pokemonsController.getPokemonById(null);
      expect(result).toEqual(mockPokemons[0]);
    });
  });

  describe('createPokemon', () => {
    it('calls PokemonsService.createPokemon and returns it', async () => {
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

      pokemonsService.createPokemon.mockResolvedValue(newMockPokemon);
      const result = await pokemonsController.createPokemon(null);
      expect(result).toEqual(newMockPokemon);
    });
  });

  describe('deletePokemon', () => {
    it('calls PokemonsService.deletePokemon and remove it', async () => {
      pokemonsService.deletePokemon.mockResolvedValue();
      const result = await pokemonsController.deletePokemon(1);
      expect(result).toBeUndefined;
    });
  });
});
