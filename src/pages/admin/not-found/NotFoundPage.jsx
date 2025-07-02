import { Button, Flex, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Flex align="center" justify="center" style={{ height: "70vh" }}>
      <Result
        status="404"
        title="404"
        subTitle={t("Kechirasiz, siz tashrif buyurgan sahifa mavjud emas.")}
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            {t("Asosiy sahifaga qaytish")}
          </Button>
        }
      />
    </Flex>
  );
};

export default NotFound;
