import { Input } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const { TextArea } = Input;

const StyledCustomTextarea = styled(TextArea)``;

const CustomTextarea = ({ ...rest }) => {
  const { t } = useTranslation();

  return <StyledCustomTextarea rows={4} placeholder={t("Izoh")} {...rest} />;
};

export default CustomTextarea;
