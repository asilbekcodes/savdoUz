import CustomColumnChart from "@/components/atoms/charts/custom-column-chart/CustomColumnChart";
import CustomLineChart from "@/components/atoms/charts/custom-line-chart/CustomLineChart";
import CustomPieChart from "@/components/atoms/charts/custom-pie-chart/CustomPieChart";
import CustomStatisticsCard from "@/components/atoms/custom-statistics-card/CustomStatisticsCard";
import CustomDatePicker from "@/components/atoms/form-elements/custom-date-picker/CustomDatePicker";
import CustomDataTable from "@/components/molecules/custom-data-table/CustomDataTable";
import ErrorResult from "@/components/molecules/error-result/ErrorResult";
import PageLoader from "@/components/molecules/page-loader/PageLoader";
import {
  httpGetFinanceStatisticsDaily,
  httpGetTradeStatisticsDaily,
} from "@/services/api/requests/statistics.request";
import useCompanyStore from "@/store/useCompanyStore";
import { NumberToThousandFormat } from "@/utils/helpers";
import {
  RiCalendarScheduleFill,
  RiCashFill,
  RiMoneyDollarBoxFill,
  RiShoppingCartFill,
} from "@remixicon/react";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Flex, Row, Typography } from "antd";
import dayjs from "dayjs";
import { get } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const DailyStatitics = () => {
  const { t } = useTranslation();
  const {
    company: { currency_type },
  } = useCompanyStore();

  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD")); // Boshlang'ich qiymat hozirgi sana

  const { data, isLoading, error } = useQuery({
    queryKey: ["finance-daily", date],
    queryFn: () => httpGetFinanceStatisticsDaily(date),
    select: (response) => response.data,
    enabled: !!date, // date mavjud bo'lsa, query ni faollashtirish
  });

  return (
    <Row gutter={[20, 20]}>
      <Col xs={24}>
        <Flex align="center" justify="space-between">
          <Typography.Title level={5}>{t("Kunlik statistika")}</Typography.Title>
          <CustomDatePicker
            style={{ width: "200px" }}
            picker="day"
            value={dayjs(date)}
            format="YYYY-MM-DD"
            onChange={(date, dateString) => {
              setDate(dateString);
            }}
          />
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
                    <Col xs={24} md={6}>
                      <CustomStatisticsCard
                        title={
                          <Typography.Title level={4}>
                            {t("Sana")}
                          </Typography.Title>
                        }
                        value={date}
                        formatter={(value) => `${value}`}
                        prefix={<RiCalendarScheduleFill />}
                      />
                    </Col>

                    <Col xs={24} md={6}>
                      <CustomStatisticsCard
                        title={
                          <Typography.Title level={4}>
                            {t("Xarajatlar summasi")}
                          </Typography.Title>
                        }
                        value={get(data, "total_summa", 0)}
                        precision={2}
                        prefix={<RiMoneyDollarBoxFill />}
                        suffix={currency_type}
                      />
                    </Col>
                    <Col xs={24} md={24}>
                      <GraphBySumma data={data} />
                    </Col>
                    <Col xs={24} md={24}>
                      <DataTable data={data} />
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

export default DailyStatitics;

const GraphBySumma = ({ data }) => {
  const { t } = useTranslation();

  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const DATA = get(data, "transactions", []).map((item, index) => ({
      type: item.transaction_name,
      value: item.total_summa,
    }));
    setGraphData(DATA);
  }, [data]);

  const config = {
    data: graphData,
  };

  return (
    <Card title={t("Xarajatlar summasi (tranzaktsiyalar bo'yicha)")}>
      <CustomColumnChart config={config} />
    </Card>
  );
};

const DataTable = ({ data }) => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("Tranzaktsiya nomi"),
      dataIndex: "transaction_name",
    },
    {
      title: t("Soni"),
      dataIndex: "total_count",
      render: (value) => {
        return <>{NumberToThousandFormat(value, t("ta"))}</>;
      },
      sorter: (a, b) => a.total_count - b.total_count,
    },
    {
      title: t("Summa"),
      dataIndex: "total_summa",
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>;
      },
      sorter: (a, b) => a.total_summa - b.total_summa,
    },
  ];

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const DATA = get(data, "transactions", []).map((item, index) => ({
      ...item,
    }));
    setTableData(DATA);
  }, [data]);

  return (
    <CustomDataTable
      title={t("Xarajatlar (tranzaktsiyalar bo'yicha)")}
      dataSource={tableData}
      columns={columns}
      pagination={false}
    />
  );
};
