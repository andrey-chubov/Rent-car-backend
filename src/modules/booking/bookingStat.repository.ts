import { Injectable } from '@nestjs/common';
import DatabaseService from 'src/database/database.service';
import GetBookingByDateQuery from './dto/bookingDataParams';
import { BookingStatResponseDto } from 'src/shared/responses/bookingStatResponse.dto';
import { plainToInstance } from 'class-transformer';


@Injectable()
export class BookingStatisticRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllCarsBookings(): Promise<BookingStatResponseDto[]> {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT 
        cars.id AS cars_id, 
        cars.car_number AS car_number,
        booking.cars_id AS id,
        count(booking.id)::int AS booking_count,
        max(booking.duration) AS longest_booking_duration,
        min(booking.duration) AS shortest_booking_duration,
        max(booking.price) AS max_price,
        min(booking.price) AS min_price,  
        sum(booking.price)::int AS all_price_sum, 
        avg(booking.duration)::real AS average_booking_duration 
      FROM cars
      LEFT JOIN booking ON booking.cars_id = cars.id
      GROUP BY (cars.id, booking.cars_id ) 
      ORDER BY cars.id ASC;
    `,
      [],
    );

    return plainToInstance(BookingStatResponseDto, databaseResponse.rows)
  }

  async getCarBookings(id: number) : Promise<BookingStatResponseDto>  {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT 
        cars.id AS cars_id, 
        cars.car_number AS car_number,
        booking.cars_id AS bookings_id,
        count(booking.id)::int AS booking_count,
        max(booking.duration) AS longest_booking_duration,
        min(booking.duration) AS shortest_booking_duration,
        max(booking.price) AS max_price,
        min(booking.price) AS min_price,  
        sum(booking.price)::int AS all_price_sum, 
        avg(booking.duration)::real AS average_booking_duration 
      FROM cars
      LEFT JOIN booking ON booking.cars_id = cars.id
      WHERE cars.id=$1
      GROUP BY (cars.id, booking.cars_id ); 
    `,
      [id],
    );

    return plainToInstance(BookingStatResponseDto, databaseResponse.rows[0])
  }

  async getAllCarsBookingsByDatePeriod(params: GetBookingByDateQuery) : Promise<BookingStatResponseDto[]>  {
    
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT 
        cars.id AS cars_id, 
        cars.car_number AS car_number,
        booking.cars_id AS id,
        booking.date_start AS date_start,
        count(booking.id)::int AS booking_count,
        max(booking.duration) AS longest_booking_duration,
        min(booking.duration) AS shortest_booking_duration,
        max(booking.price) AS max_price,
        min(booking.price) AS min_price,  
        sum(booking.price)::int AS all_price_sum, 
        avg(booking.duration)::real AS average_booking_duration 
      FROM cars
      LEFT JOIN booking ON booking.cars_id = cars.id
      WHERE date_start BETWEEN $1 AND  $2
      GROUP BY (cars.id, booking.cars_id, booking.date_start ) 
      ORDER BY cars.id ASC;
    `,
      [params.dateStart, params.dateFinish],
    );

    return plainToInstance(BookingStatResponseDto, databaseResponse.rows)
  }

  async getCarBookingsByDatePeriod(id: number, params: GetBookingByDateQuery) : Promise<BookingStatResponseDto> {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT 
        cars.id AS cars_id, 
        cars.car_number AS car_number,
        booking.cars_id AS bookings_id,
        booking.date_start AS date_start,
        count(booking.id)::int AS booking_count,
        max(booking.duration) AS longest_booking_duration,
        min(booking.duration) AS shortest_booking_duration,
        max(booking.price) AS max_price,
        min(booking.price) AS min_price,  
        sum(booking.price)::int AS all_price_sum, 
        avg(booking.duration)::real AS average_booking_duration 
      FROM cars
      LEFT JOIN booking ON booking.cars_id = cars.id
      WHERE cars.id=$1 AND date_start BETWEEN $2 AND $3
      GROUP BY (cars.id, booking.cars_id, booking.date_start); 
    `,
      [id, params.dateStart, params.dateFinish],
    );

    return plainToInstance(BookingStatResponseDto, databaseResponse.rows[0])
  }
}
