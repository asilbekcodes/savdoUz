import CustomInput from "@/components/atoms/form-elements/custom-input/CustomInput";
import CustomPasswordInput from "@/components/atoms/form-elements/custom-password-input/CustomPasswordInput";
import CustomPhoneInput from "@/components/atoms/form-elements/custom-phone-input/CustomPhoneInput";
import CustomSelect from "@/components/atoms/form-elements/custom-select/CustomSelect";
import CustomSwitch from "@/components/atoms/form-elements/custom-switch/CustomSwitch";
import useLocations from "@/hooks/api/useLocations";
import useClientRole from "@/hooks/useClientRole";
import { prepareWorkerDto } from "@/services/api/prepare-data/workers";
import { getValidationStatus } from "@/utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { RiLockFill, RiMailFill } from "@remixicon/react";
import { Button, Col, Divider, Flex, Form, Row, Select } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { array, object, ref, string } from "yup";

const WorkerForm = ({
  defaultValues,
  handleSubmit,
  actionLoading = false,
  readOnly = false,
}) => {
  const { t } = useTranslation();

  const validationSchema = object().shape({
    first_name: string().required(t("Maydonni kiritishingiz shart !")),
    last_name: string().required(t("Maydonni kiritishingiz shart !")),
    username: string().required(t("Maydonni kiritishingiz shart !")),
    email: string()
      .email(t("To'g'ri email manzilini kiriting!"))
      .required(t("Email manzilini kiritishingiz shart!")),
    password: string().required(t("Parol kiritilishi kerak !")),
    password2: string()
      .oneOf([ref("password"), null], t("Parollar mos kelishi kerak !"))
      .required(t("Parolni qayta kiriting !")),
    client_role: string().required(t("Maydonni kiritishingiz shart !")),
    joylashuv: array().required(t("Joylashuvni kiritishingiz shart !")),
  });

  const resolver = yupResolver(validationSchema);

  const clientRole = useClientRole();

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

  // const onSubmit = rest.handleSubmit((values) => {
  //   handleSubmit(prepareWorkerDto(values),
  //   handleReset);
  // });

  const onSubmit = rest.handleSubmit((values) => {
    const payload = {
      ...prepareWorkerDto(values),
      location: values.joylashuv
    };
    handleSubmit(payload, handleReset);
  });

  const location = useLocations().locationsData;

  const transformedLocations = location?.map(loc => ({
    label: loc.name, 
    value: loc.id
  }));
  

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

        <Col xs={24} md={6}>
          <Form.Item
            label={t("Email")}
            {...getValidationStatus(errors, "email")}
            required={true}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <CustomInput {...field} prefix={<RiMailFill />} />
              )}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={6}>
          <Form.Item
            label={t("Rolni tanlang")}
            {...getValidationStatus(errors, "client_role")}
            required={true}
          >
            <Controller
              name="client_role"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  showSearch={false}
                  options={clientRole}
                  {...field}
                />
              )}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={6}>
          <Form.Item
            label={t("Joylashuvi")}
            required={true}
            {...getValidationStatus(errors, "joylashuv")}
          >
            <Controller
              name="joylashuv"
              control={control}
              render={({ field }) => (
                <Select
                  mode="multiple"
                  showSearch={false}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={t("Joylashuvni tanlang")}
                  options={transformedLocations}
                  {...field}
                />
              )}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={6}>
          <Form.Item
            label={t("Parol")}
            {...getValidationStatus(errors, "password")}
            required={true}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <CustomPasswordInput
                  {...field}
                  placeholder={t("Parolni kiriting")}
                  prefix={<RiLockFill />}
                />
              )}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item
            label={t("Parolni tasdiqlang")}
            {...getValidationStatus(errors, "password2")}
            required={true}
          >
            <Controller
              name="password2"
              control={control}
              render={({ field }) => (
                <CustomPasswordInput
                  {...field}
                  placeholder={t("Parolni qayta kiriting")}
                  prefix={<RiLockFill />}
                />
              )}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={6}>
          <Form.Item
            label={t("Holati")}
            {...getValidationStatus(errors, "is_active")}
            required={false}
          >
            <Controller
              name="is_active"
              control={control}
              render={({ field }) => <CustomSwitch {...field} />}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={6}>
          <Form.Item
            label={t("Savdo")}
            {...getValidationStatus(errors, "is_trade")}
            required={false}
          >
            <Controller
              name="is_trade"
              control={control}
              render={({ field }) => <CustomSwitch {...field} />}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={6}>
          <Form.Item
            label={t("Mijoz")}
            {...getValidationStatus(errors, "is_client")}
            required={false}
          >
            <Controller
              name="is_client"
              control={control}
              render={({ field }) => <CustomSwitch {...field} />}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={6}>
          <Form.Item
            label={t("Statistika")}
            {...getValidationStatus(errors, "is_statistics")}
            required={false}
          >
            <Controller
              name="is_statistics"
              control={control}
              render={({ field }) => <CustomSwitch {...field} />}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={6}>
          <Form.Item
            label={t("Ombor")}
            {...getValidationStatus(errors, "is_storage")}
            required={false}
          >
            <Controller
              name="is_storage"
              control={control}
              render={({ field }) => <CustomSwitch {...field} />}
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

export default WorkerForm;
