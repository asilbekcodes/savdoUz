import { formatTimeForApi } from "@/utils/helpers";
import dayjs from "dayjs";
import { get } from "lodash";

export function prepareFinanceOutcomeDto(item) {
  return {
    transaction: get(item, "transaction", ""),
    cash: get(item, "cash", ""),
    card: get(item, "card", ""),
    other: get(item, "card", ""),
    desc: get(item, "desc", ""),
    date: formatTimeForApi(get(item, "date", "")),
  };
}

export function prepareFinanceOutcomeForEdit(item) {
  return {
    transaction: get(item, "transaction.id", ""),
    cash: get(item, "cash", ""),
    card: get(item, "card", ""),
    other: get(item, "card", ""),
    desc: get(item, "desc", ""),
    date: dayjs(item.date),
  };
}
