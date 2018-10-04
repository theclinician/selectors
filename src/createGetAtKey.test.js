/* eslint-env jest */

import createGetAtKey from './createGetAtKey';

it('should get at empty key', () => {
  expect(createGetAtKey()(11)).toBe(11);
});

it('should get at simple key', () => {
  expect(createGetAtKey('x')({ x: 12 })).toBe(12);
});

it('should get at nested key', () => {
  expect(createGetAtKey('x.y')({ x: { y: 13 } })).toBe(13);
});

it('should get at multi nested key', () => {
  expect(createGetAtKey('x.y.z')({ x: { y: { z: 14 } } })).toBe(14);
});

it('should get at nested key from array', () => {
  expect(createGetAtKey('x.0.z')({ x: [{ z: 15 }] })).toBe(15);
});

it('should return undefined if key not found', () => {
  expect(createGetAtKey('x.y.z')({})).toBe(undefined);
});
