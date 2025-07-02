import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const StyledBackButton = styled(Button)``;

const BackButton = ({ ...rest }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <StyledBackButton
      onClick={() => navigate(-1)}
      icon={<LeftOutlined />}
      {...rest}
    >
      {t("Orqaga")}
    </StyledBackButton>
  );
};

export default BackButton;
