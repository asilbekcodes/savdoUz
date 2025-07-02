import { formatTimeForApi } from "@/utils/helpers";
import dayjs from "dayjs";
import { get } from "lodash";

// export function prepareClientDto(item) {
//   return {
//     name: get(item, "name", ""),
//     image: get(item, "image", ""),
//     phone: get(item, "phone", ""),
//     client_type: get(item, "client_type", ""),
//     desc: get(item, "desc", ""),
//     added: formatTimeForApi(get(item, "added", "")),
//   };
// }

export function prepareClientDto(item) {
  const formData = new FormData();

  formData.append("name", get(item, "name", ""));
  formData.append("phone", get(item, "phone", ""));
  formData.append("client_type", get(item, "client_type", ""));
  formData.append("desc", get(item, "desc", ""));
  formData.append("added", formatTimeForApi(get(item, "added", "")));
  formData.append("inn_number", get(item, "inn_number", ""));
  formData.append("account_number", get(item, "account_number", ""));
  formData.append("location", get(item, "joylashuv", ""));
  formData.append("password", get(item, "parol", ""));
  formData.append("company_id", "1");

  // Fayl mavjudligini tekshiring va uni `FormData` ga qo'shing
  const imageFile = get(item, "image", null);
  if (imageFile) {
    formData.append("image", imageFile.originFileObj || imageFile); // `Upload` komponentidan kelgan faylni jo'natish
  }

  return formData;
}

export function prepareClientForEdit(item) {
  return {
    name: get(item, "name", ""),
    phone: get(item, "phone", ""),
    client_type: get(item, "client_type", ""),
    desc: get(item, "desc", ""),
    added: dayjs(item.added),
  };
}


export function prepareAddPaymentClientDto(item) {
  return {
    client: Number(get(item, "client", "")),
    date: formatTimeForApi(get(item, "date", "")),
    cash: get(item, "cash", ""),
    card: get(item, "card", ""),
    other: get(item, "other", ""),
  };
}