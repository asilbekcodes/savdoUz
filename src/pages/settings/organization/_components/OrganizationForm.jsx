import CustomInput from "@/components/atoms/form-elements/custom-input/CustomInput";
import { getValidationStatus } from "@/utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { RiCashFill, RiGovernmentFill } from "@remixicon/react";
import { Button, Col, Divider, Flex, Form, Row } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { object, string } from "yup";

const OrganizationForm = ({
  defaultValues,
  handleSubmit,
  actionLoading = false,
  readOnly = false,
}) => {
  const { t } = useTranslation();

  const validationSchema = object().shape({
    comp_name: string().required(t("Ism kiritilishi kerak !")),
    currency_type: string().required(t("Telefon raqam kiritilishi kerak !")),
  });

  const resolver = yupResolver(validationSchema);

  const {
    control,
    formState: { errors },
    reset,
    watch,
    ...rest
  } = useForm({
    defaultValues: { ...defaultValues },
    resolver,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const handleReset = () => reset({});

  const onSubmit = rest.handleSubmit((values) => {
    handleSubmit(values, handleReset);
  });

  return (
    <Form
      layout="vertical"
      className="create-form"
      name="create-form"
      size="large"
      onFinish={onSubmit}
    >
      <Row gutter={[20, 20]}>
        <Col xs={24} md={6}>
          <Form.Item
            label={t("Korxona nomi")}
            {...getValidationStatus(errors, "comp_name")}
            required={true}
          >
            <Controller
              name="comp_name"
              control={control}
              render={({ field }) => (
                <CustomInput {...field} prefix={<RiGovernmentFill />} />
              )}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item
            label={t("Valyuta turi")}
            {...getValidationStatus(errors, "currency_type")}
            required={true}
          >
            <Controller
              name="currency_type"
              control={control}
              render={({ field }) => (
                <CustomInput {...field} prefix={<RiCashFill />} />
              )}
            />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
      <Form.Item>
        <Flex align="center" justify="end" gap="middle">
          <Button
            type="primary"
            htmlType="submit"
            loading={actionLoading}
            disabled={actionLoading}
          >
            {t("O'zgartirish")}
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default OrganizationForm;
