import { Typography } from "antd";
import styled from "styled-components";
import React from "react";

const Styled = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const TitleContainer = styled.div`
  display: flex;
  gap: 5px;
  min-width: max-content;
`;

const ValueContainer = styled(Typography.Text)`
  flex: 1;
  word-break: break-word;
`;

const TitleAndIconText = ({ title, value, icon, ...rest }) => {
  return (
    <Styled>
      <TitleContainer>
        {icon && React.cloneElement(icon, { size: 20 })}
        <Typography.Text strong {...rest}>
          {title} :
        </Typography.Text>
      </TitleContainer>
      <ValueContainer>{value}</ValueContainer>
    </Styled>
  );
};

export default TitleAndIconText;
