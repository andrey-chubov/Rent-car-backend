import { Injectable } from '@nestjs/common';
import DatabaseService from 'src/database/database.service';
import { ValidationException } from 'src/exceptions/validation.exception';
import { CAR_BUSY, INTERVAL_LESS } from 'src/shared/errors/errorMessages';
import { getNumberOfDays } from 'src/shared/utils/getNumberDay';
import { getPrice } from 'src/shared/utils/getPrice';
import { isDurationLessThan30 } from 'src/shared/utils/isDurationLessThan30';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(bookData: CreateBookingDto) {
    isDurationLessThan30(bookData.dateSt, bookData.dateFn);
    await this.checkData(bookData.dateSt, bookData.dateFn, bookData.carId);

    const duration = getNumberOfDays(bookData.dateSt, bookData.dateFn);
    const price = getPrice(bookData.dateSt, bookData.dateFn);

    const databaseResponse = await this.databaseService.runQuery(
      `
      INSERT INTO booking (date_start, date_finish, duration, price, cars_id) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *
      `,
      [bookData.dateSt, bookData.dateFn, duration, price, bookData.carId],
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

  private async checkData(
    dateSt: string,
    dateFn: string,
    id: number,
  ): Promise<void> {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT * FROM booking WHERE cars_id=$1
      `,
      [id],
    );
    const bookings: Booking[] = databaseResponse.rows.map(
      (databaseRow) => new Booking(databaseRow),
    );

    if (bookings.length > 0) {
      bookings.forEach((booking) => {
        if (
          new Date(dateFn).getDate() === booking.dateFn.getDate() &&
          new Date(dateSt).getDate() === booking.dateSt.getDate()
        ) {
          throw new ValidationException(CAR_BUSY);
        }

        if (
          getNumberOfDays(dateSt, booking.dateFn.toDateString()) <= 3 &&
          getNumberOfDays(dateFn, booking.dateSt.toDateString()) <= 3
        ) {
          throw new ValidationException(INTERVAL_LESS);
        }

        if (
          new Date(dateFn).getDate() <= booking.dateSt.getDate() &&
          new Date(dateSt).getDate() >= booking.dateFn.getDate()
        ) {
          throw new ValidationException(CAR_BUSY);
        }
      });
    }
  }
}
