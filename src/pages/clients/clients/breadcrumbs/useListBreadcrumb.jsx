import { RiTeamFill } from "@remixicon/react";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";

export const useListBreadcrumbItems = () => {
  const { t } = useTranslation();

  return [
    {
      title: (
        <Flex align="center" gap="small">
          <RiTeamFill size={20} />
          <span>{t("Mijozlar")}</span>
        </Flex>
      ),
    },
    {
      title: t("Mijozlar"),
    },
  ];
};
