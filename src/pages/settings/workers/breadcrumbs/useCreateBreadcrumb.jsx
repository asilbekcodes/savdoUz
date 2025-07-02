import { RiSettings6Fill, RiTeamFill } from "@remixicon/react";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export const useCreateBreadcrumbItems = () => {
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
      title: <NavLink to={"/settings/workers"}>{t("Xodimlar")}</NavLink>,
    },
    {
      title: t("Qo'shish"),
    },
  ];
};
