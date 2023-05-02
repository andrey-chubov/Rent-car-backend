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

  getAllBooking():Promise<BookingStatResponseDto[]> {
    return this.bookingStatRepository.getAllBooking();
  }

  getBookingById(id: number):Promise<BookingStatResponseDto> {
    return this.bookingStatRepository.getBookingById(id);
  }

  getAllBookingByDatePeriod(query: GetBookingByDateQuery):Promise<BookingStatResponseDto[]> {
    if (!query) {
      throw new BadRequestException(INCORRECT_PARAMS);
    }
    
    return this.bookingStatRepository.getAllBookingByDatePeriod(query);
  }

  getBookingByIdByDatePeriod(id: number, query: GetBookingByDateQuery):Promise<BookingStatResponseDto> {
    if (!query) {
      throw new BadRequestException(INCORRECT_PARAMS);
    }
    
    return this.bookingStatRepository.getBookingByIdByDatePeriod(id, query);
  }
}
