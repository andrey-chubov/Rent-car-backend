import { ApiProperty } from '@nestjs/swagger';
import { BookingStatisticsResponse } from 'src/shared/responses/bookingStatisticResponse';

class BookingCarStatisticsModel {
  @ApiProperty({
    description: 'Car identifier',
    example: 1,
  })
  carId: number;
  @ApiProperty({
    description: 'Car number',
    example: 'A001MP',
  })
  carNumber: string;
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
    description: 'Most shortest booking duration car',
    example: 1,
  })
  shortestBookingDuration: number;
  @ApiProperty({
    description: 'Total income from renting out',
    example: 300000,
  })
  allCarPriceSum: number;
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
    description: 'Average booing duration',
    example: 15,
  })
  averageBookingDuration: number;
  constructor(bookingCarStatisticsModelData: BookingStatisticsResponse) {
    this.carId = bookingCarStatisticsModelData.cars_id;
    this.bookingCount = bookingCarStatisticsModelData.booking_count;
    this.longestBookingDuration =
      bookingCarStatisticsModelData.longest_booking_duration;
    this.shortestBookingDuration =
      bookingCarStatisticsModelData.shortest_booking_duration;
    this.allCarPriceSum = bookingCarStatisticsModelData.all_price_sum;
    this.averageBookingDuration =
      bookingCarStatisticsModelData.average_booking_duration;
    this.maxPrice = bookingCarStatisticsModelData.max_price;
    this.minPrice = bookingCarStatisticsModelData.min_price;
    this.carNumber = bookingCarStatisticsModelData.car_number;
  }
}

export default BookingCarStatisticsModel;
