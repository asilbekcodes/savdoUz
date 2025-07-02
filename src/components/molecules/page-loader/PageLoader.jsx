import { ScaleLoader } from "react-spinners";
import styled, { useTheme } from "styled-components";

export const Styled = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageLoader = () => {
  const theme = useTheme();
  return (
    <Styled>
      <ScaleLoader color={theme.colors.primaryColor} />
    </Styled>
  );
};

export default PageLoader;
