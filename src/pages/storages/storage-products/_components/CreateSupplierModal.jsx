import CustomDatePicker from "@/components/atoms/form-elements/custom-date-picker/CustomDatePicker";
import CustomInput from "@/components/atoms/form-elements/custom-input/CustomInput";
import CustomSelect from "@/components/atoms/form-elements/custom-select/CustomSelect";
import CustomTextarea from "@/components/atoms/form-elements/custom-textarea/CustomTextarea";
import useSupplierTypes from "@/hooks/useSupplierTypes";
import { prepareSupplierDto } from "@/services/api/prepare-data/suppliers";
import { httpPostSupplier } from "@/services/api/requests/suppliers.requests";
import {
  getValidationStatus,
  handleSuccessNotification,
  scrollToTop,
} from "@/utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { RiUserAddFill } from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import { Button, Col, Divider, Flex, Form, Modal, Row } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { object, string } from "yup";

const CreateSupplierModal = () => {
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
    mutationFn: httpPostSupplier,
    onSuccess: () => {
      scrollToTop();
      handleSuccessNotification(t("Muvaffaqiyatli bajarildi !"));
    },
    onError: (error) => {
      scrollToTop();
      console.log(error);
    },
  });

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
    defaultValues: { added: dayjs() },
    resolver,
  });

  const handleReset = () => reset({});

  const onSubmit = rest.handleSubmit(async (values) => {
    try {
      const response = await mutateAsync(prepareSupplierDto(values));

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
      <Button onClick={() => showModal()} icon={<RiUserAddFill size={16} />} />

      <Modal
        title={t("Ta'minotchi qo'shish")}
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

            <Col xs={24} md={12}>
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

            <Col xs={24} md={12}>
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

            <Col xs={24} md={12}>
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

            <Col xs={24} md={24}>
              <Form.Item
                label={t("Izoh")}
                {...getValidationStatus(errors, "desc")}
              >
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

export default CreateSupplierModal;
