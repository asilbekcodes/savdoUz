import { createGlobalStyle } from "styled-components";

import PoppinsRegularTtf from "../styles/fonts/Poppins/Poppins-Regular.ttf";

export default createGlobalStyle`

  * {
     font-family: 'Poppins';
     margin: 0;
     padding: 0;
     box-sizing: border-box;
  }

  @font-face {
    font-family: 'Poppins';
    font-weight: normal;
    font-style: normal;
    font-display: swap;
    src: url(${PoppinsRegularTtf}) format('truetype');
  }

  a{
    text-decoration: none !important;
  }

  .ant-form-item {
    margin-bottom: 0px;
  }

  .ant-card-head{
    padding-top: 10px !important;
    padding-bottom: 10px !important;
  }

`;
