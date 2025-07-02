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
          <span>{t("Omborxona")}</span>
        </Flex>
      ),
    },
    {
      title: (
        <NavLink to={"/storages/storage-products"}>
          {t("Omborga mahsulot")}
        </NavLink>
      ),
    },
    {
      title: t("Qo'shish"),
    },
  ];
};
