import BackButton from "@/components/atoms/back-button/BackButton";
import PageTitle from "@/components/molecules/page-title/PageTitle";
import { httpPostTrade } from "@/services/api/requests/trade.requests";
import { handleSuccessNotification, scrollToTop } from "@/utils/helpers";
import { useMutation } from "@tanstack/react-query";
import { Breadcrumb, Col, Flex, Row } from "antd";
import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useCreateBreadcrumbItems } from "./breadcrumbs/useCreateBreadcrumb";
import ReactToPrint from "react-to-print";
import CheckUI from "./_components/check-ui/CheckUI";
import { useState } from "react";
import { get } from "lodash";
import { httpPostOrder } from "@/services/api/requests/order.request";
import OrderForm from "./_components/OrderForm";

const CreateOrdersPage = () => {
  const { t } = useTranslation();

  const [printData, setPrintData] = useState({});

  const handleResetRef = useRef(() => {});

  const { isPending, mutateAsync } = useMutation({
    mutationFn: httpPostOrder,
    onSuccess: async (data, variables, context) => {
      scrollToTop();
      handleSuccessNotification(t("Muvaffaqiyatli bajarildi !"));
      if (context?.handleReset) {
        context.handleReset(); // Call handleReset from context
      }

      await new Promise((resolve) => {
        setPrintData(get(data, "data", {}));
        resolve();
      });

      printContent();
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

  const printComponentRef = useRef();
  const buttonRef = useRef();

  const printContent = () => {
    if (buttonRef.current) {
      setTimeout(() => {
        buttonRef.current.handlePrint();
      }, 1000); // 1-second delay
    }
  };

  return (
    <>
      <CheckUI data={printData} componentRef={printComponentRef} />
      <ReactToPrint
        pageStyle={`@page { size: 80mm 100%; margin: 20px; padding: 0px; } body {  margin: 20px; padding: 0px; }`}
        bodyClass="print"
        trigger={() => <button style={{ display: "none" }}>Print</button>}
        content={() => printComponentRef.current}
        ref={(el) => (buttonRef.current = el)}
      />
      <Helmet>
        <title>{t("Buyurtmalar qo'shish")}</title>
      </Helmet>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Flex align="center" justify="space-between">
            <PageTitle>{t("Buyurtmalar qo'shish")}</PageTitle>
            <BackButton />
          </Flex>
        </Col>
        <Col span={24}>
          <Breadcrumb items={BREADCRUMB_ITEMS} />
        </Col>
        <Col span={24}>
          <OrderForm
            handleSubmit={handleSubmit}
            defaultValues={{}}
            actionLoading={isPending}
          />
        </Col>
      </Row>
    </>
  );
};

export default CreateOrdersPage;
