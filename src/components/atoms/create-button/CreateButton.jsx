import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

export const StyledCreateButton = styled(Button)``;

const CreateButton = ({ children, ...rest }) => {
  const { t } = useTranslation();
  return (
    <StyledCreateButton type="primary" icon={<PlusOutlined />} {...rest}>
      {children || t("Qo'shish")}
    </StyledCreateButton>
  );
};

export default CreateButton;
