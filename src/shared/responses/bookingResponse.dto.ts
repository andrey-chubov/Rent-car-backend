import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BookingResponseDto {
  @ApiProperty({
    description: 'Booking identifier',
    example: 1,
  })
  id: number;

  @ApiProperty({ description: 'Date start booking', example: '2022-02-01' })
  @Expose({ name: 'date_start' })
  dateStart: Date;

  @ApiProperty({ description: 'Date finish booking', example: '2022-02-02' })
  @Expose({ name: 'date_finish' })
  dateFinish: Date;

  @ApiProperty({ description: 'Duration booking car', example: 2 })
  duration: number;

  @ApiProperty({ description: 'Price booking car', example: 2000 })
  price: number;

  @ApiProperty({ description: 'Price booking car', example: 2000 })
  @Expose({ name: 'cars_id' })
  carId: number;
}
