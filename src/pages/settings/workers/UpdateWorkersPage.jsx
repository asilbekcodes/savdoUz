import BackButton from "@/components/atoms/back-button/BackButton";
import ErrorResult from "@/components/molecules/error-result/ErrorResult";
import PageLoader from "@/components/molecules/page-loader/PageLoader";
import PageTitle from "@/components/molecules/page-title/PageTitle";
import { prepareWorkerForEdit } from "@/services/api/prepare-data/workers";
import {
  httpGetWorkerOne,
  httpUpdateWorker,
} from "@/services/api/requests/workers.requests";
import { handleSuccessNotification, scrollToTop } from "@/utils/helpers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Breadcrumb, Col, Flex, Row } from "antd";
import { get } from "lodash";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import WorkerForm from "./_components/WorkerForm";
import { useUpdateBreadcrumbItems } from "./breadcrumbs/useUpdateBreadcrumb";

const UpdateWorkersPage = () => {
  const { t } = useTranslation();

  const { id } = useParams();

  const updateElementState = useQuery({
    queryKey: ["worker-one", id],
    queryFn: () => httpGetWorkerOne(id),
    select: (response) => prepareWorkerForEdit(response.data),
  });

  const handleSuccess = () => {
    scrollToTop();
    handleSuccessNotification(t("Muvaffaqiyatli bajarildi !"));
    updateElementState.refetch();
  };

  const { isPending, mutateAsync } = useMutation({
    mutationFn: httpUpdateWorker,
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
  console.log("Worker Data:", updateElementState.data);


  return (
    <>
      <Helmet>
        <title>{t("Xodimni tahrirlash")}</title>
      </Helmet>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Flex align="center" justify="space-between">
            <PageTitle>{t("Xodimni tahrirlash")}</PageTitle>
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
                <WorkerForm
                  handleSubmit={handleSubmit}
                  defaultValues={{
                    ...get(updateElementState, "data", []),
                    password2: get(updateElementState, "data.password", ""),
                    client_role: get(updateElementState, "data.role", ""),
                    joylashuv: get(updateElementState, "data.location", ""),
                  }}
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

export default UpdateWorkersPage;
