import { Typography } from "antd";
import styled from "styled-components";

const { Title } = Typography;

export const StyledPageTitle = styled(Title)`
  margin: 0 !important;
`;

const PageTitle = ({ children, ...rest }) => {
  return (
    <StyledPageTitle level={3} {...rest}>
      {children}
    </StyledPageTitle>
  );
};

export default PageTitle;
