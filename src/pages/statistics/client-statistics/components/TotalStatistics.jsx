import CustomColumnChart from "@/components/atoms/charts/custom-column-chart/CustomColumnChart";
import CustomStatisticsCard from "@/components/atoms/custom-statistics-card/CustomStatisticsCard";
import CustomDataTable from "@/components/molecules/custom-data-table/CustomDataTable";
import ErrorResult from "@/components/molecules/error-result/ErrorResult";
import PageLoader from "@/components/molecules/page-loader/PageLoader";
import {
  httpGetClientStatisticsTotal,
  httpGetProductStatisticsTotal,
  httpGetTradeStatisticsTotal,
} from "@/services/api/requests/statistics.request";
import useCompanyStore from "@/store/useCompanyStore";
import { NumberToThousandFormat } from "@/utils/helpers";
import {
  RiCashFill,
  RiMoneyDollarBoxFill,
  RiShoppingCartFill,
  RiWallet3Fill,
} from "@remixicon/react";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Flex, Row, Typography } from "antd";
import { get } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const TotalStatitics = () => {
  const { t } = useTranslation();
  const {
    company: { currency_type },
  } = useCompanyStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["client-total"],
    queryFn: httpGetClientStatisticsTotal,
    select: (response) => response.data,
  });

  return (
    <Row gutter={[20, 20]}>
      <Col xs={24}>
        <Flex align="center" justify="space-between">
          <Typography.Title level={5}>
            {t("Umumiy statistika")}
          </Typography.Title>
        </Flex>
      </Col>
      <Col xs={24}>
        {isLoading ? (
          <PageLoader />
        ) : (
          <>
            {error ? (
              <ErrorResult error={error} />
            ) : (
              <>
                <Flex gap={"20px"} vertical>
                  <Row gutter={[20, 20]}>
                    <Col xs={24} md={24}>
                      <GraphByCountTop10 data={data} />
                    </Col>
                    <Col xs={24} md={24}>
                      <DataTableTop10 data={data} />
                    </Col>
                    <Col xs={24} md={24}>
                      <DataTableAllProducts data={data} />
                    </Col>
                  </Row>
                </Flex>
              </>
            )}
          </>
        )}
      </Col>
    </Row>
  );
};

export default TotalStatitics;

const DataTableTop10 = ({ data }) => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("Nomi"),
      dataIndex: "client_name",
    },
    {
      title: t("Savdolar soni"),
      dataIndex: "total_count",
      render: (value, row) => {
        return <>{NumberToThousandFormat(value, t("ta"))}</>;
      },
      sorter: (a, b) => a.total_count - b.total_count,
    },
    {
      title: t("Savdolar summasi"),
      dataIndex: "total_summa",
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>;
      },
      sorter: (a, b) => a.total_summa - b.total_summa,
    },
  ];

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const DATA = get(data, "top_10_clients", []).map((item, index) => ({
      ...item,
    }));
    setTableData(DATA);
  }, [data]);

  return (
    <CustomDataTable
      title={t("Top 10 mijozlar")}
      dataSource={tableData}
      columns={columns}
      pagination={false}
    />
  );
};

const GraphByCountTop10 = ({ data }) => {
  const { t } = useTranslation();

  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const DATA = get(data, "top_10_clients", []).map((item, index) => ({
      type: item.client_name,
      value: item.total_summa,
    }));
    setGraphData(DATA);
  }, [data]);

  const config = {
    data: graphData,
  };

  return (
    <Card title={t("Top 10 mijozlar (savdo summasi bo'yicha)")}>
      <CustomColumnChart config={config} />
    </Card>
  );
};

const DataTableAllProducts = ({ data }) => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("Nomi"),
      dataIndex: "client_name",
    },
    {
      title: t("Savdolar soni"),
      dataIndex: "total_count",
      render: (value, row) => {
        return <>{NumberToThousandFormat(value, t("ta"))}</>;
      },
      sorter: (a, b) => a.total_count - b.total_count,
    },
    {
      title: t("Savdolar summasi"),
      dataIndex: "total_summa",
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>;
      },
      sorter: (a, b) => a.total_summa - b.total_summa,
    },
  ];
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const DATA = get(data, "client_stats", []).map((item, index) => ({
      ...item,
    }));
    setTableData(DATA);
  }, [data]);

  return (
    <CustomDataTable
      title={t("Barcha mijozlar")}
      dataSource={tableData}
      columns={columns}
      pagination={true}
    />
  );
};
