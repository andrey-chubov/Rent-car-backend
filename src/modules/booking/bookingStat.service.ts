import { BadRequestException, Injectable } from '@nestjs/common';
import { BookingStatisticRepository } from './bookingStat.repository';
import GetBookingByDateQuery from './dto/bookingDataParams';
import { BookingStatResponseDto } from '../../shared/responses/bookingStatResponse.dto';
import { INCORRECT_PARAMS } from '../../shared/errors/errorMessages';

@Injectable()
export class BookingStatisticService {
  constructor(
    private readonly bookingStatRepository: BookingStatisticRepository,
  ) {}

  getAllCarsBookings():Promise<BookingStatResponseDto[]> {
    return this.bookingStatRepository.getAllCarsBookings();
  }

  getCarBookings(id: number):Promise<BookingStatResponseDto> {
    return this.bookingStatRepository.getCarBookings(id);
  }

  getAllCarsBookingsByDate(query: GetBookingByDateQuery):Promise<BookingStatResponseDto[]> {
    if (!query) {
      throw new BadRequestException(INCORRECT_PARAMS);
    }
    
    return this.bookingStatRepository.getAllCarsBookingsByDatePeriod(query);
  }

  getCarBookingsByDate(id: number, query: GetBookingByDateQuery):Promise<BookingStatResponseDto> {
    if (!query) {
      throw new BadRequestException(INCORRECT_PARAMS);
    }
    
    return this.bookingStatRepository.getCarBookingsByDatePeriod(id, query);
  }
}
