import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './environment/config.schema';
import { PokemonsModule } from './pokemons/pokemons.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`src/environment/.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        ssl: process.env.PRODUCTION ? true : false,
        extra: process.env.PRODUCTION
          ? { ssl: { rejectUnauthorized: false } }
          : '',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AuthModule,
    PokemonsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
