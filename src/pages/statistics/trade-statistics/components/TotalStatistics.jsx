import CustomStatisticsCard from "@/components/atoms/custom-statistics-card/CustomStatisticsCard";
import ErrorResult from "@/components/molecules/error-result/ErrorResult";
import PageLoader from "@/components/molecules/page-loader/PageLoader";
import { httpGetTradeStatisticsTotal } from "@/services/api/requests/statistics.request";
import useCompanyStore from "@/store/useCompanyStore";
import {
  RiCashFill,
  RiMoneyDollarBoxFill,
  RiShoppingCartFill
} from "@remixicon/react";
import { useQuery } from "@tanstack/react-query";
import { Col, Flex, Row, Typography } from "antd";
import { get } from "lodash";
import { useTranslation } from "react-i18next";

const TotalStatitics = () => {
  const { t } = useTranslation();
  const {
    company: { currency_type },
  } = useCompanyStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["trade-total"],
    queryFn: httpGetTradeStatisticsTotal,
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
                    <Col xs={24} md={8}>
                      <CustomStatisticsCard
                        title={
                          <Typography.Title level={4}>
                            {t("Savdolar soni")}
                          </Typography.Title>
                        }
                        value={get(data, "total_trades", 0)}
                        precision={2}
                        prefix={<RiShoppingCartFill />}
                        suffix={t("ta")}
                      />
                    </Col>
                    <Col xs={24} md={8}>
                      <CustomStatisticsCard
                        title={
                          <Typography.Title level={4}>
                            {t("Savdolar summasi")}
                          </Typography.Title>
                        }
                        value={get(data, "total_trade_summa", 0)}
                        precision={2}
                        prefix={<RiMoneyDollarBoxFill />}
                        suffix={currency_type}
                      />
                    </Col>
                    <Col xs={24} md={8}>
                      <CustomStatisticsCard
                        title={
                          <Typography.Title level={4}>
                            {t("To'lovlar")}
                          </Typography.Title>
                        }
                        value={get(data, "total_payments", 0)}
                        precision={2}
                        prefix={<RiCashFill />}
                        suffix={currency_type}
                      />
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
