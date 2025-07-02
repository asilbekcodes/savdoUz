import { Line } from "@ant-design/plots";

const CustomLineChart = ({ config }) => {
  const defaultConfig = {
    xField: "type",
    yField: "value",
    point: {
      shapeField: "square",
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };

  return <Line {...config} {...defaultConfig} />;
};

export default CustomLineChart;
