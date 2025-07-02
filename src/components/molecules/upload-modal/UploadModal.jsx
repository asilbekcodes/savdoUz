import {
  getValidationStatus,
  handleSuccessNotification,
} from "@/utils/helpers";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Button, Col, Flex, Form, Modal, Row, Upload } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

const UploadModal = ({
  isModalVisible,
  handleCancel,
  uploadRequest,
  refetch,
  ExampleFileUrl,
}) => {
  const { t } = useTranslation();

  const schema = yup.object().shape({
    file: yup.mixed().required(t("Fayl kerak")),
  });

  const resolver = yupResolver(schema);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    resolver,
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: uploadRequest,
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
    mutateAsync({ file: data.file[0]?.originFileObj });
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Modal
      title={t("Excel faylini yuklash")}
      open={isModalVisible}
      onCancel={handleCancel}
      footer={[
        <Flex align="center" justify="space-between">
          <Button
            key="example"
            type="primary"
            icon={<DownloadOutlined />}
            href={ExampleFileUrl}
            download
          >
            {t("Namuna uchun")}
          </Button>
          <Flex align="center" gap="middle">
            <Button key="cancel" onClick={handleCancel}>
              {t("Bekor qilish")}
            </Button>

            <Button
              key="submit"
              type="primary"
              onClick={handleSubmit(onSubmit)}
            >
              {t("Yuborish")}
            </Button>
          </Flex>
        </Flex>,
      ]}
    >
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        style={{ margin: "30px 0px" }}
      >
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <Form.Item
              label={t("Fayl")}
              {...getValidationStatus(errors, "file")}
              required={true}
            >
              <Controller
                name="file"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <Upload
                    name="file"
                    beforeUpload={() => false}
                    fileList={field.value}
                    onChange={(info) => setValue("file", normFile(info))}
                  >
                    <Button icon={<UploadOutlined />}>
                      {t("Faylni tanlang")}
                    </Button>
                  </Upload>
                )}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UploadModal;
