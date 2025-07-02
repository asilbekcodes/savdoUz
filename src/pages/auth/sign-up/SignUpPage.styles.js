import styled from "styled-components";

export const StyledSignUpPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.backgroundBaseDefault};

  .ant-card {
    
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo-box {
    color: ${(props) => props.theme.colors.primaryColor};
  }
`;

export const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & > h1 {
    margin: 0;
    padding: 0;
    color: ${(props) => props.theme.colors.textBasePrimary};
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.24px;
  }
  & > span {
    color: ${(props) => props.theme.colors.textBaseSecondary};
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 26px;
    letter-spacing: -0.216px;
  }
`;
