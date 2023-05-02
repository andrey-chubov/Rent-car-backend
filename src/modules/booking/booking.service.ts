import { Injectable } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import { CreateBookingDto } from './dto/createBooking.dto';
import { ValidationException } from '../../exceptions/validation.exception';
import {
  CAR_NOT_AVAILABLE_FOR_BOOKING, INTERVAL_BETWEEN_BOOKING_LESS_3DAYS,

} from '../../shared/errors/errorMessages';

import { getNumberOfDays } from '../../shared/utils/getNumberDay';
import { BookingResponseDto } from '../../shared/responses/bookingResponse.dto';
import { assertDurationLessThan30 } from '../../shared/utils/assertDurationLessThan30';

@Injectable()
export class BookingService {
  constructor(private readonly bookingRepository: BookingRepository) {}
  async create(createBookingDto: CreateBookingDto): Promise<BookingResponseDto>  {

    const  dateStart = new Date (createBookingDto.dateStart);
    const dateFinish = new Date (createBookingDto.dateFinish);

    assertDurationLessThan30(new Date(dateStart), new Date(dateFinish));
    await this.assertDate(dateStart, dateFinish, createBookingDto.carId);

    const duration = getNumberOfDays(dateStart, dateFinish);

    const price = this.getCarPrice(dateStart, dateFinish);


    return this.bookingRepository.create(createBookingDto, duration, price);
  }

  getBookingByCarId(id: number): Promise<BookingResponseDto[]>  {
    return this.bookingRepository.getBookingByCarId(id);
  }

  getAllBooking(): Promise<BookingResponseDto[]>  {
    return this.bookingRepository.getAllBooking();
  }

  private async assertDate(
    dateStart: Date,
    dateFinish: Date,
    carId: number,
  ): Promise<void> {
    const bookings: BookingResponseDto[] = await this.bookingRepository.getBookingByCarId(
      carId,
    );

    if (bookings.length > 0) {
      bookings.forEach(booking => {

        if (
          new Date(dateFinish).getTime() === booking.dateFinish.getTime() &&
          new Date(dateStart).getTime() === booking.dateStart.getTime()
        ) {
          throw new ValidationException(CAR_NOT_AVAILABLE_FOR_BOOKING);
        }

        if (
          getNumberOfDays(dateStart, booking.dateFinish) <= 3 ||
          getNumberOfDays(dateFinish, booking.dateStart) <= 3
        ) {
          throw new ValidationException(INTERVAL_BETWEEN_BOOKING_LESS_3DAYS);
        }
      
        if (
          new Date(dateFinish).getTime() <= booking.dateStart.getTime() ||
          new Date(dateStart).getTime() >= booking.dateFinish.getTime()
        ) {
          throw new ValidationException(CAR_NOT_AVAILABLE_FOR_BOOKING);
        }
      });
    }
  }

  private  getCarPrice (dateStart: Date, dateFinish: Date): number {
    const duration = getNumberOfDays(dateStart, dateFinish);
  
    if (duration <= 4) {
      return duration * 1000;
    } else if (duration > 4 && duration <= 9) {
      return 4 * 1000 + (duration - 4) * 950;
    } else if (duration > 9 && duration <= 17) {
      return 4 * 1000 + 5 * 950 + (duration - 9) * 900;
    } else {
      return 4 * 1000 + 5 * 950 + 8 * 900 + (duration - 17) * 850;
    }
  };
}
