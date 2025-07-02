import { RiSettings6Fill } from "@remixicon/react";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";

export const useDetailBreadcrumbItems = () => {
  const { t } = useTranslation();

  return [
    {
      title: (
        <Flex align="center" gap="small">
          <RiSettings6Fill size={20} />
          <span>{t("Sozlamalar")}</span>
        </Flex>
      ),
    },
    {
      title: t("O'chirilgan"),
    },
  ];
};
