/* eslint-env jest */

import shallowEqual from './shallowEqual';

it('should accept empty objects', () => {
  expect(shallowEqual({}, {})).toBe(true);
});

it('should accept empty arrays', () => {
  expect(shallowEqual([], [])).toBe(true);
});

it('should not accept object vs array', () => {
  expect(shallowEqual([], {})).toBe(false);
});

it('should accept arrays with a few elements', () => {
  expect(shallowEqual([1, 2, 3], [1, 2, 3])).toBe(true);
});

it('should not accept arrays with different elements', () => {
  expect(shallowEqual([1, 2, 4], [1, 2, 3])).toBe(false);
});

it('should not accept arrays with different number of elements', () => {
  expect(shallowEqual([1, 2], [1, 2, 3])).toBe(false);
});

it('should accept objects with a few elements', () => {
  expect(shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
});

it('should not accept objects with different elements', () => {
  expect(shallowEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
});

it('should not accept objects with different number of elements', () => {
  expect(shallowEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
});

it('should compare two same dates', () => {
  expect(shallowEqual(new Date('2018-08-28'), new Date('2018-08-28'))).toBe(true);
});

it('should compare two different dates', () => {
  expect(shallowEqual(new Date('2018-08-27'), new Date('2018-08-28'))).toBe(false);
});

it('should compare NaN === NaN', () => {
  expect(shallowEqual(NaN, NaN)).toBe(true);
});

it('should compare object containing NaN as fields', () => {
  expect(shallowEqual({ a: NaN }, { a: NaN })).toBe(true);
});
