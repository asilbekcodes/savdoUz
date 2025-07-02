import { get } from "lodash";

export function prepareWorkerDto(item) {
  return {
    first_name: get(item, "first_name", ""),
    last_name: get(item, "last_name", ""),
    username: get(item, "username", ""),
    email: get(item, "email", ""),
    password: get(item, "password", ""),
    is_active: get(item, "is_active", false),
    is_trade: get(item, "is_trade", false),
    is_client: get(item, "is_client", false),
    is_statistics: get(item, "is_statistics", false),
    is_storage: get(item, "is_storage", false),
    role: get(item, "client_role", ""),
    location: get(item, "location", ""),
  };
}

export function prepareWorkerForEdit(item) {
  return {
    first_name: get(item, "first_name", ""),
    last_name: get(item, "last_name", ""),
    username: get(item, "username", ""),
    email: get(item, "email", ""),
    password: get(item, "password", ""),
    is_active: get(item, "is_active", false),
    is_trade: get(item, "is_trade", false),
    is_client: get(item, "is_client", false),
    is_statistics: get(item, "is_statistics", false),
    is_storage: get(item, "is_storage", false),
    role: get(item, "role", ""),
    location: get(item, "location", ""),
  };
}
