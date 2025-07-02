import { RiHomeOfficeFill } from "@remixicon/react";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";
import { NavLink, useParams } from "react-router-dom";

export const useDetailBreadcrumbItems = () => {
  const { t } = useTranslation();

  const { id } = useParams();

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
        <NavLink to={"/storages/suppliers"}>{t("Ta'minotchilar")}</NavLink>
      ),
    },
    {
      title: id,
    },
  ];
};
