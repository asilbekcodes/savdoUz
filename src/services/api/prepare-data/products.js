import { get } from "lodash";

export function prepareProductForEdit(item) {
  return {
    name: get(item, "name", ""),
    category_id: get(item, "category.id", ""),
    format_id: get(item, "format.id", ""),
    storage_id: get(item, "storage.id", ""),
    product_type: get(item, "product_type", ""),
    price: get(item, "price", ""),
    bar_code: get(item, "bar_code", ""),
  };
}
