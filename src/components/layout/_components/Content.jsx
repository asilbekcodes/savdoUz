import React from "react";
import { Outlet } from "react-router-dom";
import * as S from "../Layout.styles";

const Content = () => {
  return (
    <S.Content>
      <Outlet />
    </S.Content>
  );
};

export default Content;
