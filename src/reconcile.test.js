/* eslint-env jest */

import reconcile from './reconcile';

it('selects the first object if both are empty', () => {
  const a = {};
  const b = {};
  expect(reconcile(a, b)).toBe(a);
});

it('selects the first array if both are empty', () => {
  const a = [];
  const b = [];
  expect(reconcile(a, b)).toBe(a);
});

it('selects the second object if level === 0', () => {
  const a = {};
  const b = {};
  expect(reconcile(a, b, { level: 0 })).toBe(b);
});

it('selects the first object if shallow equal and level === 1', () => {
  const a = { x: 1, y: 2 };
  const b = { x: 1, y: 2 };
  expect(reconcile(a, b, { level: 1 })).toBe(a);
});

it('selects the second object if not shallow equal and level === 1', () => {
  const a = { x: 1, y: 1 };
  const b = { x: 1, y: 2 };
  expect(reconcile(a, b, { level: 1 })).toBe(b);
});

it('selects the second object if deeply (but not shallow) equal and level === 1', () => {
  const a = { x: 1, y: { A: 1 } };
  const b = { x: 1, y: { A: 1 } };
  expect(reconcile(a, b, { level: 1 })).toBe(b);
});

it('selects the first object if deeply equal', () => {
  const a = { x: 1, y: { A: 1 } };
  const b = { x: 1, y: { A: 1 } };
  expect(reconcile(a, b)).toBe(a);
});

it('selects the second object one key is missing', () => {
  const a = { x: 1, y: 1 };
  const b = { x: 1 };
  expect(reconcile(a, b)).toBe(b);
});

it('selects the first array if both have exactly the same elements', () => {
  const a = [1, 2, 3];
  const b = [1, 2, 3];
  expect(reconcile(a, b)).toBe(a);
});

it('selects the second array if they don\'t have the same elements', () => {
  const a = [1, 2, 3];
  const b = [1, 2, 3, 4];
  expect(reconcile(a, b)).toBe(b);
});

it('selects the first object if both have the same elements', () => {
  const a = { x: 1, y: 1 };
  const b = { x: 1, y: 1 };
  expect(reconcile(a, b)).toBe(a);
});

it('selects the second object if they don\'t have the same elements', () => {
  const a = { x: 1, y: 1 };
  const b = { x: 1, y: 2 };
  expect(reconcile(a, b)).toBe(b);
});

it('selects sub-object from the first argument if values are the same', () => {
  const a = { p: { x: 1, y: 1 }, q: { x: 2, y: 2 } };
  const b = { p: { x: 1, y: 1 }, q: { x: 1, y: 2 } };
  const c = reconcile(a, b);
  expect(c).not.toBe(a);
  expect(c).not.toBe(b);
  expect(c.p).toBe(a.p);
  expect(c).toEqual(b);
});

it('selects deeply nested from the first argument if values are the same', () => {
  const a = { p: { x: { A: 1 }, y: 2 }, q: { x: 2, y: 2 } };
  const b = { p: { x: { A: 1 }, y: 1 }, q: { x: 1, y: 2 } };
  const c = reconcile(a, b);
  expect(c).not.toBe(a);
  expect(c).not.toBe(b);
  expect(c.p.x).toBe(a.p.x);
  expect(c).toEqual(b);
});

it('selects sub-array from the first argument if values are the same', () => {
  const a = { p: [1, 2], q: [2, 2] };
  const b = { p: [1, 2], q: [1, 2] };
  const c = reconcile(a, b);
  expect(c).not.toBe(a);
  expect(c).not.toBe(b);
  expect(c.p).toBe(a.p);
  expect(c).toEqual(b);
});

it('selects sub-array from the first argument if values deep equal', () => {
  const a = { p: [{ x: 1 }, { x: 2 }], q: [{ x: 2 }, { x: 2 }] };
  const b = { p: [{ x: 1 }, { x: 2 }], q: [{ x: 1 }, { x: 2 }] };
  const c = reconcile(a, b);
  expect(c).not.toBe(a);
  expect(c).not.toBe(b);
  expect(c.p).toBe(a.p);
  expect(c).toEqual(b);
});

it('selects date from the first argument if dates are equal', () => {
  const a = { date: new Date('2018-08-28'), x: 1 };
  const b = { date: new Date('2018-08-28'), x: 2 };
  const c = reconcile(a, b);
  expect(c).not.toBe(a);
  expect(c).not.toBe(b);
  expect(c.date).toBe(a.date);
  expect(c).toEqual(b);
});

it('selects the first object if both have field equal to NaN', () => {
  const a = { value: NaN };
  const b = { value: NaN };
  const c = reconcile(a, b);
  expect(c).toBe(a);
});
