import { RiShoppingCartFill } from "@remixicon/react";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";
import { NavLink, useParams } from "react-router-dom";

export const useUpdateBreadcrumbItems = () => {
  const { t } = useTranslation();

  const { id } = useParams();

  return [
    {
      title: (
        <Flex align="center" gap="small">
          <RiShoppingCartFill size={20} />
          <span>{t("Savdo")}</span>
        </Flex>
      ),
    },
    {
      title: <NavLink to={"/trades/trades"}>{t("Savdolar")}</NavLink>,
    },
    {
      title: t("Tahrirlash"),
    },
    {
      title: id,
    },
  ];
};
