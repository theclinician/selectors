import keyBy from 'lodash/keyBy';
import iteratee from 'lodash/iteratee';
import shallowEqual from './shallowEqual';
import stableMapValues from './stableMapValues';
import defaultIsEqual from './defaultIsEqual';

const memoizeMapValues = (mapOneValue, getKey, isEqual = defaultIsEqual) => {
  let lastInput = null;
  let lastResult = null;
  let lastValues = {};
  return (input) => {
    if (!lastResult) {
      lastResult = {};
    }
    const newValues = {};
    const newResult = stableMapValues(input, (value, key) => {
      const cacheKey = getKey ? iteratee(getKey)(value) : key;
      const memoizedValue = lastValues && lastValues[cacheKey];
      if (lastInput && lastInput[cacheKey] === value) {
        newValues[cacheKey] = memoizedValue;
        return memoizedValue;
      }
      const newValue = mapOneValue(value, cacheKey);
      newValues[cacheKey] = newValue;
      return newValue;
    }, isEqual);
    if (!shallowEqual(newResult, lastResult)) {
      lastResult = newResult;
      lastValues = newValues;
    }
    if (getKey) {
      lastInput = keyBy(input, getKey);
    } else {
      lastInput = input;
    }
    return lastResult;
  };
};

export default memoizeMapValues;
