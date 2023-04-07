import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE TABLE booking(
      id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
      date_start date NOT NULL,
      date_finish date NOT NULL,
      duration int NOT NULL,
      price int NOT NULL,
      cars_id int REFERENCES cars(id)
    ) 
  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    DROP TABLE booking
  `);
}
