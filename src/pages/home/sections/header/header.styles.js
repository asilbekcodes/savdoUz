import styled from "styled-components";
import { Element } from "react-scroll";
import bgImage from "@/assets/images/bg.png";
import bgImageMobile from "@/assets/images/bg-mobile.png";

export const HeaderStyled = styled(Element)`
  background-image: url(${bgImage});
  background-position: center bottom;
  background-size: contain;
  background-repeat: no-repeat;
  .main {
    margin-top: 100px;
    .left {
      height: calc(100vh - 100px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 250px;
      .title {
        color: var(--Neutral-D_Grey, #4d4d4d);
        text-align: center;
        font-size: 40px;
        font-style: normal;
        font-weight: 600;
        line-height: 57px; /* 118.75% */
        span {
          color: ${(props) => props.theme.colors.primaryColor};
        }
      }
      .description {
        color: var(--Neutral-Grey, #717171);
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 150% */
        margin-top: 16px;
      }
      button {
        margin-top: 20px;
        border-radius: 10px;
      }
    }
  }

  @media (max-width: 576px) {
    background-image: inherit;
    .main {
      margin-top: 85px;

      .left {
        height: calc(100vh - 85px);
        padding: 0;
        .title {
          font-size: 32px;
          font-weight: 600;
          line-height: 47px; /* 118.75% */
        }
        .description {
          font-size: 14px;
          font-weight: 400;
          line-height: 24px; /* 150% */
          margin-top: 10px;
        }
        button {
          margin-top: 15px;
          border-radius: 10px;
        }
      }
    }
  }
`;
