<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This is the App `Pokemons API` which allows maintain the list of Pokemons, based on the CSV file located at https://gist.github.com/armgilles/194bcff35001e7eb53a2a8b441e8b2c6

### See it running at Heroku

- [API Pokemons](https://pokemons-api-nestjs.herokuapp.com/api/)
- https://pokemons-api-nestjs.herokuapp.com/api/

## Installation

```bash
$ npm install
```

## Environment Variables

- The database used is PostgreSQL
- Running on the development environment, it is necessary to change the DATABASE_URL located in the file:

```html
src/environment 
  .env.stage.dev

DATABASE_URL=postgres://postgres:postgres@localhost:5432/pokemons 
Current value:
  user......: postgres 
  password..: postgres 
  host......: localhost 
  port......: 5432
  database..: pokemons
```

- Just create the database pokemons.
- The NestJs framework is configured to auto-refresh and create the database struct at the start by the use of TypeORM.
- However, if necessary, here is the database script for creation:

```javascript

CREATE TABLE public."user" (
	username varchar NOT NULL,
	"password" varchar NOT NULL,
	id serial NOT NULL,
	CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id),
	CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username)
);

CREATE TABLE public.pokemon (
	id serial NOT NULL,
	"name" varchar NOT NULL,
	type_1 varchar NOT NULL,
	type_2 varchar NOT NULL,
	total int4 NOT NULL,
	hp int4 NOT NULL,
	attack int4 NOT NULL,
	defense int4 NOT NULL,
	sp_atk int4 NOT NULL,
	sp_def int4 NOT NULL,
	speed int4 NOT NULL,
	generation int4 NOT NULL,
	legendary bool NOT NULL,
	CONSTRAINT "PK_0b503db1369f46c43f8da0a6a0a" PRIMARY KEY (id)
);

```

## Running the app

```bash
# development (localhost)
$ npm run start:dev

```
