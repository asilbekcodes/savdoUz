import { WarningOutlined } from "@ant-design/icons";
import { Button, Flex, Modal } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const StyledElement = styled(Modal)`
  .ant-modal-header {
    .ant-modal-title {
      .anticon {
        color: #faad14;
        font-size: 25px;
      }
    }
  }
  .ant-modal-body {
    padding: 20px 0;
  }
`;

const CustomModalConfirm = ({ trigger, title, content, onOk, onCancel }) => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (onOk) {
      onOk();
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    setIsModalVisible(false);
  };

  const TriggerElement = React.cloneElement(trigger, {
    onClick: showModal,
  });

  return (
    <>
      {TriggerElement}
      <StyledElement
        title={
          <Flex align="center" gap="middle">
            <WarningOutlined />
            {title || t("Tasdiqlash")}
          </Flex>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        width={450}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            {t("Bekor qilish")}
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk}>
            {t("Tasdiqlash")}
          </Button>,
        ]}
      >
        {content || t("Siz haqiqatdan ham buni bajarmoqchimsiz ?")}
      </StyledElement>
    </>
  );
};

export default CustomModalConfirm;
