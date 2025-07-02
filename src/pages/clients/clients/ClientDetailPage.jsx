import BackButton from "@/components/atoms/back-button/BackButton";
import ClearFilterButton from "@/components/atoms/clear-filter-button/ClearFilterButton";
import CreateButton from "@/components/atoms/create-button/CreateButton";
import CustomTabs from "@/components/atoms/custom-tabs/CustomTabs";
import CardTitle from "@/components/molecules/card-title/CardTitle";
import CustomDataTable from "@/components/molecules/custom-data-table/CustomDataTable";
import CustomModalConfirm from "@/components/molecules/custom-modal-confirm/CustomModalConfirm";
import ErrorResult from "@/components/molecules/error-result/ErrorResult";
import GlobalSearchInput from "@/components/molecules/global-search-input/GlobalSearchInput";
import PageLoader from "@/components/molecules/page-loader/PageLoader";
import PageTitle from "@/components/molecules/page-title/PageTitle";
import TitleAndIconText from "@/components/molecules/title-and-icon-text/TitleAndIconText";
import { useTradeColumns } from "@/pages/trades/trades/useTradeColumns";
import { httpGetClientOne } from "@/services/api/requests/clients.requests";
import {
  httpDeletePaymentTrade,
  httpGetTrades,
} from "@/services/api/requests/trade.requests";
import {
  NumberToThousandFormat,
  formatTimeForUI,
  handleSuccessNotification,
  objectToQueryString,
} from "@/utils/helpers";
import { DeleteFilled } from "@ant-design/icons";
import {
  RiCalendarTodoFill,
  RiColorFilterFill,
  RiListSettingsFill,
  RiPhoneFill,
  RiRefundLine,
  RiSlideshowLine,
  RiStackFill,
  RiUser2Fill,
} from "@remixicon/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Image,
  Row,
  Tabs,
  Tag,
} from "antd";
import { get } from "lodash";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import AddPaymentForClient from "./_components/add-payment-for-client/AddPaymentForClient";
import { useDetailBreadcrumbItems } from "./breadcrumbs/useDetailBreadcrumb";

