import BackButton from "@/components/atoms/back-button/BackButton";
import CustomTabs from "@/components/atoms/custom-tabs/CustomTabs";
import PageTitle from "@/components/molecules/page-title/PageTitle";
import { Breadcrumb, Col, Flex, Row, Tabs } from "antd";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useFinanceBreadcrumbItems } from "../breadcrumbs/useFinanceBreadcrumb";
import DailyStatitics from "./components/DailyStatistics";
import MonthlyStatitics from "./components/MonthlyStatistics";
import TotalStatitics from "./components/TotalStatistics";
import YearlyStatitics from "./components/YearlyStatistics";

const ServiceStatisticsPage = () => {
  const { t } = useTranslation();

  const BREADCRUMB_ITEMS = useFinanceBreadcrumbItems();

  return (
    <>
      <Helmet>
        <title>{t("Xizmatlar statistikasi")}</title>
      </Helmet>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Flex align="center" justify="space-between">
            <PageTitle>{t("Xizmatlar statistikasi")}</PageTitle>
            <Flex gap={"middle"}>
              <BackButton />
            </Flex>
          </Flex>
        </Col>
        <Col span={24}>
          <Breadcrumb items={BREADCRUMB_ITEMS} />
        </Col>
        <Col span={24}>
          <CustomTabs tabPosition={"top"}>
            <Tabs.TabPane tab={t("Umumiy")} key="1">
              <TotalStatitics />
            </Tabs.TabPane>
            <Tabs.TabPane tab={t("Kunlik")} key="2">
              <DailyStatitics />
            </Tabs.TabPane>
            <Tabs.TabPane tab={t("Oylik")} key="4">
              <MonthlyStatitics />
            </Tabs.TabPane>
            <Tabs.TabPane tab={t("Yillik")} key="3">
              <YearlyStatitics />
            </Tabs.TabPane>
          </CustomTabs>
        </Col>
      </Row>
    </>
  );
};

export default ServiceStatisticsPage;
