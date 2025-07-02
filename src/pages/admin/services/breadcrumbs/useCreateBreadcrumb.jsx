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
          <span>{t("Asosiy")}</span>
        </Flex>
      ),
    },
    {
      title: <NavLink to={"/admin/services"}>{t("Xizmatlar")}</NavLink>,
    },
    {
      title: t("Xizmat qo'shish"),
    },
  ];
};
