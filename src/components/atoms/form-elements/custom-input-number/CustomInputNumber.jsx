import { InputNumber } from "antd";
import styled from "styled-components";

export const StyledCustomInputNumber = styled(InputNumber)``;

const CustomInputNumber = ({ ...rest }) => {
  const formatter = (value) => {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const parser = (value) => {
    return value.replace(/\s/g, "");
  };

  return (
    <StyledCustomInputNumber
      // addonAfter="UZS"
      formatter={formatter}
      parser={parser}
      style={{ width: "100%" }}
      {...rest}
    />
  );
};

export default CustomInputNumber;
