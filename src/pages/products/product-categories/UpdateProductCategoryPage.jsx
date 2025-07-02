import BackButton from "@/components/atoms/back-button/BackButton";
import ErrorResult from "@/components/molecules/error-result/ErrorResult";
import PageLoader from "@/components/molecules/page-loader/PageLoader";
import PageTitle from "@/components/molecules/page-title/PageTitle";
import { prepareProductCategoryForEdit } from "@/services/api/prepare-data/product-category";
import {
  httpGetProductCategoryOne,
  httpUpdateProductCategory,
} from "@/services/api/requests/product-categories.requests";
import { handleSuccessNotification, scrollToTop } from "@/utils/helpers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Breadcrumb, Col, Flex, Row } from "antd";
import { get } from "lodash";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import CategoryForm from "./_components/CategoryForm";
import { useUpdateBreadcrumbItems } from "./breadcrumbs/useUpdateBreadcrumb";

const UpdateProductCategoryPage = () => {
  const { t } = useTranslation();

  const { id } = useParams();

  const updateElementState = useQuery({
    queryKey: ["product-category-one", id],
    queryFn: () => httpGetProductCategoryOne(id),
    select: (response) => prepareProductCategoryForEdit(response.data),
  });

  const handleSuccess = () => {
    scrollToTop();
    handleSuccessNotification(t("Muvaffaqiyatli bajarildi !"));
    updateElementState.refetch();
  };

  const { isPending, mutateAsync } = useMutation({
    mutationFn: httpUpdateProductCategory,
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
        <title>{t("Kategoriyani tahrirlash")}</title>
      </Helmet>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Flex align="center" justify="space-between">
            <PageTitle>{t("Kategoriyani tahrirlash")}</PageTitle>
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
                <CategoryForm
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

export default UpdateProductCategoryPage;
