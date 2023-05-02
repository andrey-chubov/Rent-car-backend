import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { BookingRepository } from './booking.repository';
import { BookingStatisticController } from './bookingStat.controller';
import { BookingStatisticRepository } from './bookingStat.repository';
import { BookingStatisticService } from './bookingStat.service';

@Module({
  controllers: [BookingController, BookingStatisticController],
  providers: [
    BookingService,
    BookingRepository,
    BookingStatisticRepository,
    BookingStatisticService,
  ],
})
export class BookingModule {}
