import { formatTimeForApi } from "@/utils/helpers";
import dayjs from "dayjs";
import { get } from "lodash";

export function prepareAddPaymentTradeDto(item) {
  return {
    trade: Number(get(item, "trade", "")),
    date: formatTimeForApi(get(item, "date", "")),
    cash: get(item, "cash", 0) ? get(item, "cash", 0) : 0,
    card: get(item, "card", 0) ? get(item, "card", 0) : 0,
    other: get(item, "other", 0) ? get(item, "other", 0) : 0,
  };
}

export function prepareTradeDto(item) {
  return {
    client: Number(get(item, "client", "")),
    desc: get(item, "desc", ""),
    date: formatTimeForApi(get(item, "date", "")),

    discount_summa: get(item, "discount_summa", 0),
    cash: get(item, "cash", 0),
    card: get(item, "card", 0),
    other: get(item, "other", 0),

    products: get(item, "products", []),
    services: get(item, "services", []),
  };
}

export function prepareTradeForEdit(item) {
  const products = get(item, "products", []).map((item) => ({
    product: get(item, "product.id", ""),
    price: get(item, "price", ""),
    size_type: get(item, "size_type", ""),
    count: get(item, "count", ""),
    width: get(item, "width", 1),
    height: get(item, "height", 1),
    part_size: get(item, "part_size", 1),
  }));

  const services = get(item, "services", []).map((item) => ({
    service: get(item, "service.id", ""),
    price: get(item, "price", ""),
    count: get(item, "count", ""),
  }));

  const service_types = get(item, "services", []).map((item) => [
    item.service.id,
  ]);

  return {
    client: get(item, "client.id", ""),

    products: products,
    services: services,
    service_types: service_types,

    cash: get(item, "cash", ""),
    card: get(item, "card", ""),
    other: get(item, "other", ""),
    desc: get(item, "desc", ""),

    date: dayjs(get(item, "date", "")),
  };
}
