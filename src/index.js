import omit from 'lodash/omit';
import isPlainObject from 'lodash/isPlainObject';
import mapValues from 'lodash/mapValues';
import isEqual from 'lodash/isEqual';
import {
  createSelector,
  createStructuredSelector,
  createSelectorCreator,
  defaultMemoize,
} from 'reselect';
import createGetAtKey from './createGetAtKey';
import shallowEqual from './shallowEqual';
import createValuesMappingSelector from './createValuesMappingSelector';
import createReconcilingSelector from './createReconcilingSelector';

export const identity = x => x;

export const constant = x => () => x;

export const property = (name) => {
  const getAtKey = createGetAtKey(name);
  return (state, props) => getAtKey(props);
};

export const argument = (i, k) => {
  if (!k) {
    return (...args) => args[i];
  }
  const getAtKey = createGetAtKey(k);
  return (...args) => getAtKey(args[i]);
};

export const shallowEqualSelector = createSelectorCreator(
  defaultMemoize,
  shallowEqual,
);

export const createOwnPropsSelector = (options) => {
  let selectProps;
  if (options && options.omit) {
    selectProps = (state, props) => omit(props, options.omit);
  } else {
    selectProps = argument(1);
  }
  return shallowEqualSelector(selectProps, identity);
};

export const createHigherOrderSelector = (...selectorArgs) => {
  const selectGetValue = createSelector(...selectorArgs);
  return (...args) => {
    const getValue = selectGetValue(...args);
    if (typeof getValue === 'function') {
      return getValue(...args);
    }
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`createHigherOrderSelector requires a function, received ${typeof getValue}`);
    }
    return undefined;
  };
};

export const toSelector = (selector) => {
  if (isPlainObject(selector)) {
    return createStructuredSelector(mapValues(selector, toSelector));
  } else if (typeof selector === 'function') {
    return selector;
  }
  return constant(selector);
};

export const createShallowEqualSelector = createSelectorCreator(
  defaultMemoize,
  shallowEqual,
);

export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual,
);

export {
  createValuesMappingSelector,
  createReconcilingSelector,
};

