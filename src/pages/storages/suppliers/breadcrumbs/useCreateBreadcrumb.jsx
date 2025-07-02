import { RiHomeOfficeFill } from "@remixicon/react";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export const useCreateBreadcrumbItems = () => {
  const { t } = useTranslation();

  return [
    {
      title: (
        <Flex align="center" gap="small">
          <RiHomeOfficeFill size={20} />
          <span>{t("Asosiy")}</span>
        </Flex>
      ),
    },
    {
      title: (
        <NavLink to={"/storages/suppliers"}>{t("Ta'minotchilar")}</NavLink>
      ),
    },
    {
      title: t("Qo'shish"),
    },
  ];
};
