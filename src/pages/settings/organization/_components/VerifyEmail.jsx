import i18n from "@/i18next";
import { httpVerifyUserPassword } from "@/services/api/requests/auth.requests";
import {
  getValidationStatus,
  handleSuccessNotification,
} from "@/utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { RiGovernmentFill } from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import { Button, Card, Col, Flex, Form, Input, Row, Typography } from "antd";
import { get } from "lodash";
import { useState } from "react";
import Countdown from "react-countdown";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { object, string } from "yup";
const { Title, Text } = Typography;

const VerifyEmail = ({ forgotPassword, user_email, setStep }) => {
  const { t } = useTranslation();

  const [countdownDate, setCountdownDate] = useState(Date.now() + 180000);

  const schema = object().shape({
    verification_code: string().required(t("Kod kiritilishi kerak !")),
  });

  const verify = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: httpVerifyUserPassword,
    onSuccess: (data) => {
      handleSuccessNotification(t("Parol muvaffaqiyatli o'zgartirildi !"));
      forgotPassword.reset();
      setStep("change");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    const data = {
      verification_code: Number(get(values, "verification_code", "")),
    };
    verify.mutateAsync(data);
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      setStep("change");
      return null;
    }

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return (
      <span>
        {formattedMinutes}:{formattedSeconds}
      </span>
    );
  };

  return (
    <>
      <Card>
        <Row gutter={[0, 24]}>
          <Col xs={24} md={6}>
            <Form
              layout="vertical"
              className="login-form"
              name="login-form"
              size="large"
              onFinish={handleSubmit(onSubmit)}
            >
              <Row gutter={[15, 15]}>
                <Col xs={24} md={24}>
                  <Flex align="center" justify="center" vertical>
                    <Title level={3}>{t("Tasdiqlash")}</Title>
                    <Text level={5} align="center">
                      {i18n.language === "uz" ? (
                        <>
                          Tasdiqlash kodi <b>{user_email}</b> ga yuborildi.{" "}
                          <br />
                          Iltimos tasdiqlash kodini kiriting !
                        </>
                      ) : i18n.language == "en" ? (
                        <>
                          Verification code sent to <b>{user_email}</b>. <br />
                          Please enter the verification code!
                        </>
                      ) : (
                        <>
                          Код подтверждения отправлен на адрес{" "}
                          <b>{user_email}</b>. <br />
                          Пожалуйста, введите проверочный код!
                        </>
                      )}
                    </Text>
                  </Flex>
                </Col>
                <Col xs={24} md={24}>
                  <Form.Item
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    {...getValidationStatus(errors, "verification_code")}
                    required={true}
                  >
                    <Controller
                      name="verification_code"
                      control={control}
                      render={({ field }) => (
                        <Input.OTP
                          {...field}
                          length={4}
                          prefix={<RiGovernmentFill />}
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={24}>
                  <Form.Item>
                    <Button
                      style={{ width: "100%", marginTop: "10px" }}
                      type="primary"
                      htmlType="submit"
                      loading={verify.isLoading || verify.isPending}
                      disabled={verify.isLoading || verify.isPending}
                    >
                      {t("Tasdiqlash")}
                    </Button>
                  </Form.Item>
                </Col>
                <Col xs={24} md={24}>
                  <Flex align="center" justify="center">
                    <Title level={5}>
                      <Countdown date={countdownDate} renderer={renderer} />
                    </Title>
                  </Flex>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default VerifyEmail;
