import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE TABLE cars (
      id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
      car_number text NOT NULL
    )
  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    DROP TABLE cars
  `);
}
