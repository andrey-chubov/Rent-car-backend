import { ApiProperty } from '@nestjs/swagger';

export interface BookingData {
  id: number;
  date_start: Date;
  date_finish: Date;
  duration: number;
  price: number;
  cars_id: number;
}

export class Booking {
  @ApiProperty({
    description: 'Booking identifier',
    example: 1,
  })
  id: number;
  @ApiProperty({ description: 'Date start booking', example: '2022-02-01' })
  dateSt: Date;
  @ApiProperty({ description: 'Date finish booking', example: '2022-02-02' })
  dateFn: Date;
  @ApiProperty({ description: 'Duration booking car', example: 2 })
  duration: number;
  @ApiProperty({ description: 'Price booking car', example: 2000 })
  price: number;
  @ApiProperty({ description: 'Car identifier', example: 1 })
  carId: number;

  constructor(bookData: BookingData) {
    this.id = bookData.id;
    this.dateSt = bookData.date_start;
    this.dateFn = bookData.date_finish;
    this.duration = bookData.duration;
    this.price = bookData.price;
    this.carId = bookData.cars_id;
  }
}
