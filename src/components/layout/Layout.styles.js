import { devices } from "@/styles/breakpoints/device";
import styled, { css } from "styled-components";

const SIDEBAR_OPEN_WIDTH = "250px";
const SIDEBAR_CLOSE_WIDTH = "80px";
const OPEN_CLOSE_TRANSITION = "0.2s all ease";

export const Layout = styled.div`
  .content-box {
    height: 100vh;
    transition: ${OPEN_CLOSE_TRANSITION};
    ${(props) => {
      switch (props.openSidebar) {
        case true:
          return css`
            margin-left: ${SIDEBAR_OPEN_WIDTH};
            width: calc(100% - ${SIDEBAR_OPEN_WIDTH});
          `;
        case false:
          return css`
            margin-left: ${SIDEBAR_CLOSE_WIDTH};
            width: calc(100% - ${SIDEBAR_CLOSE_WIDTH});
          `;
      }
    }};
  }

  @media only screen and ${devices.md} {
    .content-box {
      height: 100vh;
      transition: ${OPEN_CLOSE_TRANSITION};
      margin-left: 0;
      width: 100%;
    }
  }
`;

export const Sidebar = styled.div`
  position: fixed;
  top: 0;
  transition: ${OPEN_CLOSE_TRANSITION};
  height: 100vh;
  background-color: ${(props) => props.theme.colors.backgroundSidebar};

  ${(props) => {
    switch (props.openSidebar) {
      case true:
        return css`
          width: ${SIDEBAR_OPEN_WIDTH};
        `;
      case false:
        return css`
          width: ${SIDEBAR_CLOSE_WIDTH};
        `;
    }
  }}

  @media only screen and ${devices.md} {
    position: fixed;
    z-index: 100;
    width: ${SIDEBAR_OPEN_WIDTH};
    ${(props) => {
      switch (props.openSidebar) {
        case true:
          return css`
            transform: translateX(0);
          `;
        case false:
          return css`
            transform: translateX(-${SIDEBAR_OPEN_WIDTH});
          `;
      }
    }}
  }

  .logo-box {
    height: 70px;
    display: flex;
    align-items: center;
    transition: ${OPEN_CLOSE_TRANSITION};
    box-sizing: border-box;
    border-bottom: 1px solid ${(props) => props.theme.colors.borderNormal};
    .logo {
      color: ${(props) => props.theme.colors.primaryColor};
      font-weight: bold;
    }
    ${(props) => {
      switch (props.openSidebar) {
        case true:
          return css`
            padding-left: 30px;
          `;
        case false:
          return css`
            display: flex;
            align-items: center;
            justify-content: center;
          `;
      }
    }};

    .mobile-open-close-btn {
      display: none;
    }

    @media only screen and ${devices.md} {
      padding: 0px 15px;
      display: flex;
      justify-content: space-between;
      .mobile-open-close-btn {
        border: 1px solid ${(props) => props.theme.colors.borderNormal};
        height: 30px;
        width: 30px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        svg {
          width: 20px;
          color: ${(props) => props.theme.colors.textBaseSecondary};
          transition: ${OPEN_CLOSE_TRANSITION};
          ${(props) => {
            switch (props.openSidebar) {
              case true:
                return css`
                  transform: rotate(0);
                `;
              case false:
                return css`
                  transform: rotate(180deg);
                `;
            }
          }}
        }
      }
    }
  }

  .menu-box {
    height: calc(100vh - 70px);
    padding: 40px 15px;
    box-sizing: border-box;
    position: relative;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      height: 20px;
      background-color: ${(props) => props.theme.colors.backgroundBaseDefault};
    }

    &::-webkit-scrollbar-thumb {
      background: #e4e7f4;
    }
  }
`;

