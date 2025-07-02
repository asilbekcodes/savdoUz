import { DatePicker } from "antd";
import styled from "styled-components";

export const StyledElement = styled(DatePicker)`
  width: 100%;
`;

const CustomDatePicker = ({ ...rest }) => {
  return (
    <StyledElement
      showTime={{ format: "HH:mm" }}
      format="YYYY-MM-DD HH:mm"
      {...rest}
    />
  );
};

export default CustomDatePicker;
