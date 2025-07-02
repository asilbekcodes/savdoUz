import { RiProductHuntFill } from "@remixicon/react";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";

export const useListBreadcrumbItems = () => {
  const { t } = useTranslation();

  return [
    {
      title: (
        <Flex align="center" gap="small">
          <RiProductHuntFill size={20} />
          <span>{t("Mahsulot")}</span>
        </Flex>
      ),
    },
    {
      title: t("Mahsulot formatlari"),
    },
  ];
};
