import { RiShoppingCartFill } from "@remixicon/react";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";

export const useListBreadcrumbItems = () => {
  const { t } = useTranslation();

  return [
    {
      title: (
        <Flex align="center" gap="small">
          <RiShoppingCartFill size={20} />
          <span>{t("Buyurtmalar")}</span>
        </Flex>
      ),
    },
    {
      title: t("Buyurtmalar"),
    },
  ];
};
