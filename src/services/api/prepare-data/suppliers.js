import { formatTimeForApi } from "@/utils/helpers";
import dayjs from "dayjs";
import { get } from "lodash";

export function prepareAddDebtSupplierDto(item) {
  return {
    supplier: Number(get(item, "supplier", "")),
    date: formatTimeForApi(get(item, "date", "")),
    sum: get(item, "sum", ""),
  };
}

export function prepareAddPaymentSupplierDto(item) {
  return {
    supplier: Number(get(item, "supplier", "")),
    date: formatTimeForApi(get(item, "date", "")),
    cash: get(item, "cash", ""),
    card: get(item, "card", ""),
    other: get(item, "other", ""),
  };
}

export function prepareSupplierDto(item) {
  return {
    name: get(item, "name", ""),
    phone: get(item, "phone", ""),
    supplier_type: get(item, "supplier_type", ""),
    desc: get(item, "desc", ""),
    added: formatTimeForApi(get(item, "added", "")),
  };
}

export function prepareSupplierForEdit(item) {
  return {
    name: get(item, "name", ""),
    phone: get(item, "phone", ""),
    supplier_type: get(item, "supplier_type", ""),
    desc: get(item, "desc", ""),
    added: dayjs(item.added),
  };
}
