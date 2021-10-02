import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonsRepository } from './repository/pokemons.repository';
import { PokemonsController } from './pokemons.controller';
import { PokemonsService } from './services/pokemons.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonsRepository]), AuthModule],
  controllers: [PokemonsController],
  providers: [PokemonsService],
})
export class PokemonsModule {}
