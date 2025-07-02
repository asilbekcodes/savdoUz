import toast from "@/services/notification/notification";
import dayjs from "dayjs";
import { get } from "lodash";
import { Trans, useTranslation } from "react-i18next";
import { NumericFormat } from "react-number-format";

export function objectToQueryString(obj) {
  return Object.keys(obj)
    .filter((key) => obj[key] !== null) // Null qiymatlarni filtrlaymiz
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");
}

export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

export function getValidationStatus(errors, fieldName) {
  return {
    validateStatus: errors[fieldName] ? "error" : "",
    help: errors[fieldName]?.message,
  };
}

export function getValidationStatusForArray(
  errors,
  arrayName,
  index,
  fieldName
) {
  return {
    validateStatus: errors[arrayName]?.[index]?.[fieldName] ? "error" : "",
    help: errors[arrayName]?.[index]?.[fieldName]?.message || "",
  };
}

export function handleErrorNotification(error) {
  const langStore = localStorage.getItem("langStore");
  const lang = get(JSON.parse(langStore), "state.lang", "uz");

  toast
    .setDuration(4)
    .setDesc(get(error?.response?.data?.error, lang, get(error, "message", "")))
    .setMessage(lang === "uz" ? "Xatolik" : lang === "ru" ? "Ошибка" : "Error")
    .error();
}

export function handleSuccessNotification(successMessage) {
  const langStore = localStorage.getItem("langStore");
  const lang = get(JSON.parse(langStore), "state.lang", "uz");

  const defaultSuccessMessage =
    lang === "uz"
      ? "Muvaffaqiyatli bajarildi!"
      : lang === "ru"
      ? "Успешно выполнено!"
      : "Successfully completed!";

  toast
    .setDuration(4)
    .setMessage(successMessage || defaultSuccessMessage)
    .setDesc("")
    .success();
}

export function NumberToThousandFormat(number, suffixText) {
  const companyStore = localStorage.getItem("companyStore");

  const currency_type = get(
    JSON.parse(companyStore),
    "state.company.currency_type",
    ""
  );

  return (
    <NumericFormat
      value={number}
      displayType={"text"}
      thousandSeparator={" "}
      suffix={suffixText ? ` ${suffixText}` : ` ${currency_type}`}
      renderText={(formattedValue) => <>{formattedValue}</>}
    />
  );
}

export function formatTimeForApi(date) {
  if (!date) {
    return;
  }
  return dayjs(date);
}

export function formatTimeForUI(date) {
  if (!date) {
    return;
  }

  return dayjs(date).format("YYYY-MM-DD HH:mm");
}

export function getMonthName(dateString) {
  const langStore = localStorage.getItem("langStore");
  const lang = get(JSON.parse(langStore), "state.lang", "uz");

  const months = [
    { uz: "Yanvar", ru: "Январь", en: "January" },
    { uz: "Fevral", ru: "Февраль", en: "February" },
    { uz: "Mart", ru: "Март", en: "March" },
    { uz: "Aprel", ru: "Апрель", en: "April" },
    { uz: "May", ru: "Май", en: "May" },
    { uz: "Iyun", ru: "Июнь", en: "June" },
    { uz: "Iyul", ru: "Июль", en: "July" },
    { uz: "Avgust", ru: "Август", en: "August" },
    { uz: "Sentabr", ru: "Сентябрь", en: "September" },
    { uz: "Oktabr", ru: "Октябрь", en: "October" },
    { uz: "Noyabr", ru: "Ноябрь", en: "November" },
    { uz: "Dekabr", ru: "Декабрь", en: "December" },
  ];

  const monthIndex = parseInt(dateString.split("-")[1], 10) - 1;

  return months[monthIndex][lang] || months[monthIndex]?.uz; // default to Uzbek if language not found
}

// for permissions

export const OutputByActiveValue = (value, children) => {
  return value === true ? children : null;
};

export const OutputByRoleFunc = (permissions, role, children) => {
  return permissions.includes(role) ? <>{children}</> : null;
};
