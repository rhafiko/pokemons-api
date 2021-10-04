import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonsRepository } from './repository/pokemons.repository';
import { PokemonsController } from './pokemons.controller';
import { PokemonsService } from './services/pokemons.service';
import { BulkImportService } from './services/bulk-import.service';
import { AuthModule } from '../auth/auth.module';
import { CsvModule } from 'nest-csv-parser';
@Module({
  imports: [
    TypeOrmModule.forFeature([PokemonsRepository]),
    AuthModule,
    CsvModule,
  ],
  controllers: [PokemonsController],
  providers: [PokemonsService, BulkImportService],
})
export class PokemonsModule {}
