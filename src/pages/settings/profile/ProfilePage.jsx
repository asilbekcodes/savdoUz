import CustomTabs from "@/components/atoms/custom-tabs/CustomTabs";
import CustomPasswordInput from "@/components/atoms/form-elements/custom-password-input/CustomPasswordInput";
import ErrorResult from "@/components/molecules/error-result/ErrorResult";
import PageLoader from "@/components/molecules/page-loader/PageLoader";
import PageTitle from "@/components/molecules/page-title/PageTitle";
import TitleAndIconText from "@/components/molecules/title-and-icon-text/TitleAndIconText";
import {
  httpGetMe,
  httpUpdateMe,
  httpUpdateUserPassword,
} from "@/services/api/requests/auth.requests";
import {
  getValidationStatus,
  handleSuccessNotification,
  scrollToTop,
} from "@/utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  RiIdCardFill,
  RiLockFill,
  RiMailFill,
  RiPhoneFill,
  RiUser2Fill,
  RiUserSmileFill,
} from "@remixicon/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Flex,
  Form,
  Row,
  Tabs,
  Typography,
} from "antd";
import { get } from "lodash";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";
import ProfileForm from "./_components/ProfileForm";
import VerifyEmail from "./_components/VerifyEmail";
import { useDetailBreadcrumbItems } from "./breadcrumbs/useDetailBreadcrumb";

const ProfilePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
    isRefetching,
    ...rest
  } = useQuery({
    queryKey: ["me"],
    queryFn: () => httpGetMe(),
    select: (response) => response.data,
  });

  const BREADCRUMB_ITEMS = useDetailBreadcrumbItems();

  return (
    <>
      <Helmet>
        <title>{t("Profil")}</title>
      </Helmet>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Flex align="center" justify="space-between">
            <PageTitle>{t("Profil")}</PageTitle>
          </Flex>
        </Col>
        <Col span={24}>
          <Breadcrumb items={BREADCRUMB_ITEMS} />
        </Col>
        <Col span={24}>
          {isLoading ? (
            <PageLoader />
          ) : (
            <>
              {error ? (
                <ErrorResult error={error} />
              ) : (
                <>
                  <CustomTabs tabPosition={"top"}>
                    <Tabs.TabPane tab={t("Hisob ma'lumotlari")} key="1">
                      <Row gutter={[20, 20]}>
                        <Col xs={24} md={24}>
                          <Card>
                            <Flex vertical gap={"large"}>
                              <TitleAndIconText
                                title={t("Ism").toUpperCase()}
                                value={get(data, "first_name", "")}
                                icon={<RiUser2Fill />}
                              />
                              <TitleAndIconText
                                title={t("Familiya").toUpperCase()}
                                value={get(data, "last_name", "")}
                                icon={<RiUserSmileFill />}
                              />
                              <TitleAndIconText
                                title={t("Telefon raqami").toUpperCase()}
                                value={get(data, "username", "")}
                                icon={<RiPhoneFill />}
                              />
                              <TitleAndIconText
                                title={t("Email").toUpperCase()}
                                value={get(data, "email", "")}
                                icon={<RiMailFill />}
                              />
                              <TitleAndIconText
                                title={t("Rol").toUpperCase()}
                                value={get(data, "role", "")}
                                icon={<RiIdCardFill />}
                              />
                            </Flex>
                          </Card>
                        </Col>
                      </Row>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={t("Ma'lumotlarni o'zgartirish")} key="2">
                      <UpdateProfile user={data} refetch={refetch} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={t("Parolni o'zgartirish")} key="3">
                      <ResetPassword />
                    </Tabs.TabPane>
                  </CustomTabs>
                </>
              )}
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;

const UpdateProfile = ({ user, refetch }) => {
  const { t } = useTranslation();

  const handleSuccess = () => {
    scrollToTop();
    handleSuccessNotification(t("Muvaffaqiyatli bajarildi !"));
    refetch();
  };

  const { isPending, mutateAsync } = useMutation({
    mutationFn: httpUpdateMe,
    onSuccess: handleSuccess,
    onError: (error) => {
      scrollToTop();
      console.log(error);
    },
  });

  const handleSubmit = async (values, reset) => {
    mutateAsync({
      first_name: get(values, "first_name", ""),
      last_name: get(values, "last_name", ""),
      username: get(values, "username", ""),
    });
  };

  return (
    <>
      <ProfileForm
        handleSubmit={handleSubmit}
        defaultValues={user}
        actionLoading={isPending}
      />
    </>
  );
};

const ResetPassword = () => {
  const { t } = useTranslation();

  const [step, setStep] = useState("change");
  const [user_email, setUserEmail] = useState(null);

  const schema = object().shape({
    new_password: string().required(t("Parol kiritilishi kerak !")),
    new_password2: string()
      .oneOf([ref("new_password"), null], t("Parollar mos kelishi kerak !"))
      .required(t("Parolni qayta kiriting !")),
  });

  const forgotPassword = useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: httpUpdateUserPassword,
    onSuccess: (data) => {
      handleSuccessNotification(t("Emailga tasdiqlash kodi yuborildi !"));
      setStep("verify");
      setUserEmail(data.data.email);
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
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    const data = {
      new_password: get(values, "new_password", ""),
    };
    mutateAsync(data);
  };

  return (
    <>
      {step === "verify" ? (
        <VerifyEmail setStep={setStep} user_email={user_email} resetPassword={reset} />
      ) : (
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
                        {t("O'zgartirish")}
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>
      )}
    </>
  );
};
