import { Flex } from "antd";
import { ClockLoader } from "react-spinners";
import { useTheme } from "styled-components";

const PageSpinner = () => {
  const theme = useTheme();

  return (
    <Flex
      align="center"
      justify="center"
      style={{ height: "100vh", width: "100vw" }}
    >
      <ClockLoader size={60} color={theme.colors.primaryColor} />
    </Flex>
  );
};

export default PageSpinner;
