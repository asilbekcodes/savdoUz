import { Button } from "antd";
import styled from "styled-components";
import UploadModal from "../upload-modal/UploadModal";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export const StyledUploadButton = styled(Button)``;

const UploadButton = ({ uploadRequest, refetch, ExampleFileUrl, ...rest }) => {
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

  return (
    <>
      <StyledUploadButton
        icon={<UploadOutlined />}
        onClick={showModal}
        {...rest}
      >
        {t("Yuklash")}
      </StyledUploadButton>
      <UploadModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        handleOk={handleOk}
        uploadRequest={uploadRequest}
        refetch={refetch}
        ExampleFileUrl={ExampleFileUrl}
      />
    </>
  );
};

export default UploadButton;
