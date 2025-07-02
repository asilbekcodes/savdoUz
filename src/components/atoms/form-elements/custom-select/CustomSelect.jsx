import { Select } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

export const StyledCustomSelect = styled(Select)``;

const CustomSelect = ({ ...rest }) => {
  const { t } = useTranslation();

  return (
    <StyledCustomSelect
      allowClear={true}
      autoClearSearchValue={true}
      placeholder={t("Tanlang")}
      virtual={false}
      placement={"bottomLeft"}
      showSearch={true}
      optionFilterProp="label"
      maxTagCount={"responsive"}
      {...rest}
    />
  );
};

export default CustomSelect;
