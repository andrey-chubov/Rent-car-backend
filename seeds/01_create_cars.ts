import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('cars').del();

  await knex('cars').insert([
    { id: 1, car_number: 'A001MP' },
    { id: 2, car_number: 'A002MP' },
    { id: 3, car_number: 'A003MP' },
    { id: 4, car_number: 'A004MP' },
    { id: 5, car_number: 'A005MP' },
  ]);
}
