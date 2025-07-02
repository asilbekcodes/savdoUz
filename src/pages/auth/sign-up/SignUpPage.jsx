import CustomInput from "@/components/atoms/form-elements/custom-input/CustomInput";
import CustomPasswordInput from "@/components/atoms/form-elements/custom-password-input/CustomPasswordInput";
import { httpPostSignUp } from "@/services/api/requests/auth.requests";
import {
  getValidationStatus,
  handleSuccessNotification,
} from "@/utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  RiCashFill,
  RiGovernmentFill,
  RiLockFill,
  RiMailFill,
} from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import { Button, Card, Col, Flex, Form, Row, Typography } from "antd";
import { get } from "lodash";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Logo from "@/assets/images/logo-icon.png";
import CustomPhoneInput from "@/components/atoms/form-elements/custom-phone-input/CustomPhoneInput";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";
import { StyledSignUpPage } from "./SignUpPage.styles";
import VerifyEmail from "./components/VerifyEmail";

const { Title, Text } = Typography;

const SignUpPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [step, setStep] = useState("register");
  const [user_ID, setUserID] = useState(null);

  const schema = object().shape({
    comp_name: string().required(t("Korxona nomi kiritilishi kerak !")),
    currency_type: string().required(t("Valyuta kiritilishi kerak !")),
    first_name: string().required(t("Ism kiritilishi kerak !")),
    last_name: string().required(t("Familiya kiritilishi kerak !")),
    email: string()
      .email(t("Email to'g'ri formatda bo'lishi kerak !"))
      .required(t("Email kiritilishi kerak !")),
    username: string().required(t("Telefon raqam kiritilishi kerak !")),
    password: string().required(t("Parol kiritilishi kerak !")),
    password2: string()
      .oneOf([ref("password"), null], t("Parollar mos kelishi kerak"))
      .required(t("Parolni qayta kiriting")),
  });

  const signUp = useMutation({
    mutationKey: ["sign-up"],
    mutationFn: httpPostSignUp,
    onSuccess: (data) => {
      handleSuccessNotification(t("Emailga tasdiqlash kodi yuborildi !"));
      setStep("verify");
      setUserID(data.data.user_id);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutateAsync, isPending } = signUp;

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
      company: {
        comp_name: get(values, "comp_name", ""),
        tariff: "BEST",
        currency_type: get(values, "currency_type", "UZS"),
      },
      user: {
        username: get(values, "username", ""),
        first_name: get(values, "first_name", ""),
        last_name: get(values, "last_name", ""),
        email: get(values, "email", ""),
        password: get(values, "password", ""),
      },
    };
    mutateAsync(data);
  };

  return (
    <StyledSignUpPage>
      {step === "verify" ? (
        <VerifyEmail
          user_ID={user_ID}
          signUpData={getValues()}
          setStep={setStep}
        />
      ) : (
        <Card style={{ maxWidth: "600px" }}>
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
                <Title level={2}>{t("Ro'yxatdan o'tish")}</Title>
                <Text>
                  {t(
                    "Iltimos, ro'yxatdan o'tish uchun ma'lumotlaringizni kiriting."
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
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={t("Korxona nomi")}
                      {...getValidationStatus(errors, "comp_name")}
                      required={true}
                    >
                      <Controller
                        name="comp_name"
                        control={control}
                        render={({ field }) => (
                          <CustomInput
                            {...field}
                            prefix={<RiGovernmentFill />}
                          />
                        )}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={t("Valyuta turi")}
                      {...getValidationStatus(errors, "currency_type")}
                      required={true}
                    >
                      <Controller
                        name="currency_type"
                        control={control}
                        render={({ field }) => (
                          <CustomInput {...field} prefix={<RiCashFill />} />
                        )}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={t("Ism")}
                      {...getValidationStatus(errors, "first_name")}
                      required={true}
                    >
                      <Controller
                        name="first_name"
                        control={control}
                        render={({ field }) => <CustomInput {...field} />}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={t("Familiya")}
                      {...getValidationStatus(errors, "last_name")}
                      required={true}
                    >
                      <Controller
                        name="last_name"
                        control={control}
                        render={({ field }) => <CustomInput {...field} />}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={t("Email")}
                      {...getValidationStatus(errors, "email")}
                      required={true}
                    >
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <CustomInput {...field} prefix={<RiMailFill />} />
                        )}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
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
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={t("Parol")}
                      {...getValidationStatus(errors, "password")}
                      required={true}
                    >
                      <Controller
                        name="password"
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
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={t("Parolni tasdiqlang")}
                      {...getValidationStatus(errors, "password2")}
                      required={true}
                    >
                      <Controller
                        name="password2"
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
                    <Form.Item
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        style={{ minWidth: "300px", marginTop: "10px" }}
                        type="primary"
                        htmlType="submit"
                        loading={isPending}
                        disabled={isPending}
                      >
                        {t("Ro'yxatdan o'tish")}
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

export default SignUpPage;
