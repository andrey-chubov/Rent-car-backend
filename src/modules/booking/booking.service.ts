import { Injectable } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(private readonly bookingRepository: BookingRepository) {}
  create(createBookingDto: CreateBookingDto) {
    return this.bookingRepository.create(createBookingDto);
  }

  getBookingByCar(id: number) {
    return this.bookingRepository.getBookingsByCarID(id);
  }

  getAllBooking() {
    return this.bookingRepository.getAllBooking();
  }
}
