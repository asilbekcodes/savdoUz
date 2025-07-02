import { useTranslation } from "react-i18next";

const useSizeType = () => {
  const { t } = useTranslation();
  return [
    { text: t("O'lchovsiz"), value: "O'lchovsiz" },
    { text: t("O'lchovli"), value: "O'lchovli" },
    { text: t("Formatli"), value: "Formatli" },
  ];
};

export default useSizeType;
