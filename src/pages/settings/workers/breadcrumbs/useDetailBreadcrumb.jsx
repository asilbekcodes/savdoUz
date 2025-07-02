import { RiSettings6Fill } from "@remixicon/react";
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
          <RiSettings6Fill size={20} />
          <span>{t("Sozlamalar")}</span>
        </Flex>
      ),
    },
    {
      title: <NavLink to={"/settings/workers"}>{t("Xodimlar")}</NavLink>,
    },
    {
      title: id,
    },
  ];
};
