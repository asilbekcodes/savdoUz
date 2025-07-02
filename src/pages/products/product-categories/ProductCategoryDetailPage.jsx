import BackButton from "@/components/atoms/back-button/BackButton";
import ClearFilterButton from "@/components/atoms/clear-filter-button/ClearFilterButton";
import CreateButton from "@/components/atoms/create-button/CreateButton";
import CustomDataTable from "@/components/molecules/custom-data-table/CustomDataTable";
import ErrorResult from "@/components/molecules/error-result/ErrorResult";
import GlobalSearchInput from "@/components/molecules/global-search-input/GlobalSearchInput";
import PageLoader from "@/components/molecules/page-loader/PageLoader";
import PageTitle from "@/components/molecules/page-title/PageTitle";
import TitleAndIconText from "@/components/molecules/title-and-icon-text/TitleAndIconText";
import { httpGetProductCategoryOne } from "@/services/api/requests/product-categories.requests";
import { httpGetProducts } from "@/services/api/requests/products.requests";
import { objectToQueryString } from "@/utils/helpers";
import { RiBarChartHorizontalFill } from "@remixicon/react";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Card, Col, Divider, Flex, Row, Tabs } from "antd";
import { get } from "lodash";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useProductColumns } from "../products/useProductColumns";
import { useDetailBreadcrumbItems } from "./breadcrumbs/useDetailBreadcrumb";
import CustomTabs from "@/components/atoms/custom-tabs/CustomTabs";

const ProductCategoryDetailPage = () => {
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
    queryKey: ["category-one", id],
    queryFn: () => httpGetProductCategoryOne(id),
    select: (response) => response.data,
  });

  const BREADCRUMB_ITEMS = useDetailBreadcrumbItems();

  return (
    <>
      <Helmet>
        <title>{t("Kategoriya")}</title>
      </Helmet>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Flex align="center" justify="space-between">
            <PageTitle>{t("Kategoriya")}</PageTitle>
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
                      <Card>
                        <Flex vertical gap={"large"}>
                          <TitleAndIconText
                            title={t("Kategoriya nomi").toUpperCase()}
                            value={get(data, "name", "")}
                            icon={<RiBarChartHorizontalFill />}
                          />
                        </Flex>
                      </Card>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={t("Mahsulotlar")} key="2">
                      <Products
                        category={get(data, "id", "")}
                        categoryRefetch={refetch}
                      />
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

export default ProductCategoryDetailPage;

const Products = ({ category, categoryRefetch }) => {
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
      "product-categories",
      {
        page: pagination.current,
        pageSize: pagination.pageSize,
        filters: filters,
      },
    ],
    queryFn: () =>
      httpGetProducts(
        pagination.current,
        pagination.pageSize,
        objectToQueryString({ category, ...filters })
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
    categoryRefetch();
  };

  const TABLE_COLUMNS = useProductColumns(
    pagination,
    filters,
    setFilters,
    handleRefetch
  ).filter((item) => item.key !== "category");

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
                  onClick={() => navigate("/products/products/create")}
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
