import { PartialType } from '@nestjs/mapped-types';
import { BookingResponseDto } from './bookingResponse.dto';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BookingStatResponseDto extends PartialType(BookingResponseDto)  {
  @ApiProperty({
    description: 'Booking count',
    example: 1,
  })
  bookingCount: number;

  @ApiProperty({
    description: 'Most longest booking duration car',
    example: 30,
  })
  longestBookingDuration: number;

  @ApiProperty({
    description: 'Most minimal income from renting out',
    example: 1000,
  })
  minPrice: number;

  @ApiProperty({
    description: 'Most maximal income from renting out',
    example: 30000,
  })
  maxPrice: number;

  @ApiProperty({
    description: 'Most shortest booking duration car',
    example: 1,
  })
  shortestBookingDuration: number; 

  @ApiProperty({
    description: 'Total income from renting out',
    example: 300000,
  })
  allPriceSum: number;

  @ApiProperty({
    description: 'Average booing duration',
    example: 15,
  })
  averageBookingDuration: number;
  
  @ApiProperty({
    description: 'Car number',
    example: 'A001MP',
  })
  @Expose({name:'car_number'})
  carNumber: string;
}
