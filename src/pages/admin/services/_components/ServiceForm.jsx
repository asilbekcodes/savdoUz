import CustomInputNumber from "@/components/atoms/form-elements/custom-input-number/CustomInputNumber";
import CustomInput from "@/components/atoms/form-elements/custom-input/CustomInput";
import { prepareServiceDto } from "@/services/api/prepare-data/services";
import useCompanyStore from "@/store/useCompanyStore";
import { getValidationStatus } from "@/utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Divider, Flex, Form, Row } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { number, object, string } from "yup";

const ServiceForm = ({
  defaultValues,
  handleSubmit,
  actionLoading = false,
  readOnly = false,
}) => {
  const { t } = useTranslation();

  const {
    company: { currency_type },
  } = useCompanyStore();

  const validationSchema = object().shape({
    name: string().required(t("Maydonni kiritishingiz shart !")),
    price: number()
      .min(0, t("Narx noldan katta yoki teng bo'lishi kerak !"))
      .required(t("Maydonni kiritishingiz shart !")),
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
    handleSubmit(prepareServiceDto(values), handleReset);
  });

  return (
    <Form
      layout="vertical"
      className="create-form"
      name="create-form"
      size="large"
      onFinish={onSubmit}
    >
      <Divider />
      <Row gutter={[20, 20]}>
        <Col xs={24} md={6}>
          <Form.Item
            label={t("Xizmat nomi")}
            {...getValidationStatus(errors, "name")}
            required={true}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => <CustomInput {...field} />}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item
            label={t("Narxi")}
            {...getValidationStatus(errors, "price")}
            required={true}
          >
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <CustomInputNumber addonAfter={currency_type} {...field} />
              )}
            />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
      <Form.Item>
        <Flex align="center" justify="end" gap="middle">
          <Button htmlType="button" onClick={handleReset}>
            {t("Tozalash")}
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={actionLoading}
            disabled={actionLoading}
          >
            {t("Yuborish")}
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default ServiceForm;
