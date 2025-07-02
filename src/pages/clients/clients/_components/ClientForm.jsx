import CustomDatePicker from "@/components/atoms/form-elements/custom-date-picker/CustomDatePicker";
import CustomInput from "@/components/atoms/form-elements/custom-input/CustomInput";
import CustomPhoneInput from "@/components/atoms/form-elements/custom-phone-input/CustomPhoneInput";
import CustomSelect from "@/components/atoms/form-elements/custom-select/CustomSelect";
import CustomTextarea from "@/components/atoms/form-elements/custom-textarea/CustomTextarea";
import useLocations from "@/hooks/api/useLocations";
import useClientTypes from "@/hooks/useClientTypes";
import { prepareClientDto } from "@/services/api/prepare-data/clients";
import { getValidationStatus } from "@/utils/helpers";
import { UploadOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Divider, Flex, Form, Row, Upload } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { object, string } from "yup";

const ClientForm = ({
  defaultValues,
  handleSubmit,
  actionLoading = false,
  readOnly = false,
}) => {
  const { t } = useTranslation();

  const [fileList, setFileList] = useState([]);
  const handleUploadChange = (info) => {
    const newFileList = info.fileList.slice(-1); // Faqat oxirgi yuklangan faylni saqlaymiz
    setFileList(newFileList);
  };

  const validationSchema = object().shape({
    client_type: string().required(t("Maydonni kiritishingiz shart !")),
    name: string().required(t("Maydonni kiritishingiz shart !")),
    added: string().required(t("Maydonni kiritishingiz shart !")),
    joylashuv: string().required(t("Joylashuvni kiritishingiz shart !")),
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
    defaultValues: { added: dayjs(), ...defaultValues },
    resolver,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const handleReset = () => {
    reset({});
    setFileList([]);
  };

  const onSubmit = rest.handleSubmit(async (values) => {
    const imageDto = await prepareClientDto({
      ...values,
      image: fileList[0],
    });

    handleSubmit(imageDto, handleReset);
  });
  const location = useLocations().locationsData;

  const transformedLocations = location?.map((loc) => ({
    label: loc.name,
    value: loc.id,
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
            label={t("Mijoz nomi")}
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
              render={({ field }) => <CustomPhoneInput {...field} />}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={6}>
          <Form.Item
            label={t("Mijoz turi")}
            {...getValidationStatus(errors, "client_type")}
            required={true}
          >
            <Controller
              name="client_type"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  showSearch={false}
                  options={clientTypes}
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
          <Form.Item
            label={t("Joylashuvi")}
            required={true}
            {...getValidationStatus(errors, "joylashuv")}
          >
            <Controller
              name="joylashuv"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  showSearch={false}
                  options={transformedLocations}
                  {...field}
                />
              )}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={6}>
          <Form.Item
            label={t("INN raqami")}
            {...getValidationStatus(errors, "inn_number")}
            required={false}
          >
            <Controller
              name="inn_number"
              control={control}
              render={({ field }) => <CustomInput {...field} />}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={6}>
          <Form.Item
            label={t("Parolni kiriting")}
            {...getValidationStatus(errors, "parol")}
            required={false}
          >
            <Controller
              name="parol"
              control={control}
              render={({ field }) => <CustomInput {...field} />}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={6}>
          <Form.Item
            label={t("Hisob raqami")}
            {...getValidationStatus(errors, "account_number")}
            required={false}
          >
            <Controller
              name="account_number"
              control={control}
              render={({ field }) => <CustomInput {...field} />}
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

        <Col xs={24} md={6}>
          <Form.Item
            label={t("Rasm")}
            {...getValidationStatus(errors, "image")}
            required={false}
          >
            <Controller
              name="image"
              defaultValue={[]}
              control={control}
              render={({ field }) => (
                <Upload
                  listType="picture"
                  maxCount={1} // Faqat bitta fayl yuklash mumkin
                  accept="image/*"
                  fileList={fileList}
                  onChange={handleUploadChange}
                  beforeUpload={(file) => {
                    field.onChange([file]);
                    return false;
                  }}
                >
                  <Button icon={<UploadOutlined />}>{t("Tanlang")}</Button>
                </Upload>
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

export default ClientForm;
