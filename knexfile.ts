import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Knex } from 'knex';

config();

const configService = new ConfigService();

module.exports = {
  client: 'postgresql',
  connection: {
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    user: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
  },
} as Knex.Config;
