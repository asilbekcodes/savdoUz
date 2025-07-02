import { RiShoppingCartFill } from "@remixicon/react";
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
          <RiShoppingCartFill size={20} />
          <span>{t("Buyurtmalar")}</span>
        </Flex>
      ),
    },
    {
      title: <NavLink to={"/orders/orders"}>{t("Buyurtmalar")}</NavLink>,
    },
    {
      title: id,
    },
  ];
};
