import ClearFilterButton from "@/components/atoms/clear-filter-button/ClearFilterButton";
import CustomTabs from "@/components/atoms/custom-tabs/CustomTabs";
import CustomDataTable from "@/components/molecules/custom-data-table/CustomDataTable";
import GlobalSearchInput from "@/components/molecules/global-search-input/GlobalSearchInput";
import PageTitle from "@/components/molecules/page-title/PageTitle";
import { httpGetDeletedClients } from "@/services/api/requests/clients.requests";
import { httpGetDeletedProducts } from "@/services/api/requests/products.requests";
import { objectToQueryString } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Col, Flex, Row, Tabs } from "antd";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDetailBreadcrumbItems } from "./breadcrumbs/useDetailBreadcrumb";
import { useDeleteClientColumns } from "./useDeleteClientColumns";
import { useDeleteProductColumns } from "./useDeleteProductColumns";

const DeleteBasketPage = () => {
  const { t } = useTranslation();

  const BREADCRUMB_ITEMS = useDetailBreadcrumbItems();

  return (
    <>
      <Helmet>
        <title>{t("O'chirilgan")}</title>
      </Helmet>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Flex align="center" justify="space-between">
            <PageTitle>{t("O'chirilgan")}</PageTitle>
          </Flex>
        </Col>
        <Col span={24}>
          <Breadcrumb items={BREADCRUMB_ITEMS} />
        </Col>
        <Col span={24}>
          <>
            <CustomTabs tabPosition={"top"}>
              <Tabs.TabPane tab={t("Mahsulotlar")} key="1">
                <Products />
              </Tabs.TabPane>
              <Tabs.TabPane tab={t("Mijozlar")} key="2">
                <Clients />
              </Tabs.TabPane>
            </CustomTabs>
          </>
        </Col>
      </Row>
    </>
  );
};

export default DeleteBasketPage;

const Products = () => {
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
      "deleted-products",
      {
        page: pagination.current,
        pageSize: pagination.pageSize,
        filters: filters,
      },
    ],
    queryFn: () =>
      httpGetDeletedProducts(
        pagination.current,
        pagination.pageSize,
        objectToQueryString({ is_active: true, ...filters })
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
  };

  const TABLE_COLUMNS = useDeleteProductColumns(
    pagination,
    filters,
    setFilters,
    handleRefetch
  );

  return (
    <>
      <Row gutter={[20, 20]}>
        {/* <Col span={24}>
          <Flex align="center" justify="space-between">
            <PageTitle>{t("Mahsulotlar")}</PageTitle>
          </Flex>
        </Col> */}
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

const Clients = () => {
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
      "deleted-products",
      {
        page: pagination.current,
        pageSize: pagination.pageSize,
        filters: filters,
      },
    ],
    queryFn: () =>
      httpGetDeletedClients(
        pagination.current,
        pagination.pageSize,
        objectToQueryString({ is_active: true, ...filters })
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
  };

  const TABLE_COLUMNS = useDeleteClientColumns(
    pagination,
    filters,
    setFilters,
    handleRefetch
  );

  return (
    <>
      <Row gutter={[20, 20]}>
        {/* <Col span={24}>
          <Flex align="center" justify="space-between">
            <PageTitle>{t("Mahsulotlar")}</PageTitle>
          </Flex>
        </Col> */}
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
