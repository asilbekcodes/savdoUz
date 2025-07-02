import { get } from "lodash";

export function prepareStorageProductOffDto(item) {
  return {
    product: Number(get(item, "product", "")),
    count: get(item, "count", ""),
  };
}

export function prepareStorageProductOffForEdit(item) {
  return {
    product: get(item, "product.id", ""),
    count: get(item, "count", ""),
  };
}
