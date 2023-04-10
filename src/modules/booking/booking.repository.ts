import { Injectable } from '@nestjs/common';
import DatabaseService from 'src/database/database.service';
import { CreateBookingDto } from './dto/createBooking.dto';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingRepository {
  constructor(private readonly databaseService: DatabaseService) {}
  
  async create(bookData: CreateBookingDto, duration: number, price: number) {

    const databaseResponse = await this.databaseService.runQuery(
      `
      INSERT INTO booking (date_start, date_finish, duration, price, cars_id) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *
      `,
      [bookData.dateStart, bookData.dateFinish, duration, price, bookData.carId],
    );

    return new Booking(databaseResponse.rows[0]);
  }

  async getBookingsByCarID(id: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT * FROM booking WHERE cars_id=$1
      `,
      [id],
    );

    return databaseResponse.rows.map((databaseRow) => new Booking(databaseRow));
  }

  async getAllBooking() {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT * FROM booking 
      `,
      [],
    );

    return databaseResponse.rows.map((databaseRow) => new Booking(databaseRow));
  } 
}
