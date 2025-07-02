import { get } from "lodash";

export function prepareServiceDto(item) {
  return {
    name: get(item, "name", ""),
    price: get(item, "price", ""),
  };
}

export function prepareServiceForEdit(item) {
  return {
    name: get(item, "name", ""),
    price: get(item, "price", ""),
  };
}
