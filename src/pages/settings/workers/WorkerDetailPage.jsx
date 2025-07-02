import BackButton from "@/components/atoms/back-button/BackButton";
import ErrorResult from "@/components/molecules/error-result/ErrorResult";
import PageLoader from "@/components/molecules/page-loader/PageLoader";
import PageTitle from "@/components/molecules/page-title/PageTitle";
import TitleAndIconText from "@/components/molecules/title-and-icon-text/TitleAndIconText";
import { httpGetWorkerOne } from "@/services/api/requests/workers.requests";
import { formatTimeForUI } from "@/utils/helpers";
import {
  RiCalendarTodoFill,
  RiCheckFill,
  RiCloseFill,
  RiColorFilterFill,
  RiMailFill,
  RiPhoneFill,
  RiUser2Fill,
} from "@remixicon/react";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Card, Col, Flex, Row } from "antd";
import { get } from "lodash";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useDetailBreadcrumbItems } from "./breadcrumbs/useDetailBreadcrumb";

const WorkerDetailPage = () => {
  const { id } = useParams();

  const { t } = useTranslation();

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
    queryKey: ["worker-one", id],
    queryFn: () => httpGetWorkerOne(id),
    select: (response) => response.data,
  });

  const BREADCRUMB_ITEMS = useDetailBreadcrumbItems();

  return (
    <>
      <Helmet>
        <title>{t("Ishchi")}</title>
      </Helmet>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Flex align="center" justify="space-between">
            <PageTitle>{t("Ishchi")}</PageTitle>
            <BackButton />
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
                  <Row gutter={[20, 20]}>
                    <Col xs={24} md={12}>
                      <Card title={t("Ishchi ma'lumotlari")}>
                        <Flex vertical gap={"large"}>
                          <TitleAndIconText
                            title={t("Ism").toUpperCase()}
                            value={get(data, "first_name", "")}
                            icon={<RiUser2Fill />}
                          />
                          <TitleAndIconText
                            title={t("Familiya").toUpperCase()}
                            value={get(data, "last_name", "")}
                            icon={<RiUser2Fill />}
                          />
                          <TitleAndIconText
                            title={t("Telefon").toUpperCase()}
                            value={get(data, "username", "")}
                            icon={<RiPhoneFill />}
                          />
                          <TitleAndIconText
                            title={t("Email").toUpperCase()}
                            value={get(data, "email", "")}
                            icon={<RiMailFill />}
                          />
                          <TitleAndIconText
                            title={t("Qo'shilgan vaqti").toUpperCase()}
                            value={formatTimeForUI(
                              get(data, "date_joined", "")
                            )}
                            icon={<RiCalendarTodoFill />}
                          />
                        </Flex>
                      </Card>
                    </Col>
                    <Col xs={24} md={12}>
                      <Card title={t("Ruxsatlar")}>
                        <Flex vertical gap={"large"}>
                          <TitleAndIconText
                            title={t("Faol").toUpperCase()}
                            value={
                              get(data, "is_active", false) ? (
                                <RiCheckFill style={{ color: "green" }} />
                              ) : (
                                <RiCloseFill style={{ color: "red" }} />
                              )
                            }
                            icon={<RiColorFilterFill />}
                          />
                          <TitleAndIconText
                            title={t("Savdo").toUpperCase()}
                            value={
                              get(data, "is_trade", false) ? (
                                <RiCheckFill style={{ color: "green" }} />
                              ) : (
                                <RiCloseFill style={{ color: "red" }} />
                              )
                            }
                            icon={<RiColorFilterFill />}
                          />
                          <TitleAndIconText
                            title={t("Mijoz").toUpperCase()}
                            value={
                              get(data, "is_client", false) ? (
                                <RiCheckFill style={{ color: "green" }} />
                              ) : (
                                <RiCloseFill style={{ color: "red" }} />
                              )
                            }
                            icon={<RiColorFilterFill />}
                          />
                          <TitleAndIconText
                            title={t("Statistika").toUpperCase()}
                            value={
                              get(data, "is_statistics", false) ? (
                                <RiCheckFill style={{ color: "green" }} />
                              ) : (
                                <RiCloseFill style={{ color: "red" }} />
                              )
                            }
                            icon={<RiColorFilterFill />}
                          />
                          <TitleAndIconText
                            title={t("Ombor").toUpperCase()}
                            value={
                              get(data, "is_storage", false) ? (
                                <RiCheckFill style={{ color: "green" }} />
                              ) : (
                                <RiCloseFill style={{ color: "red" }} />
                              )
                            }
                            icon={<RiColorFilterFill />}
                          />
                        </Flex>
                      </Card>
                    </Col>
                  </Row>
                </>
              )}
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default WorkerDetailPage;
