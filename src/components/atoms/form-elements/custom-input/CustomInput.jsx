import { Input } from "antd";
import styled from "styled-components";

export const StyledCustomInput = styled(Input)``;

const CustomInput = ({ ...rest }) => {
  return <StyledCustomInput {...rest} />;
};

export default CustomInput;
