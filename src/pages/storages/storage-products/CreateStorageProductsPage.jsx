import BackButton from "@/components/atoms/back-button/BackButton";
import PageTitle from "@/components/molecules/page-title/PageTitle";
import { httpPostStorageProduct } from "@/services/api/requests/storage-products.requests";
import { handleSuccessNotification, scrollToTop } from "@/utils/helpers";
import { useMutation } from "@tanstack/react-query";
import { Breadcrumb, Col, Flex, Row } from "antd";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import StorageProductForm from "./_components/StorageProductForm";
import { useCreateBreadcrumbItems } from "./breadcrumbs/useCreateBreadcrumb";
import { useRef } from "react";

const CreateStorageProductsPage = () => {
  const { t } = useTranslation();

  const handleResetRef = useRef(() => {});

  const { isPending, mutateAsync } = useMutation({
    mutationFn: httpPostStorageProduct,
    onSuccess: (data, variables, context) => {
      scrollToTop();
      handleSuccessNotification(t("Muvaffaqiyatli bajarildi !"));
      if (context?.handleReset) {
        context.handleReset(); // Call handleReset from context
      }
    },
    onError: (error) => {
      scrollToTop();
      console.log(error);
    },
    onMutate: (variables) => {
      // Return context with handleReset
      return { handleReset: handleResetRef.current };
    },
  });

  const handleSubmit = async (values, handleReset) => {
    handleResetRef.current = handleReset;
    await mutateAsync(values);
  };

  const BREADCRUMB_ITEMS = useCreateBreadcrumbItems();

  return (
    <>
      <Helmet>
        <title>{t("Omborga mahsulot qo'shish")}</title>
      </Helmet>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Flex align="center" justify="space-between">
            <PageTitle>{t("Omborga mahsulot qo'shish")}</PageTitle>
            <BackButton />
          </Flex>
        </Col>
        <Col span={24}>
          <Breadcrumb items={BREADCRUMB_ITEMS} />
        </Col>
        <Col span={24}>
          <StorageProductForm
            handleSubmit={handleSubmit}
            defaultValues={{}}
            actionLoading={isPending}
          />
        </Col>
      </Row>
    </>
  );
};

export default CreateStorageProductsPage;
