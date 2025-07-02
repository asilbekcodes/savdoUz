import { DatePicker } from "antd";
import dayjs from "dayjs";
import styled from "styled-components";

const { RangePicker } = DatePicker;

export const StyledElement = styled(RangePicker)`
  width: 100%;
`;

const rangePresets = [
  {
    label: "Last 7 Days",
    value: [dayjs().add(-7, "d"), dayjs()],
  },
  {
    label: "Last 14 Days",
    value: [dayjs().add(-14, "d"), dayjs()],
  },
  {
    label: "Last 30 Days",
    value: [dayjs().add(-30, "d"), dayjs()],
  },
  {
    label: "Last 90 Days",
    value: [dayjs().add(-90, "d"), dayjs()],
  },
];

const CustomDateRangePicker = ({ ...rest }) => {
  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    } else {
      console.log("Clear");
    }
  };

  return (
    <StyledElement
      presets={rangePresets}
      onChange={onRangeChange}
      format="YYYY-MM-DD"
      {...rest}
    />
  );
};

export default CustomDateRangePicker;
