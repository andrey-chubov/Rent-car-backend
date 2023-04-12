import { assertDurationLessThan30 } from '../../../src/shared/utils/assertDurationLessThan30';
import { ValidationException } from '../../../src/exceptions/validation.exception';
import { MAX_30DAYS } from '../../../src/shared/errors/errorMessages';

describe('assertDurationLessThan30', () => {
  const cases = [
    {
      toString: () => 'should be return nothing, when duration less than 30',
      start: new Date('2023-01-01'),
      end: new Date('2023-01-02'),
      expected: undefined,
    },

    {
      toString: () =>
        '2 should be return exception, when duration bigger than 30',
      start: new Date('2023-01-01'),
      end: new Date('2023-03-02'),
      expected: new ValidationException(MAX_30DAYS),
    },
  ];

  test.each(cases)('%s', ({ start, end, expected }) => {
    try {
      const result = assertDurationLessThan30(start, end);
      expect(result).toStrictEqual(expected);
    } catch (error) {
      expect(error).toStrictEqual(expected);
    }
  });
});
