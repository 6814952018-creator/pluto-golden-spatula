import { champions, traits, items, teamComps, guides } from './seedData.js';

export const store = { champions: [...champions], traits: [...traits], items: [...items], teamComps: [...teamComps], guides: [...guides] };

export function findById(collection, id) {
  return store[collection].find((entry) => entry.id === id);
}
