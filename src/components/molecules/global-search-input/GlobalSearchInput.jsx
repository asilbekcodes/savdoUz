import { Input } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const { Search } = Input;

export const StyledGlobalSearchInput = styled(Search)``;

const GlobalSearchInput = ({ children, ...rest }) => {
  const { t } = useTranslation();
  return (
    <StyledGlobalSearchInput placeholder={t("Qidiruv")} enterButton {...rest}>
      {children}
    </StyledGlobalSearchInput>
  );
};

export default GlobalSearchInput;
