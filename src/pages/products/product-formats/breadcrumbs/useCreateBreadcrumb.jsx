import { RiProductHuntFill } from "@remixicon/react";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export const useCreateBreadcrumbItems = () => {
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
      title: (
        <NavLink to={"/products/formats"}>{t("Mahsulot formatlari")}</NavLink>
      ),
    },
    {
      title: t("Qo'shish"),
    },
  ];
};
