import { Column } from "@ant-design/plots";

const CustomColumnChart = ({ config }) => {
  const defaultConfig = {
    xField: "type",
    yField: "value",
    colorField: "type",
    legend: false,
    height: 450,
    label: {
      text: (d) => new Intl.NumberFormat().format(d.value),
      textBaseline: "bottom",
    },
    style: {
      maxWidth: 100,
    },
    axis: {
      y: {
        labelFormatter: (value) => new Intl.NumberFormat().format(value),
      },
      // x: {
      //   labelFormatter: (val) => `${val} 月`,
      // },
    },
  };

  return <Column {...config} {...defaultConfig} />;
};

export default CustomColumnChart;
