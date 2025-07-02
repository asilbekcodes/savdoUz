import Logo from "@/assets/images/logo-icon.png";
import i18n from "@/i18next";
import {
  httpPostConfirmVerificationCode,
  httpPostSignIn,
} from "@/services/api/requests/auth.requests";
import useAuthStore from "@/store/useAuthStore";
import { getValidationStatus } from "@/utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { RiGovernmentFill } from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import { Button, Card, Col, Flex, Form, Input, Row, Typography } from "antd";
import { get } from "lodash";
import { useState } from "react";
import Countdown from "react-countdown";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
const { Title, Text } = Typography;

const VerifyEmail = ({ user_ID, signUpData, setStep }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setAccessToken } = useAuthStore();

  const [countdownDate, setCountdownDate] = useState(Date.now() + 180000);

  const schema = object().shape({
    verification_code: string().required(t("Kod kiritilishi kerak !")),
  });

  const login = useMutation({
    mutationKey: ["login"],
    mutationFn: httpPostSignIn,
    onSuccess: (data) => {
      setAccessToken(get(data, "data.token"));
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const verify = useMutation({
    mutationKey: ["verify-email"],
    mutationFn: httpPostConfirmVerificationCode,
    onSuccess: (data) => {
      login.mutateAsync({
        username: get(signUpData, "username", ""),
        password: get(signUpData, "password", ""),
      });
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
      user_id: user_ID,
      verification_code: Number(get(values, "verification_code", "")),
    };
    verify.mutateAsync(data);
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      setStep("register");
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
      <Card style={{ maxWidth: "300px" }}>
        <Row gutter={[0, 24]}>
          <Col span={24}>
            <Flex align="center" justify="center">
              <img
                onClick={() => navigate("/")}
                src={Logo}
                style={{ width: "100px", cursor: "pointer" }}
                alt=""
              />
            </Flex>
          </Col>
          <Col span={24}>
            <Flex align="center" justify="center" vertical>
              <Title level={2}>{t("Tasdiqlash")}</Title>
              <Text level={5} align="center">
                {i18n.language === "uz" ? (
                  <>
                    Tasdiqlash kodi <b>{get(signUpData, "email", "")}</b> ga
                    yuborildi. <br />
                    Iltimos tasdiqlash kodini kiriting !
                  </>
                ) : i18n.language == "en" ? (
                  <>
                    Verification code sent to{" "}
                    <b>{get(signUpData, "email", "")}</b>. <br />
                    Please enter the verification code!
                  </>
                ) : (
                  <>
                    Код подтверждения отправлен на адрес{" "}
                    <b>{get(signUpData, "email", "")}</b>. <br />
                    Пожалуйста, введите проверочный код!
                  </>
                )}
              </Text>
            </Flex>
          </Col>

          <Col span={24}>
            <Form
              layout="vertical"
              className="login-form"
              name="login-form"
              size="large"
              onFinish={handleSubmit(onSubmit)}
            >
              <Row gutter={[15, 15]}>
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
                  <Form.Item style={{ marginTop: "20px" }}>
                    <Button
                      style={{ width: "100%" }}
                      type="primary"
                      htmlType="submit"
                      loading={
                        verify.isLoading ||
                        verify.isPending ||
                        login.isLoading ||
                        login.isPending
                      }
                      disabled={
                        verify.isLoading ||
                        verify.isPending ||
                        login.isLoading ||
                        login.isPending
                      }
                    >
                      {t("Tasdiqlash")}
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>

          <Col span={24}>
            <Flex align="center" justify="center">
              <Title level={5}>
                <Countdown date={countdownDate} renderer={renderer} />
              </Title>
            </Flex>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default VerifyEmail;
