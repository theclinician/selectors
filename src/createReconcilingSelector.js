import { createSelector } from 'reselect';
import normalize from './normalize';
import reconcile from './reconcile';

export const createReconcilingSelectorCreator = ({ level = -1 } = {}) => normalize((selectors, evaluate) => {
  let cached;
  return createSelector(
    selectors,
    (...values) => {
      const result = evaluate(...values);
      cached = reconcile(cached, result, { level });
      return cached;
    },
  );
});

const createReconcilingSelector = createReconcilingSelectorCreator();

export default createReconcilingSelector;
