import CustomInput from "@/components/atoms/form-elements/custom-input/CustomInput";
import CustomPhoneInput from "@/components/atoms/form-elements/custom-phone-input/CustomPhoneInput";
import useClientTypes from "@/hooks/useClientTypes";
import { getValidationStatus } from "@/utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Divider, Flex, Form, Row } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { object, string } from "yup";

const ProfileForm = ({
  defaultValues,
  handleSubmit,
  actionLoading = false,
  readOnly = false,
}) => {
  const { t } = useTranslation();

  const validationSchema = object().shape({
    first_name: string().required(t("Ism kiritilishi kerak !")),
    last_name: string().required(t("Familiya kiritilishi kerak !")),
    username: string().required(t("Telefon raqam kiritilishi kerak !")),
  });

  const resolver = yupResolver(validationSchema);

  const clientTypes = useClientTypes();

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
            label={t("Ism")}
            {...getValidationStatus(errors, "first_name")}
            required={true}
          >
            <Controller
              name="first_name"
              control={control}
              render={({ field }) => <CustomInput {...field} />}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={6}>
          <Form.Item
            label={t("Familiya")}
            {...getValidationStatus(errors, "last_name")}
            required={true}
          >
            <Controller
              name="last_name"
              control={control}
              render={({ field }) => <CustomInput {...field} />}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={6}>
          <Form.Item
            label={t("Telefon raqam")}
            {...getValidationStatus(errors, "username")}
            required={true}
          >
            <Controller
              name="username"
              control={control}
              render={({ field }) => <CustomPhoneInput {...field} />}
            />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
      <Form.Item>
        <Flex align="center" justify="end" gap="middle">
          {/* <Button htmlType="button" onClick={handleReset}>
            {t("Tozalash")}
          </Button> */}
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

export default ProfileForm;
