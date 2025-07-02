import { Switch } from "antd";
import styled from "styled-components";

const StyledElement = styled(Switch)``;

const CustomSwitch = ({ ...rest }) => {
  return <StyledElement {...rest} />;
};

export default CustomSwitch;
