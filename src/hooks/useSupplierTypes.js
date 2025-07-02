import { useTranslation } from "react-i18next";

const useSupplierTypes = () => {
  const { t } = useTranslation();
  return [
    { text: t("Tezkor"), label: t("Tezkor"), value: "Tezkor" },
    { text: t("Doimiy"), label: t("Doimiy"), value: "Doimiy" },
  ];
};

export default useSupplierTypes;
