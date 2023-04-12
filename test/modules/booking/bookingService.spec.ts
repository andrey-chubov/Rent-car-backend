import { Test } from '@nestjs/testing';
import { BookingRepository } from '../../../src/modules/booking/booking.repository';
import { BookingService } from '../../../src/modules/booking/booking.service';
import { BookingResponseDtoBuilder } from '../../_fixtures_/bookingResponseDtoBuilder';
import { CreateBookingDtoBuilder } from '../../_fixtures_/createBookingDtoBuilder';
import { createFakeBookingRepository } from '../../_fixtures_/fakes/createFakeBookingRepository';
import {
  CAR_NOT_AVAILABLE_FOR_BOOKING,
  INTERVAL_BETWEEN_BOOKING_LESS_3DAYS,
} from '../../../src/shared/errors/errorMessages';
import { ValidationException } from '../../../src/exceptions/validation.exception';

describe('BookingService', () => {
  let bookingService: BookingService;
  const stubBookingRepository = createFakeBookingRepository();
  const mockResponse = BookingResponseDtoBuilder.defaultAll().result;
  const mockDto4Days = CreateBookingDtoBuilder.forFourthDays().result;
  const mockDtoCarBusy = CreateBookingDtoBuilder.forCarBusy().result;
  const mockDtoInterval = CreateBookingDtoBuilder.forInterval().result;
  const spyRepository = jest
    .spyOn(stubBookingRepository, 'getBookingsByCarID')
    .mockReturnValueOnce([])
    .mockReturnValueOnce([mockResponse])
    .mockReturnValueOnce([mockResponse]);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [BookingService],
      providers: [
        {
          provide: BookingRepository,
          useValue: stubBookingRepository,
        },
      ],
    }).compile();

    bookingService = moduleRef.get<BookingService>(BookingService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    const cases = [
      {
        toString: () => 'should be return mockResponse',
        createDto: mockDto4Days,
        expected: mockResponse,
      },
      {
        toString: () =>
          'should be return exception CAR_NOT_AVAILABLE_FOR_BOOKING',
        createDto: mockDtoCarBusy,
        expected: new ValidationException(CAR_NOT_AVAILABLE_FOR_BOOKING),
      },
      {
        toString: () =>
          'should be return exception INTERVAL_BETWEEN_BOOKING_LESS_3DAYS',
        createDto: mockDtoInterval,
        expected: new ValidationException(INTERVAL_BETWEEN_BOOKING_LESS_3DAYS),
      },
    ];

    test.each(cases)('%s', async ({ createDto, expected }) => {
      try {
        const result = await bookingService.create(createDto);
        expect(result).toEqual(expected);
      } catch (error) {
        expect(error).toStrictEqual(expected);
      }
    });
  });
});
