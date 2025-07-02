import { RiBarChartBoxFill, RiTeamFill } from "@remixicon/react";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";

export const useFinanceBreadcrumbItems = () => {
  const { t } = useTranslation();

  return [
    {
      title: (
        <Flex align="center" gap="small">
          <RiBarChartBoxFill size={20} />
          <span>{t("Statistika")}</span>
        </Flex>
      ),
    },
    {
      title: t("Moliya statistikasi"),
    },
  ];
};
