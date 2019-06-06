/* eslint-env jest */
import stableMapValues from './stableMapValues';

// TODO: Implement more tests.
describe('Test - stableMapValues', () => {
  test('leaves null unchanged', () => {
    expect(stableMapValues(null)).toEqual(null);
  });

  test('removes keys and map object at the same time', () => {
    expect(stableMapValues({
      1: 1,
      2: 2,
      3: 3,
      4: 4,
    }, (value, key, remove) => {
      if (value % 2 === 0) {
        return remove;
      }
      return value + 1;
    })).toEqual({
      1: 2,
      3: 4,
    });
  });

  test('removes elements and map array at the same time', () => {
    expect(stableMapValues([
      1,
      2,
      3,
      4,
    ], (value, key, remove) => {
      if (value % 2 === 0) {
        return remove;
      }
      return value + 1;
    })).toEqual([2, 4]);
  });
});
