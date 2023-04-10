import { ApiProperty } from '@nestjs/swagger';
import { BookingResponse } from 'src/shared/responses/bookingResponse';

export class Booking {
  @ApiProperty({
    description: 'Booking identifier',
    example: 1,
  })
  id: number;
  @ApiProperty({ description: 'Date start booking', example: '2022-02-01' })
  dateStart: Date;
  @ApiProperty({ description: 'Date finish booking', example: '2022-02-02' })
  dateFinish: Date;
  @ApiProperty({ description: 'Duration booking car', example: 2 })
  duration: number;
  @ApiProperty({ description: 'Price booking car', example: 2000 })
  price: number;
  @ApiProperty({ description: 'Car identifier', example: 1 })
  carId: number;

  constructor(bookData: BookingResponse) {
    this.id = bookData.id;
    this.dateStart = bookData.date_start;
    this.dateFinish = bookData.date_finish;
    this.duration = bookData.duration;
    this.price = bookData.price;
    this.carId = bookData.cars_id;
  }
}
