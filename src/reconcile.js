import isDate from 'lodash/isDate';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import mapValues from 'lodash/mapValues';
import map from 'lodash/map';
import isPlainObject from 'lodash/isPlainObject';
import shallowEqual from './shallowEqual';

function reconcile(a, b, { level = -1 } = {}) {
  if (level === 0) {
    return b;
  }
  if (a === b) {
    return b;
  }
  if (!isObject(a) || !isObject(b)) {
    return b;
  }
  if (isDate(a) && isDate(b)) {
    if (shallowEqual(a, b)) {
      return a;
    }
    return b;
  }
  if ((isArray(a) && isArray(b))) {
    const c = map(b, (v, i) => reconcile(a[i], v, { level: level > 0 ? level - 1 : level }));
    if (shallowEqual(c, a)) {
      return a;
    }
    if (shallowEqual(c, b)) {
      return b;
    }
    return c;
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const c = mapValues(b, (v, k) => reconcile(a[k], v, { level: level > 0 ? level - 1 : level }));
    if (shallowEqual(c, a)) {
      return a;
    }
    if (shallowEqual(c, b)) {
      return b;
    }
    return c;
  }
  return b;
}

export default reconcile;
