import { Tabs } from "antd";
import styled from "styled-components";

const Styled = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 25px;
    /* overflow-x: auto;
    overflow-y: auto; */
  }
`;

// Create your component
const CustomTabs = ({ children, ...rest }) => {
  return <Styled {...rest}>{children}</Styled>;
};

export default CustomTabs;
