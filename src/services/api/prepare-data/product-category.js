import { get } from "lodash";

export function prepareProductCategoryForEdit(item) {
  return {
    name: get(item, "name", ""),
  };
}
