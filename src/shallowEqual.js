import isNaN from 'lodash/isNaN';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isDate from 'lodash/isDate';

const isEqual = (a, b) => {
  if (isNaN(a)) {
    return isNaN(b);
  }
  return a === b;
};

const shallowEqual = (a, b) => {
  if (!isObject(a) || !isObject(b)) {
    return isEqual(a, b);
  }
  if (isDate(a)) {
    return isDate(b) && isEqual(a.getTime(), b.getTime());
  }
  const aIsArray = isArray(a);
  const bIsArray = isArray(b);
  if (aIsArray && bIsArray) {
    if (a.length !== b.length) {
      return false;
    }
    return a.every((v, i) => isEqual(v, b[i]));
  }
  if (!aIsArray && !bIsArray) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) {
      return false;
    }
    return keysA.every(k => isEqual(a[k], b[k]));
  }
  return false;
};

export default shallowEqual;