export const Category = styled.div`
  &:not(:last-child) {
    margin-bottom: 10px;
  }
  .label {
    transition: ${OPEN_CLOSE_TRANSITION};
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    border-radius: 5px;

    .left {
      display: flex;
      align-items: center;
      svg {
        margin-right: 10px;
        width: 20px;
        color: ${(props) => props.theme.colors.primaryColor};
      }
      .title {
        color: ${(props) => props.theme.colors.textBasePrimary};
        font-size: 11px;
        font-style: normal;
        font-weight: 600;
        line-height: 11px;
        letter-spacing: 1px;
      }
    }

    .arrow-icon {
      display: flex;
      align-items: center;
      svg {
        transition: 0.3s all linear;
        width: 20px;
        ${(props) => {
          switch (props.open) {
            case false:
              return css`
                transform: rotate(0);
              `;
            case true:
              return css`
                transform: rotate(-180deg);
              `;
          }
        }};

        ${(props) => {
          switch (props.openSidebar) {
            case true:
              return css`
                color: ${(props) => props.theme.colors.primaryColor};
              `;
            case false:
              return css`
                color: white;
              `;
          }
        }};
      }
    }

    @media only screen and ${devices.xxl} {
      ${(props) => {
        switch (props.openSidebar) {
          case true:
            return css``;
          case false:
            return css`
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: ${(props) => props.theme.colors.primaryColor};
            `;
        }
      }};
    }

    @media only screen and ${devices.md} {
      ${(props) => {
        switch (props.openSidebar) {
          case true:
            return css``;
          case false:
            return css`
              display: initial;
              align-items: center;
              justify-content: initial;
              background-color: initial;
            `;
        }
      }};
    }
  }
  .menu {
    transition: ${OPEN_CLOSE_TRANSITION};
    margin: 5px 0;
    ${(props) => {
      switch (props.open) {
        case false:
          return css`
            opacity: 0;
            height: 0;
            overflow: hidden;
          `;
        case true:
          return css`
            opacity: 1;
            height: initial;
            overflow: hidden;
          `;
      }
    }};
    list-style: none;
    padding: 0;
    .menu-item {
      margin: 2px 0;
      .menu-item-link {
        display: flex;
        align-items: center;
        padding: 15px 15px;
        border-radius: 5px;
        text-decoration: none;
        transition: ${OPEN_CLOSE_TRANSITION};
        .icon {
          display: flex;
          align-items: center;
          svg {
            display: inline-block !important;
            width: 20px !important;
            height: 20px !important;
            color: ${(props) => props.theme.colors.iconBaseSecondary};
          }
        }
        .title {
          margin-left: 12px;
          color: ${(props) => props.theme.colors.textBaseSecondary};
          font-size: 12px;
          font-weight: 400;
          line-height: 12px;
          letter-spacing: 0.5px;
        }
        &:hover {
          background-color: ${(props) =>
            props.theme.colors.backgroundSidebarHover};
        }
      }
      .active {
        background-color: ${(props) =>
          props.theme.colors.backgroundSidebarHover};
        .title {
          color: ${(props) => props.theme.colors.primaryColor};
          font-weight: bold;
        }
        .icon svg {
          color: ${(props) => props.theme.colors.primaryColor};
        }
      }
    }
  }
`;

export const Header = styled.div`
  width: 100%;
  height: 70px;
  position: sticky;
  top: 0;
  padding: 0 40px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.colors.backgroundBaseDefault};
  border-bottom: 1px solid ${(props) => props.theme.colors.borderNormal};
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .ant-select {
    height: 34px;
  }

  @media only screen and ${devices.md} {
    padding: 0 15px;
  }

  .switch-theme {
    width: 35px;
    height: 35px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.backgroundLittleElement};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    svg {
      width: 15px;
      color: #b0c3cc;
      color: ${(props) => props.theme.colors.themeIconColor};
    }
  }

  .open-close-btn {
    border: 1px solid ${(props) => props.theme.colors.borderNormal};
    height: 30px;
    width: 30px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    svg {
      width: 20px;
      color: ${(props) => props.theme.colors.textBaseSecondary};
      transition: ${OPEN_CLOSE_TRANSITION};
      ${(props) => {
        switch (props.openSidebar) {
          case true:
            return css`
              transform: rotate(0);
            `;
          case false:
            return css`
              transform: rotate(180deg);
            `;
        }
      }}
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  padding: 40px;
  box-sizing: border-box;
  min-height: calc(100vh - 70px);
  background-color: ${(props) => props.theme.colors.backgroundBaseDefault};

  @media only screen and ${devices.md} {
    padding: 30px 15px;
  }
`;
