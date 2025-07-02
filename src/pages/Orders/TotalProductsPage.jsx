import React from "react";
import {
  Table,
  Card,
  Typography,
  Spin,
  Row,
  Flex,
  Col,
  Breadcrumb,
} from "antd";
import { useTranslation } from "react-i18next";
import { NumberToThousandFormat } from "@/utils/helpers.jsx";
import { useQuery } from "@tanstack/react-query";
import { httpTotalProducts } from "@/services/api/requests/order.request";
import PageTitle from "@/components/molecules/page-title/PageTitle";
import BackButton from "@/components/atoms/back-button/BackButton";
import CustomDataTable from "@/components/molecules/custom-data-table/CustomDataTable";
import { useTotalBreadcrumb } from "./breadcrumbs/useTotalBreadcrumb";

const TotalProductsPage = () => {
  const { t } = useTranslation();

  const { data: totalProducts = [], isLoading } = useQuery({
    queryKey: ["totalProducts"],
    queryFn: () => httpTotalProducts(),
    select: (response) => response.data,
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("Nomi"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("Umumiy miqdor"),
      dataIndex: "total_count",
      key: "total_count",
    },
    {
      title: t("Umumiy summa"),
      dataIndex: "total_sum",
      key: "total_sum",
      render: (value) => NumberToThousandFormat(value),
    },
    {
      title: t("Mijozlar"),
      dataIndex: "clients",
      key: "clients",
      hidden: true,
      render: (clients) => (
        <ul style={{ paddingLeft: "20px", margin: 0 }}>
          {clients?.map((client) => (
            <li key={client.id}>
              {client.name || t("Nomsiz")} - {client.total_count} {t("ta")}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  const BREADCRUMB_ITEMS = useTotalBreadcrumb();

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Flex align="center" justify="space-between">
            <PageTitle>{t("Jami buyurtmalar")}</PageTitle>
            <BackButton />
          </Flex>
        </Col>
        <Col span={24}>
          <Breadcrumb items={BREADCRUMB_ITEMS} />
        </Col>
        <Col span={24}>
          <CustomDataTable
            columns={columns}
            data={totalProducts}
            loading={isLoading}
            pagination={{
              current: 1,
              pageSize: 10,
              total: totalProducts.length,
              showSizeChanger: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} / ${total}`,
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default TotalProductsPage;
