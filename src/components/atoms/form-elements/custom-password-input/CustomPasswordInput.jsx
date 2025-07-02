import { LockFilled } from "@ant-design/icons";
import { Input } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const { Password } = Input;

export const StyledCustomPasswordInput = styled(Password)``;

const CustomPasswordInput = ({ ...rest }) => {
  const { t } = useTranslation();

  return <StyledCustomPasswordInput prefix={<LockFilled />} {...rest} />;
};

export default CustomPasswordInput;
