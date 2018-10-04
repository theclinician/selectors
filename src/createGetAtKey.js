const splitKey = (key) => {
  if (typeof key !== 'string') {
    return [null, null];
  }
  const i = key.indexOf('.');
  if (i >= 0) {
    return [key.substr(0, i), key.substr(i + 1)];
  }
  return [key, null];
};

const identity = x => x;

const createGetAtKey = (key) => {
  if (!key) {
    return identity;
  }
  const [k, tail] = splitKey(key);
  if (!tail) {
    return value => value && value[k];
  }
  const getAtKey = createGetAtKey(tail);
  return value => getAtKey(value && value[k]);
};

export default createGetAtKey;
