import CustomInputNumber from "@/components/atoms/form-elements/custom-input-number/CustomInputNumber";
import CustomSelect from "@/components/atoms/form-elements/custom-select/CustomSelect";
import useProducts from "@/hooks/api/useProducts";
import { prepareStorageProductOffDto } from "@/services/api/prepare-data/storage-products-off";
import { getValidationStatus } from "@/utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Divider, Flex, Form, Row } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { number, object, string } from "yup";

const StorageProductOffForm = ({
  defaultValues,
  handleSubmit,
  actionLoading = false,
  readOnly = false,
}) => {
  const { t } = useTranslation();

  const validationSchema = object().shape({
    product: string().required(t("Maydonni kiritishingiz shart !")),
    count: number()
      .min(0, t("Miqdor noldan katta yoki teng bo'lishi kerak !"))
      .required(t("Maydonni kiritishingiz shart !")),
  });

  const resolver = yupResolver(validationSchema);

  const { productsOptions } = useProducts();

  const {
    control,
    formState: { errors },
    reset,
    watch,
    ...rest
  } = useForm({
    defaultValues,
    resolver,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const handleReset = () => reset({});

  const onSubmit = rest.handleSubmit((values) => {
    handleSubmit(prepareStorageProductOffDto(values), handleReset);
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
            label={t("Mahsulot")}
            {...getValidationStatus(errors, "product")}
            required={true}
          >
            <Controller
              name="product"
              control={control}
              render={({ field }) => (
                <CustomSelect options={productsOptions} {...field} />
              )}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item
            label={t("Miqdori")}
            {...getValidationStatus(errors, "count")}
            required={true}
          >
            <Controller
              name="count"
              control={control}
              render={({ field }) => <CustomInputNumber {...field} />}
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

export default StorageProductOffForm;
