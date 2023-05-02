import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateBookingDto } from '../../src/modules/booking/dto/createBooking.dto';

describe('isWeekEnd', () => {
  const cases = [
    {
      toString: () => 'should fail on invalid DTO',
      myBodyObject: {
        dateStart: '2023-04-01',
        dateFinish: '2023-04-06',
        carId: 1,
      },
      expected: 1,
    },
    {
      toString: () => 'should pass DTO',
      myBodyObject: {
        dateStart: '2023-04-03',
        dateFinish: '2023-04-06',
        carId: 1,
      },
      expected: 0,
    },
  ];

  test.each(cases)('%s', async ({ myBodyObject, expected }) => {
    const myDtoObject = plainToInstance(CreateBookingDto, myBodyObject);
    const errors = await validate(myDtoObject);
    expect(errors.length).toBe(expected);
  });
});
