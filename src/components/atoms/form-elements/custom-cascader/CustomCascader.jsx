import { Cascader } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const StyledCustomCascader = styled(Cascader)``;

const CustomCascader = ({ ...rest }) => {
  const { t } = useTranslation();

  return (
    <StyledCustomCascader
      allowClear={true}
      autoClearSearchValue={true}
      placeholder={t("Tanlang")}
      virtual={false}
      placement={"topLeft"}
      showSearch={true}
      optionFilterProp="label"
      style={{
        width: "100%",
      }}
      maxTagCount="responsive"
      {...rest}
    />
  );
};

export default CustomCascader;
