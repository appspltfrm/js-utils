import {deepMerge} from "./_deepMerge.js";

export function merge(deep: boolean, ...objects: any[]) {
  if (deep) {
    return deepMerge(...objects);
  } else {
    return Object.assign({}, ...objects);
  }
}
