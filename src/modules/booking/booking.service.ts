import { Injectable } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import { CreateBookingDto } from './dto/createBooking.dto';
import { Booking } from './entities/booking.entity';
import { ValidationException } from 'src/exceptions/validation.exception';
import {
  CAR_NOT_AVAILABLE_FOR_BOOKING,
  INTERVAL_LESS,
} from 'src/shared/errors/errorMessages';
import { isDurationLessThan30 } from 'src/shared/utils/isDurationLessThan30';
import { getNumberOfDays } from 'src/shared/utils/getNumberDay';
import { getCarPrice } from 'src/shared/utils/getCarPrice';

@Injectable()
export class BookingService {
  constructor(private readonly bookingRepository: BookingRepository) {}
  async create(createBookingDto: CreateBookingDto) {
    const { dateStart, dateFinish, carId } = createBookingDto;

    isDurationLessThan30(dateStart, dateFinish);
    await this.checkData(dateStart, dateFinish, carId);

    const duration = getNumberOfDays(dateStart, dateFinish);
    const price = getCarPrice(dateStart, dateFinish);

    return this.bookingRepository.create(createBookingDto, duration, price);
  }

  getBookingByCar(id: number) {
    return this.bookingRepository.getBookingsByCarID(id);
  }

  getAllBooking() {
    return this.bookingRepository.getAllBooking();
  }

  private async checkData(
    dateStart: string,
    dateFinish: string,
    carId: number,
  ): Promise<void> {
    const bookings: Booking[] = await this.bookingRepository.getBookingsByCarID(
      carId,
    );

    if (bookings.length > 0) {
      bookings.forEach(booking => {
        if (
          new Date(dateFinish).getDate() === booking.dateFinish.getDate() &&
          new Date(dateStart).getDate() === booking.dateStart.getDate()
        ) {
          throw new ValidationException(CAR_NOT_AVAILABLE_FOR_BOOKING);
        }

        if (
          getNumberOfDays(dateStart, booking.dateFinish.toDateString()) <= 3 &&
          getNumberOfDays(dateFinish, booking.dateStart.toDateString()) <= 3
        ) {
          throw new ValidationException(INTERVAL_LESS);
        }

        if (
          new Date(dateFinish).getDate() <= booking.dateStart.getDate() &&
          new Date(dateStart).getDate() >= booking.dateFinish.getDate()
        ) {
          throw new ValidationException(CAR_NOT_AVAILABLE_FOR_BOOKING);
        }
      });
    }
  }
}
