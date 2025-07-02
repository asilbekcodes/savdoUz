import CustomDatePicker from "@/components/atoms/form-elements/custom-date-picker/CustomDatePicker";
import CustomInput from "@/components/atoms/form-elements/custom-input/CustomInput";
import CustomSelect from "@/components/atoms/form-elements/custom-select/CustomSelect";
import CustomTextarea from "@/components/atoms/form-elements/custom-textarea/CustomTextarea";
import useClientTypes from "@/hooks/useClientTypes";
import { prepareClientDto } from "@/services/api/prepare-data/clients";
import { httpPostClient } from "@/services/api/requests/clients.requests";
import {
  getValidationStatus,
  handleSuccessNotification,
  scrollToTop,
} from "@/utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { RiUserAddFill } from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import { Button, Col, Divider, Flex, Form, Modal, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { number, object, string } from "yup";
import { httpPostProduct } from "@/services/api/requests/products.requests";
import useProductCategories from "@/hooks/api/useProductCategories";
import useProductFormats from "@/hooks/api/useProductFormats";
import useProductTypes from "@/hooks/useProductTypes";
import useCompanyStore from "@/store/useCompanyStore";
import CustomInputNumber from "@/components/atoms/form-elements/custom-input-number/CustomInputNumber";

const CreateProductModal = () => {
  const { t } = useTranslation();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const { isLoading, isPending, mutateAsync } = useMutation({
    mutationFn: httpPostProduct,
    onSuccess: () => {
      scrollToTop();
      handleSuccessNotification(t("Muvaffaqiyatli bajarildi !"));
    },
    onError: (error) => {
      scrollToTop();
      console.log(error);
    },
  });

  const {
    company: { currency_type },
  } = useCompanyStore();

  const validationSchema = object().shape({
    category_id: string().required(t("Maydonni kiritishingiz shart !")),
    format_id: string().required(t("Maydonni kiritishingiz shart !")),
    product_type: string().required(t("Maydonni kiritishingiz shart !")),
    name: string().required(t("Maydonni kiritishingiz shart !")),
    price: number()
      .min(0, t("Narx noldan katta yoki teng bo'lishi kerak !"))
      .required(t("Maydonni kiritishingiz shart !")),
  });

  const resolver = yupResolver(validationSchema);

  const { productCategoriesOptions } = useProductCategories();
  const { productFormatsOptions } = useProductFormats();
  const productTypes = useProductTypes();

  const {
    control,
    formState: { errors },
    reset,
    watch,
    ...rest
  } = useForm({
    defaultValues: { added: dayjs() },
    resolver,
  });

  const handleReset = () => reset({});

  const onSubmit = rest.handleSubmit(async (values) => {
    try {
      const response = await mutateAsync(values);

      if (response?.status === 201) {
        handleReset();
        handleCancel();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  });

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="default"
        size="small"
        onClick={() => showModal()}
      >
        {t("Qo'shish")}
      </Button>

      <Modal
        title={t("Mahsulot qo'shish")}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          className="create-form"
          name="create-form"
          size="large"
          onFinish={onSubmit}
        >
          <Divider />
          <Row gutter={[20, 20]}>
            <Col xs={24} md={12}>
              <Form.Item
                label={t("Nomi")}
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
            <Col xs={24} md={12}>
              <Form.Item
                label={t("Kategoriya")}
                {...getValidationStatus(errors, "category_id")}
                required={true}
              >
                <Controller
                  name="category_id"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      options={productCategoriesOptions}
                      {...field}
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={t("Format")}
                {...getValidationStatus(errors, "format_id")}
                required={true}
              >
                <Controller
                  name="format_id"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect options={productFormatsOptions} {...field} />
                  )}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
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
            <Col xs={24} md={12}>
              <Form.Item
                label={t("Mahsulot turi")}
                {...getValidationStatus(errors, "product_type")}
                required={true}
              >
                <Controller
                  name="product_type"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      showSearch={false}
                      options={productTypes}
                      {...field}
                    />
                  )}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label={t("Barcode")}
                {...getValidationStatus(errors, "bar_code")}
              >
                <Controller
                  name="bar_code"
                  control={control}
                  render={({ field }) => <CustomInput {...field} />}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Form.Item>
            <Flex align="center" justify="end" gap="middle">
              <Button htmlType="button" onClick={handleCancel}>
                {t("Bekor qilish")}
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                disabled={isLoading}
              >
                {t("Yuborish")}
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateProductModal;
