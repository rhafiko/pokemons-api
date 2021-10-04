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

Users need to create an account and sign in to have access to the API.

Please see the topic `#How To`

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
	number int4 NOT NULL,
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

- The server will be available on port 3000 of your local machine (http://localhost:3000/api/).

```bash
http://localhost:3000/api/
```

## How To

To Acquire your authentication credentials, it is necessary:

1. Create an user account using the `auth/signup` operation:

```javascript
{
  "username": "pedro",
  "password": "superPassword123"
}
```

- Call example:

```javascript
curl -X 'POST' \
  'http://localhost:3000/auth/signup' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "pedro",
  "password": "superPassword123"
}'
```

2. Perform the signin using the `auth/signin` operation:

```javascript
{
  "username": "pedro",
  "password": "superPassword123"
}
```

- Call example:

```javascript
curl -X 'POST' \
  'http://localhost:3000/auth/signin' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "pedro",
  "password": "superPassword123"
}'
```

- The API will give you an Access Token (JWT):

```javascript
{
"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hamliIiwiaWF0IjoxNjMzMzExOTQ0LCJleHAiOjE2MzMzMTU1NDR9.-b5KVUmbj-NRP4WFP1ofE44LMCZFoOVCroBPz39BLTo"
}
```

3. Now to perform any Pokemon API operation it is necessary to inform the given Access Token (JWT) over the Authorization option:

```javascript
curl -X 'GET' \
 'http://localhost:3000/pokemons?search=&page=1&limit=10' \
 -H 'accept: _/_' \
 -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hamliIiwiaWF0IjoxNjMzMzExOTQ0LCJleHAiOjE2MzMzMTU1NDR9.-b5KVUmbj-NRP4WFP1ofE44LMCZFoOVCroBPz39BLTo'
```

- Like the example below, the returned data will always be paginated.
```javascript
{
   "items":[
      {
         "id":1,
         "number":1,
         "name":"Bulbasaur",
         "type_1":"Grass",
         "type_2":"Poison",
         "total":318,
         "hp":45,
         "attack":49,
         "defense":49,
         "sp_atk":65,
         "sp_def":65,
         "speed":45,
         "generation":1,
         "legendary":false
      },
      {
         "id":8,
         "number":2,
         "name":"Ivysaur",
         "type_1":"Grass",
         "type_2":"Poison",
         "total":405,
         "hp":60,
         "attack":62,
         "defense":63,
         "sp_atk":80,
         "sp_def":80,
         "speed":60,
         "generation":1,
         "legendary":false
      },
      {
         "id":7,
         "number":3,
         "name":"Venusaur",
         "type_1":"Grass",
         "type_2":"Poison",
         "total":525,
         "hp":80,
         "attack":82,
         "defense":83,
         "sp_atk":100,
         "sp_def":100,
         "speed":80,
         "generation":1,
         "legendary":false
      },
      {
         "id":6,
         "number":3,
         "name":"VenusaurMega Venusaur",
         "type_1":"Grass",
         "type_2":"Poison",
         "total":625,
         "hp":80,
         "attack":100,
         "defense":123,
         "sp_atk":122,
         "sp_def":120,
         "speed":80,
         "generation":1,
         "legendary":false
      },
      {
         "id":4,
         "number":4,
         "name":"Charmander",
         "type_1":"Fire",
         "type_2":"",
         "total":309,
         "hp":39,
         "attack":52,
         "defense":43,
         "sp_atk":60,
         "sp_def":50,
         "speed":65,
         "generation":1,
         "legendary":false
      },
      {
         "id":2,
         "number":5,
         "name":"Charmeleon",
         "type_1":"Fire",
         "type_2":"",
         "total":405,
         "hp":58,
         "attack":64,
         "defense":58,
         "sp_atk":80,
         "sp_def":65,
         "speed":80,
         "generation":1,
         "legendary":false
      },
      {
         "id":3,
         "number":6,
         "name":"Charizard",
         "type_1":"Fire",
         "type_2":"Flying",
         "total":534,
         "hp":78,
         "attack":84,
         "defense":78,
         "sp_atk":109,
         "sp_def":85,
         "speed":100,
         "generation":1,
         "legendary":false
      },
      {
         "id":9,
         "number":6,
         "name":"CharizardMega Charizard X",
         "type_1":"Fire",
         "type_2":"Dragon",
         "total":634,
         "hp":78,
         "attack":130,
         "defense":111,
         "sp_atk":130,
         "sp_def":85,
         "speed":100,
         "generation":1,
         "legendary":false
      },
      {
         "id":5,
         "number":6,
         "name":"CharizardMega Charizard Y",
         "type_1":"Fire",
         "type_2":"Flying",
         "total":634,
         "hp":78,
         "attack":104,
         "defense":78,
         "sp_atk":159,
         "sp_def":115,
         "speed":100,
         "generation":1,
         "legendary":false
      },
      {
         "id":10,
         "number":7,
         "name":"Squirtle",
         "type_1":"Water",
         "type_2":"",
         "total":314,
         "hp":44,
         "attack":48,
         "defense":65,
         "sp_atk":50,
         "sp_def":64,
         "speed":43,
         "generation":1,
         "legendary":false
      }
   ],
   "meta":{
      "totalItems":800,
      "itemCount":10,
      "itemsPerPage":10,
      "totalPages":80,
      "currentPage":1
   }
}
```
