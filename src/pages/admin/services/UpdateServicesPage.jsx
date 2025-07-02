import BackButton from "@/components/atoms/back-button/BackButton";
import ErrorResult from "@/components/molecules/error-result/ErrorResult";
import PageLoader from "@/components/molecules/page-loader/PageLoader";
import PageTitle from "@/components/molecules/page-title/PageTitle";
import { prepareServiceForEdit } from "@/services/api/prepare-data/services";
import {
  httpGetServiceOne,
  httpUpdateService,
} from "@/services/api/requests/services.requests";
import { handleSuccessNotification, scrollToTop } from "@/utils/helpers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Breadcrumb, Col, Flex, Row } from "antd";
import { get } from "lodash";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ServiceForm from "./_components/ServiceForm";
import { useUpdateBreadcrumbItems } from "./breadcrumbs/useUpdateBreadcrumb";

const UpdateServicesPage = () => {
  const { t } = useTranslation();

  const { id } = useParams();

  const updateElementState = useQuery({
    queryKey: ["service-one", id],
    queryFn: () => httpGetServiceOne(id),
    select: (response) => prepareServiceForEdit(response.data),
  });

  const handleSuccess = () => {
    scrollToTop();
    handleSuccessNotification(t("Muvaffaqiyatli bajarildi !"));
    updateElementState.refetch();
  };

  const { isPending, mutateAsync } = useMutation({
    mutationFn: httpUpdateService,
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
        <title>{t("Xizmatni tahrirlash")}</title>
      </Helmet>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Flex align="center" justify="space-between">
            <PageTitle>{t("Xizmatni tahrirlash")}</PageTitle>
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
                <ServiceForm
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

export default UpdateServicesPage;
