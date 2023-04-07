import { Injectable } from '@nestjs/common';
import { BookingStatisticRepository } from './bookingStat.repository';
import GetBookingByDateQuery from './dto/bookingDataParams';

@Injectable()
export class BookingStatisticService {
  constructor(
    private readonly bookingStatRepository: BookingStatisticRepository,
  ) {}

  getAllCarsBookings() {
    return this.bookingStatRepository.getAllCarsBookings();
  }

  getCarBookings(id: number) {
    return this.bookingStatRepository.getCarBookings(id);
  }

  getAllCarsBookingsByDate(query: GetBookingByDateQuery) {
    return this.bookingStatRepository.getAllCarsBookingsByDatePeriod(query);
  }

  getCarBookingsByDate(id: number, query: GetBookingByDateQuery) {
    return this.bookingStatRepository.getCarBookingsByDatePeriod(id, query);
  }
}
