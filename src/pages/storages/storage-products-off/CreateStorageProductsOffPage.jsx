import BackButton from "@/components/atoms/back-button/BackButton";
import PageTitle from "@/components/molecules/page-title/PageTitle";
import { httpPostStorageProductOff } from "@/services/api/requests/storage-products-off.requests";
import { handleSuccessNotification, scrollToTop } from "@/utils/helpers";
import { useMutation } from "@tanstack/react-query";
import { Breadcrumb, Col, Flex, Row } from "antd";
import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import StorageProductOffForm from "./_components/StorageProductOffForm";
import { useCreateBreadcrumbItems } from "./breadcrumbs/useCreateBreadcrumb";

const CreateStorageProductsOffPage = () => {
  const { t } = useTranslation();

  const handleResetRef = useRef(() => {});

  const { isPending, mutateAsync } = useMutation({
    mutationFn: httpPostStorageProductOff,
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
        <title>{t("Yaroqsiz mahsulot qo'shish")}</title>
      </Helmet>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Flex align="center" justify="space-between">
            <PageTitle>{t("Yaroqsiz mahsulot qo'shish")}</PageTitle>
            <BackButton />
          </Flex>
        </Col>
        <Col span={24}>
          <Breadcrumb items={BREADCRUMB_ITEMS} />
        </Col>
        <Col span={24}>
          <StorageProductOffForm
            handleSubmit={handleSubmit}
            defaultValues={{}}
            actionLoading={isPending}
          />
        </Col>
      </Row>
    </>
  );
};

export default CreateStorageProductsOffPage;
