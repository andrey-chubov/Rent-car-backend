import { getNumberOfDays } from '../../../src/shared/utils/getNumberDay';

describe('getNumberOfDays', () => {
  const cases = [
    {
      toString: () => 'should be return 1',
      start: new Date('2023-01-01'),
      end: new Date('2023-01-02'),
      expected: 1,
    },
  ];

  test.each(cases)('%s', ({ start, end, expected }) => {
    const result = getNumberOfDays(start, end);
    expect(result).toStrictEqual(expected);
  });
});
