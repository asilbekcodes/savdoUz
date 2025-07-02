import { Element } from "react-scroll";
import styled from "styled-components";

export const Styled = styled(Element)`
  padding: 80px 0;
  .title {
    color: var(--Neutral-D_Grey, #4d4d4d);
    text-align: center;
    font-size: 36px;
    font-style: normal;
    font-weight: 600;
    line-height: 44px; /* 122.222% */
    margin-bottom: 15px;
  }

  .desc {
    color: var(--Neutral-Grey, #717171);
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }

  .cards {
    padding-top: 50px;
    padding-bottom: 20px;
    .my-card {
      height: 100%;
      padding: 24px;
      border-radius: 8px;
      background: var(--Neutral-White, #fff);
      box-shadow: 0px 2px 4px 0px rgba(171, 190, 209, 0.2);

      .img-box {
        color: ${(props) => props.theme.colors.primaryColor};
      }

      .card-title {
        color: var(--Neutral-D_Grey, #4d4d4d);
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 36px; /* 128.571% */
        margin-top: 15px;
        margin-bottom: 20px;
      }

      .info-data {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          display: flex;
          .icon {
            width: 10px;
            margin-right: 25px;
            svg {
              color: #717171;
            }
          }
          .text {
            color: var(--Neutral-Grey, #717171);
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px; /* 142.857% */
          }
        }
      }
    }
  }

  @media (max-width: 576px) {
    padding: 50px 0;
    .title {
      font-size: 28px;
      line-height: 36px; /* 122.222% */
    }
    .desc {
      font-size: 12px;
      line-height: 18px;
    }

    .cards {
      padding-top: 30px;
      padding-bottom: 10px;

      .my-card {
        padding: 16px;

        .card-title {
          font-size: 16px;
          line-height: 28px;
        }

        .card-desc {
          font-size: 10px;
          line-height: 18px;
        }

        .info-data {
          li {
            .icon {
              width: 20px;
              margin-right: 10px;
            }
            .text {
              font-size: 10px;
              line-height: 18px;
            }
          }
        }
      }
    }
  }
`;
