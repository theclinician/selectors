import isArray from 'lodash/isArray';

const normalize = selector => (...args) => {
  if (isArray(args[0])) {
    return selector(args[0], args[1]);
  }
  return selector(args.slice(0, args.length - 1), args[args.length - 1]);
};

export default normalize;
