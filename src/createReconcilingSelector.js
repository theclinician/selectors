import { createSelector } from 'reselect';
import normalize from './normalize';
import reconcile from './reconcile';

const createReconcilingSelector = normalize((selectors, evaluate) => {
  let cached;
  return createSelector(
    selectors,
    (...values) => {
      const result = evaluate(...values);
      cached = reconcile(cached, result);
      return cached;
    },
  );
});

export default createReconcilingSelector;
