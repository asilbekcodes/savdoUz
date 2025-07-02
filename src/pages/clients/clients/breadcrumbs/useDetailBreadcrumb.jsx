import { RiTeamFill } from "@remixicon/react";
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
          <RiTeamFill size={20} />
          <span>{t("Mijozlar")}</span>
        </Flex>
      ),
    },
    {
      title: <NavLink to={"/clients/clients"}>{t("Mijozlar")}</NavLink>,
    },
    {
      title: id,
    },
  ];
};
