import { Injectable } from '@nestjs/common';
import DatabaseService from '../../database/database.service';
import { CreateBookingDto } from './dto/createBooking.dto';
import { BookingResponseDto } from '../../shared/responses/bookingResponse.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BookingRepository {
  constructor(private readonly databaseService: DatabaseService) {}
  
  async create(bookData: CreateBookingDto, duration: number, price: number):Promise<BookingResponseDto> {
    const databaseResponse = await this.databaseService.runQuery(
      `
      INSERT INTO booking (date_start, date_finish, duration, price, cars_id) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *
      `,
      [bookData.dateStart, bookData.dateFinish, duration, price, bookData.carId],
    );
    
    return plainToInstance(BookingResponseDto, databaseResponse.rows[0]);
  }

  async getBookingByCarId(id: number):Promise<BookingResponseDto[]> {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT * FROM booking WHERE cars_id=$1
      `,
      [id],
    );

    return  plainToInstance(BookingResponseDto, databaseResponse.rows);
  }

  async getAllBooking():Promise<BookingResponseDto[]> {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT * FROM booking 
      `,
      [],
    );

    return plainToInstance(BookingResponseDto, databaseResponse.rows);
  } 
}
