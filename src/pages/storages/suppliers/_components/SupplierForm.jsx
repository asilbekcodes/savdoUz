import CustomDatePicker from "@/components/atoms/form-elements/custom-date-picker/CustomDatePicker";
import CustomInput from "@/components/atoms/form-elements/custom-input/CustomInput";
import CustomSelect from "@/components/atoms/form-elements/custom-select/CustomSelect";
import CustomTextarea from "@/components/atoms/form-elements/custom-textarea/CustomTextarea";
import useSupplierTypes from "@/hooks/useSupplierTypes";
import { prepareSupplierDto } from "@/services/api/prepare-data/suppliers";
import { getValidationStatus } from "@/utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Divider, Flex, Form, Row } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { object, string } from "yup";

const SupplierForm = ({
  defaultValues,
  handleSubmit,
  actionLoading = false,
  readOnly = false,
}) => {
  const { t } = useTranslation();

  const validationSchema = object().shape({
    supplier_type: string().required(t("Maydonni kiritishingiz shart !")),
    name: string().required(t("Maydonni kiritishingiz shart !")),
    added: string().required(t("Maydonni kiritishingiz shart !")),
  });

  const resolver = yupResolver(validationSchema);

  const supplierTypes = useSupplierTypes();

  const {
    control,
    formState: { errors },
    reset,
    watch,
    ...rest
  } = useForm({
    defaultValues: { added: dayjs(), ...defaultValues },
    resolver,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const handleReset = () => reset({});

  const onSubmit = rest.handleSubmit((values) => {
    handleSubmit(prepareSupplierDto(values), handleReset);
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
            label={t("Ta'minotchi nomi")}
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
            label={t("Telefon raqami")}
            {...getValidationStatus(errors, "phone")}
            required={false}
          >
            <Controller
              name="phone"
              control={control}
              render={({ field }) => <CustomInput {...field} />}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={6}>
          <Form.Item
            label={t("Ta'minotchi turi")}
            {...getValidationStatus(errors, "supplier_type")}
            required={true}
          >
            <Controller
              name="supplier_type"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  showSearch={false}
                  options={supplierTypes}
                  {...field}
                />
              )}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={6}>
          <Form.Item
            label={t("Qo'shilgan vaqti")}
            {...getValidationStatus(errors, "added")}
            required={true}
          >
            <Controller
              name="added"
              control={control}
              render={({ field }) => <CustomDatePicker {...field} />}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={6}>
          <Form.Item label={t("Izoh")} {...getValidationStatus(errors, "desc")}>
            <Controller
              name="desc"
              control={control}
              render={({ field }) => <CustomTextarea {...field} />}
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

export default SupplierForm;
