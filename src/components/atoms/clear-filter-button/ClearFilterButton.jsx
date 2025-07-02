import { ClearOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

export const StyledClearFilterButton = styled(Button)``;

const ClearFilterButton = ({ children, ...rest }) => {
  const { t } = useTranslation();
  return (
    <StyledClearFilterButton icon={<ClearOutlined />} {...rest}>
      {children || t("Filterni tozalash")}
    </StyledClearFilterButton>
  );
};

export default ClearFilterButton;
