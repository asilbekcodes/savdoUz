import styled from "styled-components";

export const NavbarStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 1px 1px 5px #efefef;
  background-color: white;

  .desctop-navbar {
    z-index: 100;
    .content {
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .logo-box {
        display: flex;
        align-items: center;
        color: ${(props) => props.theme.colors.primaryColor};
        font-weight: bold;
      }
      ul {
        display: flex;
        align-items: center;
        list-style: none;
        margin: 0;
        padding: 0;
        li {
          margin: 0 25px;
          a {
            color: var(--Text-Gray-900, #18191f);
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 24px; /* 150% */
            cursor: pointer;
            position: relative;

            &::after,
            &::before {
              content: "";
              position: absolute;
              left: 0;
              right: 0;
              bottom: -5px;
              height: 2px;
              background-color: ${(props) => props.theme.colors.primaryColor};
              transform: scaleX(0);
              transform-origin: 50%;
              transition: transform 0.3s;
            }
            &:hover {
              &::before {
                transform-origin: 0% 50%;
                transform: scaleX(1);
              }
              &::after {
                transform-origin: 100% 50%;
                transform: scaleX(1);
              }
            }
          }
          .active {
            text-decoration: none;
            font-weight: bold;
            color: ${(props) => props.theme.colors.primaryColor};
            /* &::before {
              transform-origin: 0% 50%;
              transform: scaleX(1);
            }
            &::after {
              transform-origin: 100% 50%;
              transform: scaleX(1);
            } */
          }
        }
      }
      .right-box {
        button {
          border-radius: 5px;
          padding: 10px;
        }
      }
    }
  }

  .mobile-navbar {
    display: none;
  }

  .left-menu {
    display: none;
  }

  @media (max-width: 576px) {
    .desctop-navbar {
      display: none;
    }

    .mobile-navbar {
      display: block;
      .content-box {
        height: 85px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .right {
      }
    }

    .left-menu {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      position: absolute;
      left: 0;
      transition: 0.2s all linear;
      height: calc(100vh - 100px);
      background-color: #f5f7fa;

      ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        list-style: none;
        margin: 0;
        padding: 0;
        li {
          margin: 15px 0;
          a {
            color: var(--Text-Gray-900, #18191f);
            font-size: 22px;
            font-weight: 500;
            line-height: 24px; /* 150% */
            cursor: pointer;
            position: relative;

            &::after,
            &::before {
              content: "";
              position: absolute;
              left: 0;
              right: 0;
              bottom: -5px;
              height: 2px;
              background-color: ${(props) => props.theme.colors.primaryColor};
              transform: scaleX(0);
              transform-origin: 50%;
              transition: transform 0.3s;
            }
          }
          .active {
            text-decoration: none;
            font-weight: bold;
            color: ${(props) => props.theme.colors.primaryColor};
          }
        }
      }
    }

    .left-menu.close {
      left: -100%;
    }
  }
`;
