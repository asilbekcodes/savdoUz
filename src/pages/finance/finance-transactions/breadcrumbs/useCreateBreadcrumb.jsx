import { RiBankFill, RiProductHuntFill } from "@remixicon/react";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export const useCreateBreadcrumbItems = () => {
  const { t } = useTranslation();

  return [
    {
      title: (
        <Flex align="center" gap="small">
          <RiBankFill size={20} />
          <span>{t("Moliya")}</span>
        </Flex>
      ),
    },
    {
      title: (
        <NavLink to={"/finance/finance-transactions"}>
          {t("Tranzaktsiyalar")}
        </NavLink>
      ),
    },
    {
      title: t("Qo'shish"),
    },
  ];
};
