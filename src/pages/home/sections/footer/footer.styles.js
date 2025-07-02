import { Element } from "react-scroll";
import styled from "styled-components";

export const Styled = styled(Element)`
  padding-top: 50px;
  padding-bottom: 30px;
  .box {
    .title {
      color: #181433;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px;
      margin-bottom: 24px;
    }
    .commit {
      color: #757095;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px; /* 175% */
      letter-spacing: -0.32px;
    }
    .contact-box {
      display: flex;
      align-items: center;
      margin-top: 25px;
      svg {
        margin-right: 15px;
        color: ${(props) => props.theme.colors.primaryColor};
      }
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        margin-bottom: 10px;
        a,
        .phone {
          color: #181433;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 24px; /* 150% */
          svg {
            color: ${(props) => props.theme.colors.primaryColor};
          }
        }
        .active {
          font-weight: bold;
          text-decoration: none;
        }
      }
    }
  }

  .footer-border {
    background-color: #e5e5ea;
    height: 1px;
    margin: 30px 0;
  }

  .text {
    color: #181433;
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px; /* 162.5% */
    letter-spacing: -0.32px;
  }

  @media (max-width: 576px) {
    .box {
      .title {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 20px;
      }
      .commit {
        font-size: 12px;
        line-height: 28px; /* 175% */
      }
      .contact-box {
        margin-top: 20px;
        svg {
          margin-right: 15px;
          color: ${(props) => props.theme.colors.primaryColor};
        }
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        li {
          margin-bottom: 10px;
          a,
          .phone {
            color: #181433;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 24px; /* 150% */
            svg {
              color: ${(props) => props.theme.colors.primaryColor};
            }
          }
          .active {
            font-weight: bold;
            text-decoration: none;
          }
        }
      }
    }

    .footer-border {
      background-color: #e5e5ea;
      height: 1px;
      margin: 30px 0;
    }

    .text {
      color: #181433;
      text-align: center;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 26px; /* 162.5% */
      letter-spacing: -0.32px;
    }
  }
`;
