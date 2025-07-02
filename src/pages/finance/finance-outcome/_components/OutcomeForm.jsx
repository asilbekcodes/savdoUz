import CustomDatePicker from "@/components/atoms/form-elements/custom-date-picker/CustomDatePicker";
import CustomInputNumber from "@/components/atoms/form-elements/custom-input-number/CustomInputNumber";
import CustomSelect from "@/components/atoms/form-elements/custom-select/CustomSelect";
import CustomTextarea from "@/components/atoms/form-elements/custom-textarea/CustomTextarea";
import useFinanceTransactions from "@/hooks/api/useFinanceTransactions";
import { prepareFinanceOutcomeDto } from "@/services/api/prepare-data/finance-outcome";
import useCompanyStore from "@/store/useCompanyStore";
import { getValidationStatus } from "@/utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { RiBankCardLine, RiCashLine, RiCopperCoinLine } from "@remixicon/react";
import { Button, Col, Divider, Flex, Form, Row } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { object, string } from "yup";

const OutcomeForm = ({
  defaultValues,
  handleSubmit,
  actionLoading = false,
  readOnly = false,
}) => {
  const { t } = useTranslation();

  const {
    company: { currency_type },
  } = useCompanyStore();

  const validationSchema = object()
    .shape({
      transaction: string().required(t("Maydonni kiritishingiz shart !")),
      cash: string().nullable(),
      card: string().nullable(),
      other: string().nullable(),
    })
    .test(
      "one-of-three-required",
      t("Naqt, Karta orqali yoki Boshqa maydonlaridan biri kiritilishi shart!"),
      function (value) {
        const { path, createError } = this;
        const cash = parseFloat(value.cash) || 0;
        const card = parseFloat(value.card) || 0;
        const other = parseFloat(value.other) || 0;

        if (cash > 0 || card > 0 || other > 0) {
          return true;
        }

        return createError({
          path: `${path}.cash`,
          message: t(
            "Naqt, Karta orqali yoki Boshqa maydonlaridan biri kiritilishi shart!"
          ),
        });
      }
    );

  const resolver = yupResolver(validationSchema);

  const { transactionsOptions } = useFinanceTransactions();

  const {
    control,
    formState: { errors },
    reset,
    watch,
    ...rest
  } = useForm({
    defaultValues: {
      date: dayjs(),
      cash: 0,
      card: 0,
      other: 0,
      ...defaultValues,
    },
    resolver,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const handleReset = () => reset({});

  const onSubmit = rest.handleSubmit((values) => {
    handleSubmit(prepareFinanceOutcomeDto(values), handleReset);
  });

  return (
    <Form
      layout="vertical"
      className="create-form"
      name="create-form"
      size="large"
      onFinish={onSubmit}
    >
      <Divider />
      <Row gutter={[20, 20]}>
        <Col xs={24} md={6}>
          <Form.Item
            label={t("Tranzaktsiya")}
            {...getValidationStatus(errors, "transaction")}
            required={true}
          >
            <Controller
              name="transaction"
              control={control}
              render={({ field }) => (
                <CustomSelect options={transactionsOptions} {...field} />
              )}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={6}>
          <Form.Item
            label={t("Naqt")}
            {...getValidationStatus(errors, "cash")}
            required={true}
            help={errors.cash?.message}
            validateStatus={errors.cash ? "error" : ""}
          >
            <Controller
              name="cash"
              control={control}
              render={({ field }) => (
                <CustomInputNumber
                  addonAfter={currency_type}
                  prefix={<RiCashLine />}
                  {...field}
                />
              )}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item
            label={t("Karta orqali")}
            {...getValidationStatus(errors, "card")}
            required={true}
          >
            <Controller
              name="card"
              control={control}
              render={({ field }) => (
                <CustomInputNumber
                  addonAfter={currency_type}
                  prefix={<RiBankCardLine />}
                  {...field}
                />
              )}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item
            label={t("Boshqa")}
            {...getValidationStatus(errors, "other")}
            required={true}
          >
            <Controller
              name="other"
              control={control}
              render={({ field }) => (
                <CustomInputNumber
                  addonAfter={currency_type}
                  prefix={<RiCopperCoinLine />}
                  {...field}
                />
              )}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={6}>
          <Form.Item
            label={t("Sana")}
            {...getValidationStatus(errors, "date")}
            required={true}
          >
            <Controller
              name="date"
              control={control}
              render={({ field }) => <CustomDatePicker {...field} />}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={6}>
          <Form.Item label={t("Izoh")} {...getValidationStatus(errors, "desc")}>
            <Controller
              name="desc"
              control={control}
              render={({ field }) => <CustomTextarea {...field} />}
            />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
      <Form.Item>
        <Flex align="center" justify="end" gap="middle">
          <Button htmlType="button" onClick={handleReset}>
            {t("Tozalash")}
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={actionLoading}
            disabled={actionLoading}
          >
            {t("Yuborish")}
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default OutcomeForm;
