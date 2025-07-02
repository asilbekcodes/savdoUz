import { Flex, Typography } from "antd";
import styled from "styled-components";
import React from "react";

const { Title } = Typography;

const Styled = styled(Title)`
  .ant-typography {
    margin: 0;
  }
`;

const CardTitle = ({ title, icon, ...rest }) => {
  return (
    <Styled level={4} {...rest}>
      <Flex align="center" gap="small">
        {icon && React.cloneElement(icon, { size: 24 })}
        {title}
      </Flex>
    </Styled>
  );
};

export default CardTitle;
