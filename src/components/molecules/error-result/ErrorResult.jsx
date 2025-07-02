import { Card, Result, Typography } from "antd";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

export const StyledErrorResult = styled(Result)``;

const ErrorResult = ({ error, ...rest }) => {
  const { t } = useTranslation();
  const langStore = localStorage.getItem("langStore");
  const lang = get(JSON.parse(langStore), "state.lang", "uz");
  return (
    <Card>
      <StyledErrorResult
        status="error"
        title={get(error?.response?.data?.error, "message", t("Xatolik"))}
        subTitle={
          <Typography.Text>
            {get(error?.response?.data?.error, lang, get(error, "message", ""))}
          </Typography.Text>
        }
        {...rest}
      />
    </Card>
  );
};

export default ErrorResult;
