import { get } from "lodash";

export function prepareStorageDto(item) {
  return {
    name: get(item, "name", ""),
  };
}

export function prepareStorageForEdit(item) {
  return {
    name: get(item, "name", ""),
  };
}
