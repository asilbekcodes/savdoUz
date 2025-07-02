import CustomTabs from "@/components/atoms/custom-tabs/CustomTabs";
import ErrorResult from "@/components/molecules/error-result/ErrorResult";
import PageLoader from "@/components/molecules/page-loader/PageLoader";
import PageTitle from "@/components/molecules/page-title/PageTitle";
import TitleAndIconText from "@/components/molecules/title-and-icon-text/TitleAndIconText";
import {
  httpGetCompany,
  httpUpdateCompany,
} from "@/services/api/requests/auth.requests";
import useUserStore from "@/store/useUserStore";
import {
  NumberToThousandFormat,
  OutputByRoleFunc,
  formatTimeForUI,
  handleSuccessNotification,
  scrollToTop,
} from "@/utils/helpers";
import {
  RiAwardFill,
  RiCalendarScheduleFill,
  RiCalendarTodoFill,
  RiCashFill,
  RiColorFilterFill,
  RiGovernmentFill,
} from "@remixicon/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Breadcrumb, Card, Col, Flex, Row, Tabs, Tag } from "antd";
import { get } from "lodash";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import OrganizationForm from "./_components/OrganizationForm";
import { useDetailBreadcrumbItems } from "./breadcrumbs/useDetailBreadcrumb";

const OrganizationPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    me: { role },
  } = useUserStore();

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
    isRefetching,
    ...rest
  } = useQuery({
    queryKey: ["company"],
    queryFn: () => httpGetCompany(),
    select: (response) => response.data,
  });

  const BREADCRUMB_ITEMS = useDetailBreadcrumbItems();

  return (
    <>
      <Helmet>
        <title>{t("Tashkilot")}</title>
      </Helmet>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Flex align="center" justify="space-between">
            <PageTitle>{t("Tashkilot")}</PageTitle>
          </Flex>
        </Col>
        <Col span={24}>
          <Breadcrumb items={BREADCRUMB_ITEMS} />
        </Col>
        <Col span={24}>
          {isLoading ? (
            <PageLoader />
          ) : (
            <>
              {error ? (
                <ErrorResult error={error} />
              ) : (
                <>
                  <CustomTabs tabPosition={"top"}>
                    <Tabs.TabPane tab={t("Tashkilot ma'lumotlari")} key="1">
                      <Row gutter={[20, 20]}>
                        <Col xs={24} md={24}>
                          <Card>
                            <Flex vertical gap={"large"}>
                              <TitleAndIconText
                                title={t("Tashkilot nomi").toUpperCase()}
                                value={get(data, "comp_name", "")}
                                icon={<RiGovernmentFill />}
                              />
                              <TitleAndIconText
                                title={t("Valyuta turi").toUpperCase()}
                                value={get(data, "currency_type", "")}
                                icon={<RiCashFill />}
                              />
                              <TitleAndIconText
                                title={t("Ta'rif").toUpperCase()}
                                value={get(data, "tariff", "")}
                                icon={<RiAwardFill />}
                              />

                              <TitleAndIconText
                                title={t("Yaratilgan sana").toUpperCase()}
                                value={formatTimeForUI(
                                  get(data, "created", "")
                                )}
                                icon={<RiCalendarTodoFill />}
                              />
                              <TitleAndIconText
                                title={t("Limit tugash vaqti").toUpperCase()}
                                value={formatTimeForUI(
                                  get(data, "active_days", "")
                                )}
                                icon={<RiCalendarTodoFill />}
                              />
                              <TitleAndIconText
                                title={t("Qolgan kun").toUpperCase()}
                                value={NumberToThousandFormat(
                                  get(data, "range_day", 0),
                                  t("kun")
                                )}
                                icon={<RiCalendarScheduleFill />}
                              />
                              <TitleAndIconText
                                title={t("Holati").toUpperCase()}
                                value={
                                  get(data, "is_active", "") ===
                                  "Qarzdorlik" ? (
                                    <Tag color={"red"}>{t("No faol")}</Tag>
                                  ) : (
                                    <Tag color={"green"}>{t("Faol")}</Tag>
                                  )
                                }
                                icon={<RiColorFilterFill />}
                              />
                            </Flex>
                          </Card>
                        </Col>
                      </Row>
                    </Tabs.TabPane>
                    {OutputByRoleFunc(
                      ["DIRECTOR"],
                      role,
                      <>
                        <Tabs.TabPane
                          tab={t("Ma'lumotlarni o'zgartirish")}
                          key="2"
                        >
                          <UpdateProfile user={data} refetch={refetch} />
                        </Tabs.TabPane>
                      </>
                    )}
                  </CustomTabs>
                </>
              )}
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default OrganizationPage;

const UpdateProfile = ({ user, refetch }) => {
  const { t } = useTranslation();

  const handleSuccess = () => {
    scrollToTop();
    handleSuccessNotification(t("Muvaffaqiyatli bajarildi !"));
    refetch();
  };

  const { isPending, mutateAsync } = useMutation({
    mutationFn: httpUpdateCompany,
    onSuccess: handleSuccess,
    onError: (error) => {
      scrollToTop();
      console.log(error);
    },
  });

  const handleSubmit = async (values, reset) => {
    mutateAsync({
      comp_name: get(values, "comp_name", ""),
      currency_type: get(values, "currency_type", ""),
    });
  };

  return (
    <>
      <OrganizationForm
        handleSubmit={handleSubmit}
        defaultValues={user}
        actionLoading={isPending}
      />
    </>
  );
};
