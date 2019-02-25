/* eslint-env jest */
import mapValues from 'lodash/mapValues';
import cloneDeep from 'lodash/cloneDeep';
import {
  createReconcilingSelectorCreator,
} from './createReconcilingSelector';

const identity = x => x;

describe('level 0 selectors', () => {
  let selector;

  const obj1 = {};
  const obj2 = {};

  beforeEach(() => {
    selector = createReconcilingSelectorCreator({ level: 0 })(
      identity,
      object => mapValues(object, identity),
    );
  });

  it('selects the same object if argument is the same', () => {
    const object = {
      obj1,
      obj2,
    };
    const value = selector(object);
    expect(selector(object)).toBe(value);
  });

  it('does not select the same object even if the result is shallow equal', () => {
    const value = selector({
      obj1,
      obj2,
    });
    expect(selector({
      obj1,
      obj2,
    })).not.toBe(value);
  });
});

describe('level 1 selectors', () => {
  let selector;

  const obj1 = {};
  const obj2 = {};

  beforeEach(() => {
    selector = createReconcilingSelectorCreator({ level: 1 })(
      identity,
      object => mapValues(object, identity),
    );
  });

  it('selects different value if there are not the same', () => {
    const value = selector({
      obj1,
      obj2,
    });
    expect(selector({
      obj1,
      obj2: null,
    })).not.toBe(value);
  });

  it('selects different value if identical but not shallow equal', () => {
    const value = selector({
      a: {
        obj1,
        obj2,
      },
    });
    expect(selector({
      a: {
        obj1,
        obj2,
      },
    })).not.toBe(value);
  });

  it('selects the same value they are shallow equal', () => {
    const value = selector({
      obj1,
      obj2,
    });
    expect(selector({
      obj1,
      obj2,
    })).toBe(value);
  });
});

describe('arbitrary level selectors', () => {
  let selector;

  const obj1 = {};
  const obj2 = {};

  beforeEach(() => {
    selector = createReconcilingSelectorCreator()(
      identity,
      object => cloneDeep(object),
    );
  });

  it('selects different value if there are not the same', () => {
    const value = selector({
      a: {
        obj1,
        obj2,
      },
    });
    expect(selector({
      a: {
        obj1,
        obj2: null,
      },
    })).not.toBe(value);
  });

  it('selects the same value if there if it is identical', () => {
    const value = selector({
      a: {
        obj1,
        obj2,
      },
    });
    expect(selector({
      a: {
        obj1,
        obj2,
      },
    })).toBe(value);
  });
});
