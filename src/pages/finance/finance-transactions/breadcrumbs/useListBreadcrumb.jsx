import { RiBankFill, RiProductHuntFill } from "@remixicon/react";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";

export const useListBreadcrumbItems = () => {
  const { t } = useTranslation();

  return [
    {
      title: (
        <Flex align="center" gap="small">
          <RiBankFill size={20} />
          <span>{t("Moliya")}</span>
        </Flex>
      ),
    },
    {
      title: t("Tranzaktsiyalar"),
    },
  ];
};
