import Logo from "@/assets/images/logo-icon.png";
import CustomPasswordInput from "@/components/atoms/form-elements/custom-password-input/CustomPasswordInput";
import CustomPhoneInput from "@/components/atoms/form-elements/custom-phone-input/CustomPhoneInput";
import { httpForgotPassword } from "@/services/api/requests/auth.requests";
import {
  getValidationStatus,
  handleSuccessNotification,
} from "@/utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { RiLockFill } from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import { Button, Card, Col, Flex, Form, Row, Typography } from "antd";
import { get } from "lodash";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";
import { StyledSignUpPage } from "../sign-up/SignUpPage.styles";
import VerifyEmail from "./components/VerifyEmail";

const { Title, Text } = Typography;

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [step, setStep] = useState("register");
  const [user_ID, setUserID] = useState(null);
  const [user_email, setUserEmail] = useState(null);

  const schema = object().shape({
    username: string().required(t("Telefon raqami kiritilishi kerak !")),
    new_password: string().required(t("Parol kiritilishi kerak !")),
    new_password2: string()
      .oneOf([ref("new_password"), null], t("Parollar mos kelishi kerak !"))
      .required(t("Parolni qayta kiriting !")),
  });

  const forgotPassword = useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: httpForgotPassword,
    onSuccess: (data) => {
      handleSuccessNotification(t("Emailga tasdiqlash kodi yuborildi !"));
      setStep("verify");
      setUserID(data.data.user_id);
      setUserEmail(data.data.user_email);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutateAsync, isPending } = forgotPassword;

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: { phone: "", password: "" },
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    const data = {
      username: get(values, "username", ""),
      new_password: get(values, "new_password", ""),
    };
    mutateAsync(data);
  };

  return (
    <StyledSignUpPage>
      {step === "verify" ? (
        <VerifyEmail
          forgotPasswordData={getValues()}
          setStep={setStep}
          user_email={user_email}
        />
      ) : (
        <Card style={{ maxWidth: "350px" }}>
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
                <Title level={2}>{t("Parolni tiklash")}</Title>
                <Text>
                  {t("Iltimos, email va yangi parolingizni kiriting.")}
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
                      label={t("Telefon raqam")}
                      {...getValidationStatus(errors, "username")}
                      required={true}
                    >
                      <Controller
                        name="username"
                        control={control}
                        render={({ field }) => <CustomPhoneInput {...field} />}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={24}>
                    <Form.Item
                      label={t("Yangi parol")}
                      {...getValidationStatus(errors, "new_password")}
                      required={true}
                    >
                      <Controller
                        name="new_password"
                        control={control}
                        render={({ field }) => (
                          <CustomPasswordInput
                            {...field}
                            placeholder={t("Parolni kiriting")}
                            prefix={<RiLockFill />}
                          />
                        )}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24}>
                    <Form.Item
                      label={t("Parolni tasdiqlang")}
                      {...getValidationStatus(errors, "new_password2")}
                      required={true}
                    >
                      <Controller
                        name="new_password2"
                        control={control}
                        render={({ field }) => (
                          <CustomPasswordInput
                            {...field}
                            placeholder={t("Parolni qayta kiriting")}
                            prefix={<RiLockFill />}
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
                        loading={isPending}
                        disabled={isPending}
                      >
                        {t("Yuborish")}
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24}>
                    <Form.Item>
                      <Flex align="center" justify="center">
                        <Text>
                          <span style={{ marginRight: "5px" }}>
                            {t("Akkauntingiz bo'lsa")}:
                          </span>
                          <NavLink to={"/auth/sign-in"}>{t("Kirish")}</NavLink>
                        </Text>
                      </Flex>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>
      )}
    </StyledSignUpPage>
  );
};

export default ResetPasswordPage;
