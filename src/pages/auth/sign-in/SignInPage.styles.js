import { Card as AntdCard, Typography } from "antd";
import styled from "styled-components";

export const StyledSignInPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.backgroundBaseDefault};

  .ant-card {
    max-width: 400px;
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

export const Card = styled(AntdCard)`
  display: flex;
  width: 416px;
  padding: ${(props) => props.theme.spacing.spacing32};
  border-radius: ${(props) => props.theme.radius.radius2xl};
  border: 1px solid ${(props) => props.theme.colors.borderActionNormal};
  background-color: ${(props) => props.theme.colors.backgroundSurfaceDefault};
  box-shadow: 0px 1px 2px 0px rgba(20, 21, 26, 0.05);
`;

export const FooterText = styled(Text)`
  position: absolute;
  bottom: 30px;
  color: ${(props) => props.theme.colors.textBaseTertiary};
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.16px;
`;
