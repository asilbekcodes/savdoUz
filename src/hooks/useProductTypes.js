import { useTranslation } from "react-i18next";

const useProductTypes = () => {
  const { t } = useTranslation();
  return [
    { text: t("Sanaladigan"), value: "Sanaladigan" },
    { text: t("Sanalmaydigan"), value: "Sanalmaydigan" },
  ];
};

export default useProductTypes;
