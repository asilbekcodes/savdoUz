import { Card, Statistic } from "antd";
import { useTranslation } from "react-i18next";
import styled, { useTheme } from "styled-components";
import CountUp from "react-countup";

const formatter = (value) => <CountUp end={value} separator=" " />;

export const Styled = styled(Card)``;

const CustomStatisticsCard = ({ ...rest }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Styled>
      <Statistic
        valueStyle={{
          color: theme.colors.primaryColor,
        }}
        formatter={formatter}
        {...rest}
      />
    </Styled>
  );
};

export default CustomStatisticsCard;
