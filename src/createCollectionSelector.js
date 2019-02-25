import has from 'lodash/has';
import forEach from 'lodash/forEach';
import sortBy from 'lodash/sortBy';
import isEqual from 'lodash/isEqual';
import mapValues from 'lodash/mapValues';
import { createSelector } from 'reselect';
import createValuesMappingSelector from './createValuesMappingSelector';
import createReconcilingSelector from './createReconcilingSelector';

const createCollectionSelector = (collectionName, selectDataSources) => {
  const selectRevisionHistory = createSelector(
    createValuesMappingSelector(
      selectDataSources,
      dataSources => mapValues(dataSources, ({
        updatedAt,
        collections,
      }) => ({
        updatedAt,
        fields: collections.fields && collections.fields[collectionName],
        entities: collections[collectionName],
      })),
    ),
    revisions => sortBy(revisions, 'updatedBy'),
  );

  const selectGroupedRevisions = createReconcilingSelector(
    selectRevisionHistory,
    (revisions) => {
      const entities = {};
      forEach(revisions, (revision) => {
        forEach(revision.entities, (doc, id) => {
          const entry = {
            doc,
            fields: revision.fields,
          };
          if (!entities[id]) {
            entities[id] = [entry];
          } else {
            entities[id].push(entry);
          }
        });
      });
      return entities;
    },
  );

  return createValuesMappingSelector(
    selectGroupedRevisions,
    (entries) => {
      const newDoc = {};
      forEach(entries, ({ doc, fields }) => {
        Object.assign(newDoc, doc);
        forEach(fields, (fieldName) => {
          if (!has(doc, fieldName)) {
            delete newDoc[fieldName];
          }
        });
      });
      return newDoc;
    },
    null,
    isEqual,
  );
};

export default createCollectionSelector;
