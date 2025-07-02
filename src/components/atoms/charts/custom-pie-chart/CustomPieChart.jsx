import { Pie } from "@ant-design/charts";

const CustomPieChart = ({ config }) => {
  const isMobile = window.innerWidth < 768;

  const defaultConfig = {
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      text: (d) => `${d.type} / ${d.value}`,
      position: "spider",
    },
    legend: {
      color: {
        title: false,
        position: isMobile ? "top" : "right", // Mobile uchun top, desktop uchun right
        rowPadding: 5,
      },
    },
  };

  return <Pie {...defaultConfig} {...config} />;
};

export default CustomPieChart;
