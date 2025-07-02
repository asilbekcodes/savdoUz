import { useTranslation } from "react-i18next";

const useClientRole = () => {
  const { t } = useTranslation();
  return [
    { text: t("Director"), label: t("Director"), value: "DIRECTOR" },
    { text: t("Manager"), label: t("Manager"), value: "MANAGER" },
    { text: t("Yetkazib beruvchi"), label: t("Yetkazib beruvchi"), value: "DELIVER" },
    { text: t("Sklatchi"), label: t("Sklatchi"), value: "SHOPKEEPER" },
    { text: t("Do'kon egasi"), label: t("Do'kon egasi"), value: "CLIENT" },
  ];
};

export default useClientRole;
