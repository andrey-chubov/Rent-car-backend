import { BookingRepository } from '../../../src/modules/booking/booking.repository';
import { BookingResponseDtoBuilder } from '../bookingResponseDtoBuilder';

export const createFakeBookingRepository = (): Record<
  keyof BookingRepository,
  jest.Mock
> => ({
  create: jest.fn().mockReturnValue(mockResponse),
  getAllBooking: jest.fn(),
  getBookingByCarId: jest.fn(),
});

const mockResponse = BookingResponseDtoBuilder.defaultAll().result;
