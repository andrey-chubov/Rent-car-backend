import { getCarPrice } from '../../../src/shared/utils/getCarPrice';

describe('getCarPrice', () => {
  const cases = [
    {
      toString: () => 'should be return 1',
      start: '2023-01-01',
      end: '2023-01-04',
      expected: 3000,
    },
    {
      toString: () => 'should be return 1',
      start: '2023-01-01',
      end: '2023-01-06',
      expected: 4950,
    },
    {
      toString: () => 'should be return 1',
      start: '2023-01-01',
      end: '2023-01-09',
      expected: 7800,
    },
    {
      toString: () => 'should be return 1',
      start: '2023-01-01',
      end: '2023-01-11',
      expected: 9650,
    },
    {
      toString: () => 'should be return 1',
      start: '2023-01-01',
      end: '2023-01-17',
      expected: 15050,
    },
    {
      toString: () => 'should be return 1',
      start: '2023-01-01',
      end: '2023-01-20',
      expected: 17650,
    },
  ];

  test.each(cases)('%s', ({ start, end, expected }) => {
    const result = getCarPrice(start, end);
    expect(result).toStrictEqual(expected);
  });
});
