import CustomDatePicker from "@/components/atoms/form-elements/custom-date-picker/CustomDatePicker";
import CustomInputNumber from "@/components/atoms/form-elements/custom-input-number/CustomInputNumber";
import TitleAndIconText from "@/components/molecules/title-and-icon-text/TitleAndIconText";
import { prepareAddDebtSupplierDto } from "@/services/api/prepare-data/suppliers";
import { httpAddDebtSupplier } from "@/services/api/requests/suppliers.requests";
import {
  NumberToThousandFormat,
  getValidationStatus,
  handleSuccessNotification,
} from "@/utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { RiCashLine, RiMoneyDollarBoxFill } from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import { Button, Col, Flex, Form, Modal, Row } from "antd";
import dayjs from "dayjs";
import { get } from "lodash";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { number, object } from "yup";

const AddDebtForSupplier = ({ refetch, item }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { t } = useTranslation();

  const validationSchema = object().shape({
    sum: number()
      .min(0, t("Narx noldan katta yoki teng bo'lishi kerak !"))
      .required(t("Maydonni kiritishingiz shart !")),
  });

  const resolver = yupResolver(validationSchema);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
  } = useForm({
    resolver,
    defaultValues: {
      date: dayjs(),
      pay_type: true,
    },
  });

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: httpAddDebtSupplier,
    onSuccess: () => {
      handleSuccessNotification(t("Muvaffaqiyatli bajarildi !"));
      handleCancel();
      reset();
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    mutateAsync(
      prepareAddDebtSupplierDto({
        ...data,
        supplier: get(item, "id", ""),
      })
    );
  };

  const totalPayment = watch(["sum"]).reduce(
    (acc, curr) => acc + (parseFloat(curr) || 0),
    0
  );

  return (
    <>
      <Button onClick={showModal} type="primary">
        {t("Qarz qo'shish")}
      </Button>
      <Modal
        width={400}
        centered={true}
        title={t("Qarz qo'shish")}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Flex align="center" gap="middle" justify="end">
            <Button key="cancel" onClick={handleCancel}>
              {t("Bekor qilish")}
            </Button>
            <Button
              key="submit"
              type="primary"
              disabled={isLoading}
              loading={isLoading}
              onClick={handleSubmit(onSubmit)}
            >
              {t("Qo'shish")}
            </Button>
          </Flex>,
        ]}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
          style={{ margin: "30px 0px" }}
        >
          <Row gutter={[20, 15]}>
            <Col xs={24} md={24}>
              <Form.Item
                label={t("Summa")}
                {...getValidationStatus(errors, "sum")}
                required={true}
              >
                <Controller
                  name="sum"
                  control={control}
                  render={({ field }) => (
                    <CustomInputNumber prefix={<RiCashLine />} {...field} />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24}>
              <Form.Item>
                <TitleAndIconText
                  type="success"
                  title={t("Qo'shiladigan summa").toUpperCase()}
                  value={NumberToThousandFormat(totalPayment)}
                  icon={<RiMoneyDollarBoxFill />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24}>
              <Form.Item
                label={t("Sana")}
                {...getValidationStatus(errors, "date")}
                required={true}
              >
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => <CustomDatePicker {...field} />}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AddDebtForSupplier;
