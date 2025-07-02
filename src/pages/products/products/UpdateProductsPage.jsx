import BackButton from "@/components/atoms/back-button/BackButton";
import ErrorResult from "@/components/molecules/error-result/ErrorResult";
import PageLoader from "@/components/molecules/page-loader/PageLoader";
import PageTitle from "@/components/molecules/page-title/PageTitle";
import { prepareProductForEdit } from "@/services/api/prepare-data/products";
import {
  httpGetProductOne,
  httpUpdateProduct,
} from "@/services/api/requests/products.requests";
import { handleSuccessNotification, scrollToTop } from "@/utils/helpers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Col, Flex, Row } from "antd";
import { get } from "lodash";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ProductForm from "./_components/ProductForm";
import { useUpdateBreadcrumbItems } from "./breadcrumbs/useUpdateBreadcrumb";

const UpdateProductsPage = () => {
  const { t } = useTranslation();

  const { id } = useParams();

  const queryClient = useQueryClient();

  const updateElementState = useQuery({
    queryKey: ["product-one", id],
    queryFn: () => httpGetProductOne(id),
    select: (response) => prepareProductForEdit(response.data),
  });

    const handleSuccess = () => {
    scrollToTop();
    handleSuccessNotification(t("Muvaffaqiyatli bajarildi !"));
    queryClient.invalidateQueries({ queryKey: ["product-one", id] });
  };

  const { isPending, mutateAsync } = useMutation({
    mutationFn: httpUpdateProduct,
    onSuccess: handleSuccess,
    onError: (error) => {
      scrollToTop();
      console.log(error);
    },
  });

  const handleSubmit = async (values, reset) => {
    mutateAsync({ id, data: values });
  };

  const BREADCRUMB_ITEMS = useUpdateBreadcrumbItems();

  return (
    <>
      <Helmet>
        <title>{t("Mahsulotni tahrirlash")}</title>
      </Helmet>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Flex align="center" justify="space-between">
            <PageTitle>{t("Mahsulotni tahrirlash")}</PageTitle>
            <BackButton />
          </Flex>
        </Col>
        <Col span={24}>
          <Breadcrumb items={BREADCRUMB_ITEMS} />
        </Col>
        <Col span={24}>
          {updateElementState.isLoading ? (
            <PageLoader />
          ) : (
            <>
              {updateElementState.error ? (
                <ErrorResult error={updateElementState.error} />
              ) : (
                <ProductForm
                  handleSubmit={handleSubmit}
                  defaultValues={get(updateElementState, "data", [])}
                  actionLoading={isPending}
                />
              )}
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default UpdateProductsPage;
