import { RiHomeOfficeFill, RiProductHuntFill } from "@remixicon/react";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";

export const useListBreadcrumbItems = () => {
  const { t } = useTranslation();

  return [
    {
      title: (
        <Flex align="center" gap="small">
          <RiHomeOfficeFill size={20} />
          <span>{t("Omborxona")}</span>
        </Flex>
      ),
    },
    {
      title: t("Ta'minotchilar"),
    },
  ];
};