const ClientDetailPage = () => {
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
    queryKey: ["client-one", id],
    queryFn: () => httpGetClientOne(id),
    select: (response) => response.data,
  });

  const BREADCRUMB_ITEMS = useDetailBreadcrumbItems();

  return (
    <>
      <Helmet>
        <title>{t("Mijoz")}</title>
      </Helmet>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Flex align="center" justify="space-between">
            <PageTitle>{t("Mijoz")}</PageTitle>
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
                  <CustomTabs tabPosition={"top"}>
                    <Tabs.TabPane tab={t("Umumiy ma'lumotlar")} key="1">
                      <Row gutter={[20, 20]}>
                        <Col xs={24} md={16}>
                          <Card>
                            <Flex vertical gap={"large"}>
                              <TitleAndIconText
                                title={t("Mijoz").toUpperCase()}
                                value={get(data, "name", "")}
                                icon={<RiUser2Fill />}
                              />
                              <TitleAndIconText
                                title={t("Telefon").toUpperCase()}
                                value={get(data, "phone", "")}
                                icon={<RiPhoneFill />}
                              />
                              <TitleAndIconText
                                title={t("Mijoz turi").toUpperCase()}
                                value={get(data, "client_type", "")}
                                icon={<RiStackFill />}
                              />
                              <TitleAndIconText
                                title={t("Sana").toUpperCase()}
                                value={formatTimeForUI(get(data, "added", ""))}
                                icon={<RiCalendarTodoFill />}
                              />
                              {get(data, "desc", "") ? (
                                <TitleAndIconText
                                  title={t("Izoh").toUpperCase()}
                                  value={get(data, "desc", "")}
                                  icon={<RiSlideshowLine />}
                                />
                              ) : (
                                ""
                              )}

                              <div style={{ marginTop: "20px" }}>
                                <Image
                                  width={"100%"}
                                  src={get(data, "image", "")}
                                  alt="Client Image"
                                  placeholder={
                                    <Image
                                      preview={false}
                                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                                      width={"100%"}
                                    />
                                  }
                                  fallback="data:image/png;base64,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"
                                />
                              </div>
                            </Flex>
                          </Card>
                        </Col>
                        <Col xs={24} md={8}>
                          <Card
                            title={
                              <CardTitle title={t("To'lov ma'lumotlari")} />
                            }
                          >
                            <Flex vertical gap={"large"}>
                              <TitleAndIconText
                                title={t("Qarzdorlik").toUpperCase()}
                                value={NumberToThousandFormat(
                                  get(data, "debt_balance", 0)
                                )}
                                icon={<RiRefundLine />}
                              />
                              <Divider style={{ margin: "0" }} />
                              <TitleAndIconText
                                title={t("Holati").toUpperCase()}
                                value={
                                  get(data, "status", "") === "Qarzdorlik" ? (
                                    <Tag color={"red"}>
                                      {t("Qardorlik")} (
                                      {NumberToThousandFormat(
                                        get(data, "debt_balance", "")
                                      )}
                                      )
                                    </Tag>
                                  ) : (
                                    <Tag color={"green"}>{t("To'langan")}</Tag>
                                  )
                                }
                                icon={<RiColorFilterFill />}
                              />
                              {get(data, "status", "") === "Qarzdorlik" && (
                                <AddPaymentForClient
                                  summa={get(data, "debt_balance", "")}
                                  refetch={refetch}
                                  item={data}
                                />
                              )}
                            </Flex>
                          </Card>
                        </Col>
                      </Row>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={t("Savdolar")} key="2">
                      <Trades
                        client={get(data, "id", "")}
                        clientRefetch={refetch}
                      />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={t("To'lovlar")} key="4">
                      <Row gutter={[20, 20]}>
                        <Col xs={24} md={16}>
                          <Payments
                            data={get(data, "payments", [])}
                            refetch={refetch}
                          />
                        </Col>
                        <Col xs={24} md={8}>
                          <Card
                            title={
                              <CardTitle title={t("To'lov ma'lumotlari")} />
                            }
                          >
                            <Flex vertical gap={"large"}>
                              <TitleAndIconText
                                title={t("Qarzdorlik").toUpperCase()}
                                value={NumberToThousandFormat(
                                  get(data, "debt_balance", 0)
                                )}
                                icon={<RiRefundLine />}
                              />
                              <Divider style={{ margin: "0" }} />
                              <TitleAndIconText
                                title={t("Holati").toUpperCase()}
                                value={
                                  get(data, "status", "") === "Qarzdorlik" ? (
                                    <Tag color={"red"}>
                                      {t("Qardorlik")} (
                                      {NumberToThousandFormat(
                                        get(data, "debt_balance", "")
                                      )}
                                      )
                                    </Tag>
                                  ) : (
                                    <Tag color={"green"}>{t("To'langan")}</Tag>
                                  )
                                }
                                icon={<RiColorFilterFill />}
                              />
                              {get(data, "status", "") === "Qarzdorlik" && (
                                <AddPaymentForClient
                                  summa={get(data, "debt_balance", "")}
                                  refetch={refetch}
                                  item={data}
                                />
                              )}
                            </Flex>
                          </Card>
                        </Col>
                      </Row>
                    </Tabs.TabPane>
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

export default ClientDetailPage;

const Trades = ({ client, clientRefetch }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: null,
  });

  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState("");

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
    queryKey: [
      "storage-products",
      {
        page: pagination.current,
        pageSize: pagination.pageSize,
        filters: filters,
      },
    ],
    queryFn: () =>
      httpGetTrades(
        pagination.current,
        pagination.pageSize,
        objectToQueryString({ client, ...filters })
      ),
    select: (response) => response.data,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data) {
      setPagination((prevPagination) => ({
        ...prevPagination,
        current: data.current || 1,
        pageSize: data.pageSize || 10,
        total: data.total || "",
      }));
    }
  }, [data]);

  const handleTableChange = (newPagination, tabelFilters) => {
    setPagination({
      ...newPagination,
    });
    setFilters(tabelFilters);
  };

  const clearFilters = () => {
    setFilters({});
    setSearch("");
  };

  const handleOnSearch = (value) => {
    setFilters({ ...filters, search: value });
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleRefetch = () => {
    refetch();
    clientRefetch();
  };

  const TABLE_COLUMNS = useTradeColumns(
    pagination,
    filters,
    setFilters,
    handleRefetch
  ).filter((item) => item.key !== "client");

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Row gutter={[20, 20]}>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <GlobalSearchInput
                value={search}
                enterButton
                onSearch={handleOnSearch}
                onChange={handleChangeSearch}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={18} xl={18}>
              <Flex align="center" justify="end" gap="middle">
                <ClearFilterButton onClick={clearFilters} />
                <CreateButton
                  onClick={() => navigate("/trades/trade-create")}
                />
              </Flex>
            </Col>
            <Col span={24}>
              <CustomDataTable
                columns={TABLE_COLUMNS}
                data={data?.results || []}
                pagination={pagination}
                loading={isLoading || isRefetching}
                onChange={handleTableChange}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

function Payments({ data, refetch }) {
  const { t } = useTranslation();

  const deleteMutate = useMutation({
    mutationFn: httpDeletePaymentTrade,
    onSuccess: () => {
      handleSuccessNotification(t("Muvaffaqiyatli bajarildi !"));
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDelete = (id) => {
    deleteMutate.mutate(id);
  };

  const columns = [
    {
      title: t("#"),
      dataIndex: "index",
      key: "index",
      render: (value, item, index) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: t("Savdo"),
      dataIndex: "trade",
      key: "trade",
      render: (value) => {
        return (
          <>
            <NavLink to={`/trades/trades/${value}`}>{t("Ko'rish")}</NavLink>
          </>
        );
      },
    },
    {
      title: t("Naqt"),
      dataIndex: "cash",
      key: "cash",
      hidden: true,
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>;
      },
    },
    {
      title: t("Karta"),
      dataIndex: "card",
      key: "card",
      hidden: true,
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>;
      },
    },
    {
      title: t("Boshqa"),
      dataIndex: "other",
      key: "other",
      hidden: true,
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>;
      },
    },
    {
      title: t("Jami summa"),
      dataIndex: "total",
      key: "total",
      render: (value, row) => {
        return <>{NumberToThousandFormat(row.cash + row.card + row.other)}</>;
      },
    },
    {
      title: t("Sana"),
      dataIndex: "date",
      key: "date",
      render: (value) => {
        return <>{formatTimeForUI(value)}</>;
      },
    },
    {
      title: <RiListSettingsFill size={15} />,
      dataIndex: "id",
      key: "operation",
      align: "center",
      width: 50,
      render: (id) => (
        <Flex align="center" justify="space-between" gap={"small"}>
          <CustomModalConfirm
            trigger={<Button danger icon={<DeleteFilled />} />}
            onOk={() => handleDelete(id)}
          />
        </Flex>
      ),
    },
  ];

  return (
    <CustomDataTable title={t("To'lovlar")} data={data} columns={columns} />
  );
}
