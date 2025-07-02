import Logo from "@/assets/images/logo-icon.png";
import CustomPasswordInput from "@/components/atoms/form-elements/custom-password-input/CustomPasswordInput";
import CustomPhoneInput from "@/components/atoms/form-elements/custom-phone-input/CustomPhoneInput";
import { httpPostSignIn } from "@/services/api/requests/auth.requests";
import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { getValidationStatus } from "@/utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { RiLockFill } from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import { Button, Card, Col, Flex, Form, Row, Typography } from "antd";
import { get } from "lodash";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { StyledSignInPage } from "./SignInPage.styles";

const { Title, Text } = Typography;

const SignInPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { setAccessToken } = useAuthStore();

  const schema = object().shape({
    username: string().required(t("Telefon raqam kiritilishi kerak !")),
    password: string().required(t("Parol kiritilishi kerak !")),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: httpPostSignIn,
    onSuccess: (data) => {
      setAccessToken(get(data, "data.token"));
      const role = data.data.role;
      if (role === "CLIENT") {
        navigate("/user/user");
      } else if (role === "DELIVER") {
        navigate("/deliver/deliver");
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { username: "", password: "" },
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    mutateAsync(values);
  };

  return (
    <StyledSignInPage>
      <Card>
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
              <Title level={2}>{t("Kirish")}</Title>
              <Text>
                {t(
                  "Iltimos, tizimga kirish uchun hisob ma'lumotlarini kiriting."
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
              <Flex justify="center" vertical gap={"15px"}>
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
                <Form.Item>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                    loading={isPending}
                    disabled={isPending}
                  >
                    {t("Tizimga kirish")}
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Flex align="center" justify="center">
                    <Text>
                      <NavLink to={"/auth/reset-password"}>
                        {t("Parolni unutdingizmi ?")}
                      </NavLink>
                    </Text>
                  </Flex>
                </Form.Item>
                {/* <Form.Item>
                  <Flex align="center" justify="center">
                    <Text>
                      <span style={{ marginRight: "5px" }}>
                        {t("Akkauntingiz bo'lmasa")}:
                      </span>
                      <NavLink to={"/auth/sign-up"}>
                        {t("Ro'yxatdan o'ting")}
                      </NavLink>
                    </Text>
                  </Flex>
                </Form.Item> */}
              </Flex>
            </Form>
          </Col>
        </Row>
      </Card>
    </StyledSignInPage>
  );
};

export default SignInPage;
