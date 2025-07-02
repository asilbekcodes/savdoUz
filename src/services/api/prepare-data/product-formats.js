import { get } from "lodash";

export function prepareProductFormatForEdit(item) {
  return {
    name: get(item, "name", ""),
  };
}
