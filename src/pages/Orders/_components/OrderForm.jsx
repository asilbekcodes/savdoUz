import CustomCascader from "@/components/atoms/form-elements/custom-cascader/CustomCascader";
import CustomDatePicker from "@/components/atoms/form-elements/custom-date-picker/CustomDatePicker";
import CustomInputNumber from "@/components/atoms/form-elements/custom-input-number/CustomInputNumber";
import CustomSelect from "@/components/atoms/form-elements/custom-select/CustomSelect";
import CustomSwitch from "@/components/atoms/form-elements/custom-switch/CustomSwitch";
import CustomTextarea from "@/components/atoms/form-elements/custom-textarea/CustomTextarea";
import CardTitle from "@/components/molecules/card-title/CardTitle";
import TitleAndIconText from "@/components/molecules/title-and-icon-text/TitleAndIconText";
import useClients from "@/hooks/api/useClients";
import useProducts from "@/hooks/api/useProducts";
import useServices from "@/hooks/api/useServices";
import useSizeType from "@/hooks/useSizeType";
import { prepareTradeDto } from "@/services/api/prepare-data/trade";
import useCompanyStore from "@/store/useCompanyStore";
import {
  NumberToThousandFormat,
  getValidationStatus,
  getValidationStatusForArray,
} from "@/utils/helpers";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  RiBankCardLine,
  RiCashLine,
  RiCopperCoinLine,
  RiMoneyDollarBoxFill,
  RiMoneyDollarCircleFill,
  RiUserAddFill,
} from "@remixicon/react";
import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  Row,
  Space,
} from "antd";
import Typography from "antd/es/typography/Typography";
import dayjs from "dayjs";
import { get, isEmpty } from "lodash";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { array, number, object, string } from "yup";
import CreateClientModal from "./CreateClientModal";
import CreateProductModal from "./CreateProductModal";
import { prepareOrderDto } from "@/services/api/prepare-data/order";

const OrderForm = ({
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
      client: string().required(t("Maydonni kiritishingiz shart !")),
      cash: string().nullable(),
      card: string().nullable(),
      other: string().nullable(),
      date: string().required(t("Maydonni kiritishingiz shart !")),
      products: array().of(
        object().shape({
          product: string().required(t("Maydonni kiritishingiz shart !")),
          price: string().required(t("Maydonni kiritishingiz shart !")),
          size_type: string().required(t("Maydonni kiritishingiz shart !")),
          count: number()
            .min(0, t("Miqdor noldan katta yoki teng bo'lishi kerak !"))
            .required(t("Maydonni kiritishingiz shart !")),
          part_size: string().when("size_type", {
            is: "O'lchovli",
            then: () => string().required(t("Maydonni kiritishingiz shart !")),
          }),
          height: string().when("size_type", {
            is: "Formatli",
            then: () => string().required(t("Maydonni kiritishingiz shart !")),
          }),
          width: string().when("size_type", {
            is: "Formatli",
            then: () => string().required(t("Maydonni kiritishingiz shart !")),
          }),
        })
      ),
      services: array().of(
        object().shape({
          service: string().required(t("Maydonni kiritishingiz shart !")),
          count: number()
            .min(0, t("Miqdor noldan katta yoki teng bo'lishi kerak !"))
            .required(t("Maydonni kiritishingiz shart !")),
          price: number()
            .min(0, t("Narx noldan katta yoki teng bo'lishi kerak !"))
            .required(t("Maydonni kiritishingiz shart !")),
        })
      ),
    })
    .test(
      "one-of-three-required",
      t("Naqt, Karta orqali yoki Boshqa maydonlaridan biri kiritilishi shart!"),
      function (value) {
        const { path, createError } = this;
        const cash = parseFloat(value.cash) || 0;
        const card = parseFloat(value.card) || 0;
        const other = parseFloat(value.other) || 0;

        if (cash >= 0 || card >= 0 || other >= 0) {
          return true;
        }

        return createError({
          path: `${path}.cash`,
          message: t(
            "Naqt, Karta orqali yoki Boshqa maydonlaridan biri kiritilishi shart!"
          ),
        });
      }
    )
    .test(
      "total-less-than-summa",
      t("To'lovlarning umumiy summasi qarzdorlikdan oshmasligi kerak!"),
      function (value) {
        const { path, createError } = this;
        const cash = parseFloat(value.cash) || 0;
        const card = parseFloat(value.card) || 0;
        const other = parseFloat(value.other) || 0;

        if (cash + card + other <= totalSumma) {
          return true;
        }

        return createError({
          path: `${path}.total_summa`,
          message: t(
            "To'lovlarning umumiy summasi qarzdorlikdan oshmasligi kerak!"
          ),
        });
      }
    )
    // .test(
    //   "product-count",
    //   t(
    //     "Mahsulotning tanlangan miqdori mavjud miqdordan oshib ketishi mumkin emas!"
    //   ),
    //   function (value) {
    //     const { path, createError } = this;

    //     // Qabul qilinadigan mahsulotlar
    //     const products = value.products || [];

    //     // Mahsulotlar ro'yxatidagi har bir mahsulot uchun tekshirish
    //     for (let i = 0; i < products.length; i++) {
    //       const product = products[i];
    //       const productId = product.product;
    //       const count = parseFloat(product.count) || 0;
    //       const partSize = parseFloat(product.part_size) || 1;
    //       const width = parseFloat(product.width) || 1;
    //       const height = parseFloat(product.height) || 1;
    //       const productTotalCount = count * partSize * width * height;

    //       // current_total_count olish
    //       const currentProduct = productsData.find(
    //         (item) => item.id == productId
    //       );
    //       const currentTotalCount = parseFloat(
    //         currentProduct ? currentProduct.current_total_count : 0
    //       );

    //       if (
    //         currentProduct &&
    //         currentProduct.product_type === "Sanaladigan" &&
    //         productTotalCount > currentTotalCount
    //       ) {
    //         return createError({
    //           path: `${path}.products[${i}].total_count`,
    //           message: t("Omborda mahsulot yetarli emas!"),
    //         });
    //       }
    //     }

    //     return true;
    //   }
    // );

  const resolver = yupResolver(validationSchema);

  const { servicesOptions, servicesData } = useServices();
  const { clientsOptions, clientsData } = useClients();
  const { productsOptions, productsData } = useProducts();

  const SIZE_TYPE = useSizeType();
  const user = localStorage.getItem("userStore");
  const user_id = JSON.parse(user).state.me.id;

  const {
    control,
    formState: { errors },
    reset,
    watch,
    setValue,
    getValues,
    ...rest
  } = useForm({
    defaultValues: {
      date: dayjs(),
      client: "",
      user: user_id,
      products: [{ size_type: "O'lchovsiz" }],
      services: [],
      pay_type: true,
      discount_summa: 0,
      ...defaultValues,
    },
    resolver,
  });

  useEffect(() => {
    if (clientsOptions && clientsOptions.length > 0) {
      // Filter clients to find the first client with client_type 'Tezkor'
      const firstTezkorClient = clientsData.find(
        (client) => get(client, "client_type") === "Tezkor"
      );

      // Set the default value if a Tezkor client is found
      if (firstTezkorClient) {
        setValue("client", get(firstTezkorClient, "id", ""));
      }
    }
  }, [clientsOptions, setValue]);

  const {
    fields: productFields,
    append: appendProduct,
    remove: removeProduct,
  } = useFieldArray({
    control,
    name: "products",
  });

  const {
    fields: serviceFields,
    append: appendService,
    remove: removeService,
  } = useFieldArray({
    control,
    name: "services",
  });

  // useEffect(() => {
  //   reset(defaultValues);
  // }, [defaultValues]);



  const handleReset = () => {
    const firstTezkorClient = clientsData.find(
      (client) => get(client, "client_type") === "Tezkor"
    );

    reset({
      date: dayjs(),
      client: get(firstTezkorClient, "id", ""),
      user: user_id,
      products: [{ size_type: "O'lchovsiz" }],
      services: [],
      pay_type: true,
      discount_summa: 0,
    });
  };
  

  const onSubmit = rest.handleSubmit((values) => {
    handleSubmit(prepareOrderDto(values), handleReset);
  });

  const handleChange = (value) => {
    const currentServices = watch("services") || [];

    // Agar value bo'sh bo'lsa, barcha elementlarni o'chirish
    if (value.length === 0) {
      currentServices
        .slice()
        .reverse()
        .forEach((_, index) =>
          removeService(currentServices.length - 1 - index)
        );
      return;
    }

    const newServices = value.map((item) => item[0]);

    // Yangi service ni qo'shish
    value.forEach((item) => {
      if (!currentServices.some((service) => service.service === item[0])) {
        appendService({
          service: item[0],
          count: 1,
          price: servicesData.find((service) => service.id === item[0])?.price,
        });
      }
    });

    // Eskirgan service ni olib tashlash
    currentServices.forEach((currentService, index) => {
      if (!newServices.includes(currentService.service)) {
        removeService(index);
      }
    });
  };

  const handleRemoveService = (index) => {
    const currentServices = watch("services") || [];
    const serviceToRemove = currentServices[index].service;
    // Service ni services array dan o'chirish
    removeService(index);
    // Service ni services_types array dan o'chirish
    setValue(
      "service_types",
      watch("service_types")?.filter(
        (service) => service[0] !== serviceToRemove
      )
    );
  };

  const services = useWatch({ control, name: "services" });
  const products = useWatch({ control, name: "products" });

  const totalServicePrice = Math.round(
    services?.reduce((sum, item) => {
      const price = parseFloat(get(item, "price", 0));
      const count = parseFloat(get(item, "count", 0));
      const productTotal = price * count;

      return sum + parseFloat(productTotal.toFixed(2));
    }, 0)
  );

  const totalProductPrice = Math.round(
    products?.reduce((sum, item) => {
      const price = parseFloat(get(item, "price", 0));
      const count = parseFloat(get(item, "count", 0));
      const partSize = parseFloat(get(item, "part_size", 1));
      const width = parseFloat(get(item, "width", 1));
      const height = parseFloat(get(item, "height", 1));

      let productTotal = price * count * partSize * width * height;

      // Agar productTotal float bo'lsa, uni toFixed(2) bilan yaxlitlang
      if (productTotal % 1 !== 0) {
        productTotal = parseFloat(productTotal.toFixed(2));
      }

      return sum + productTotal;
    }, 0)
  );

  const totalSumma = Math.round(
    (totalServicePrice ? totalServicePrice : 0) +
      (totalProductPrice ? totalProductPrice : 0)
  );

  const paymentSumma = totalSumma - parseFloat(watch("discount_summa")) || 0;

  const payType = watch("pay_type");

  useEffect(() => {
    if (payType) {
      const card = getValues("card") || 0;
      const other = getValues("other") || 0;
      const remainingCash = paymentSumma - card - other;
      if (remainingCash !== getValues("cash")) {
        setValue("cash", remainingCash >= 0 ? remainingCash : 0);
      }
    }
  }, [paymentSumma, watch("card"), watch("other"), payType]);

  useEffect(() => {
    if (payType) {
      const cash = getValues("cash") || 0;
      const other = getValues("other") || 0;
      const remainingCard = paymentSumma - cash - other;
      if (remainingCard !== getValues("card")) {
        setValue("card", remainingCard >= 0 ? remainingCard : 0);
      }
    }
  }, [paymentSumma, watch("cash"), watch("other"), payType]);

  useEffect(() => {
    if (payType) {
      const cash = getValues("cash") || 0;
      const card = getValues("card") || 0;
      const remainingOther = paymentSumma - cash - card;
      if (remainingOther !== getValues("other")) {
        setValue("other", remainingOther >= 0 ? remainingOther : 0);
      }
    }
  }, [paymentSumma, watch("cash"), watch("card"), payType]);

  const totalPayment = watch(["cash", "card", "other"]).reduce(
    (acc, curr) => acc + (parseFloat(curr) || 0),
    0
  );

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
        <Col xs={24} md={18}>
          <Flex gap="large" vertical>
            <Card title={<CardTitle title={t("Mijoz va xizmatlar")} />}>
              <Row gutter={[20, 20]}>
                <Col xs={24} md={6}>
                  <Form.Item
                    label={t("Mijoz")}
                    {...getValidationStatus(errors, "client")}
                    required={true}
                  >
                    <Controller
                      name="client"
                      control={control}
                      render={({ field }) => (
                        <Space.Compact style={{ width: "100%" }}>
                          <CustomSelect
                            options={clientsOptions}
                            addonAfter={"AAA"}
                            {...field}
                            style={{ width: "100%" }}
                          />
                          <CreateClientModal />
                        </Space.Compact>
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item
                    label={t("Xizmatlar")}
                    {...getValidationStatus(errors, "service_types")}
                    required={false}
                  >
                    <Controller
                      name="service_types"
                      control={control}
                      render={({ field }) => (
                        <CustomCascader
                          {...field}
                          options={servicesOptions}
                          onChange={(value) => {
                            field.onChange(value); // Controller qiymatni o'zlashtirish uchun
                            handleChange(value); // Qo'shimcha logic
                          }}
                          multiple
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            {!isEmpty(serviceFields) && (
              <Card title={<CardTitle title={t("Qo'shimcha xizmatlar")} />}>
                <Flex gap="large" vertical>
                  {serviceFields.map((item, index) => (
                    <>
                      <Row gutter={[20, 20]}>
                        <Col xs={24} md={22}>
                          <Card hoverable={true}>
                            <Row gutter={[20, 20]} key={item.id}>
                              <Col xs={24} md={6}>
                                <Form.Item
                                  label={t("Xizmat")}
                                  {...getValidationStatusForArray(
                                    errors,
                                    "services",
                                    index,
                                    "service"
                                  )}
                                  required={true}
                                >
                                  <Controller
                                    name={`services.${index}.service`}
                                    control={control}
                                    render={({ field }) => (
                                      <CustomSelect
                                        {...field}
                                        disabled={true}
                                        options={servicesOptions}
                                      />
                                    )}
                                  />
                                </Form.Item>
                              </Col>
                              <Col xs={24} md={6}>
                                <Form.Item
                                  label={t("Miqdori")}
                                  {...getValidationStatusForArray(
                                    errors,
                                    "services",
                                    index,
                                    "count"
                                  )}
                                  required={true}
                                >
                                  <Controller
                                    name={`services.${index}.count`}
                                    control={control}
                                    render={({ field }) => (
                                      <CustomInputNumber {...field} />
                                    )}
                                  />
                                </Form.Item>
                              </Col>
                              <Col xs={24} md={6}>
                                <Form.Item
                                  label={t("Narxi")}
                                  {...getValidationStatusForArray(
                                    errors,
                                    "services",
                                    index,
                                    "price"
                                  )}
                                  required={true}
                                >
                                  <Controller
                                    name={`services.${index}.price`}
                                    control={control}
                                    render={({ field }) => (
                                      <CustomInputNumber
                                        addonAfter={currency_type}
                                        {...field}
                                      />
                                    )}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                        <Col xs={24} md={2}>
                          <Button
                            icon={<DeleteFilled />}
                            danger
                            size="small"
                            onClick={() => handleRemoveService(index)}
                          >
                            {/* {t("O'chirish")} */}
                          </Button>
                        </Col>
                      </Row>
                    </>
                  ))}
                  <Flex gap={"small"} align="center">
                    <RiMoneyDollarCircleFill size={20} />
                    <Typography.Text type="warning" strong>
                      {t("SUMMA")}: {NumberToThousandFormat(totalServicePrice)}
                    </Typography.Text>
                  </Flex>
                </Flex>
              </Card>
            )}
            <Card
              title={
                <Flex horizontal align="center" justify="space-between">
                  <CardTitle title={t("Mahsulotlar")} />
                  <Flex align="center" justify="space-between" gap={"20px"}>
                    {/* <CreateProductModal /> */}
                    <Button
                      icon={<PlusOutlined />}
                      type="primary"
                      size="small"
                      onClick={() => appendProduct({ size_type: "O'lchovsiz" })}
                    >
                      {t("MAHSULOT")}
                    </Button>
                  </Flex>
                </Flex>
              }
            >
              <Flex gap="large" vertical>
                {productFields.map((item, index) => {
                  const selectedProducts = watch("products").map(
                    (item) => item.product
                  );

                  const currentValue = watch(`products.${index}.product`);

                  const filteredProductOptions = productsOptions.filter(
                    (option) =>
                      !selectedProducts.includes(option.value) ||
                      option.value === currentValue
                  );

                  const currentProduct = productsData.find(
                    (item) => item.id === currentValue
                  );

                  const count = parseFloat(
                    get(watch(`products.${index}`), "count", 0)
                  );
                  const partSize = parseFloat(
                    get(watch(`products.${index}`), "part_size", 1)
                  );
                  const width = parseFloat(
                    get(watch(`products.${index}`), "width", 1)
                  );
                  const height = parseFloat(
                    get(watch(`products.${index}`), "height", 1)
                  );

                  let productTotalCount = count * partSize * width * height;

                  // Agar productTotalCount float bo'lsa, uni toFixed(2) bilan yaxlitlang
                  if (productTotalCount % 1 !== 0) {
                    productTotalCount = parseFloat(
                      productTotalCount.toFixed(2)
                    );
                  }

                  return (
                    <>
                      <Row gutter={[20, 20]}>
                        <Col xs={24} md={22}>
                          <Card hoverable={true}>
                            <Row gutter={[20, 20]} key={item.id}>
                              <Col xs={24} md={6}>
                                <Form.Item
                                  label={t("Mahsulot")}
                                  {...getValidationStatusForArray(
                                    errors,
                                    "products",
                                    index,
                                    "product"
                                  )}
                                  required={true}
                                >
                                  <Controller
                                    name={`products.${index}.product`}
                                    control={control}
                                    render={({ field }) => (
                                      <CustomSelect
                                        {...field}
                                        // options={filteredProductOptions}
                                        options={productsOptions}
                                        onChange={(value) => {
                                          field.onChange(value);
                                          const selectedProduct =
                                            productsData.find(
                                              (item) => item.id === value
                                            );
                                          if (selectedProduct) {
                                            setValue(
                                              `products.${index}.price`,
                                              selectedProduct.price
                                            );
                                          }
                                        }}
                                      />
                                    )}
                                  />
                                </Form.Item>
                              </Col>
                              <Col xs={24} md={6}>
                                <Form.Item
                                  label={t("Narxi")}
                                  {...getValidationStatusForArray(
                                    errors,
                                    "products",
                                    index,
                                    "price"
                                  )}
                                  required={true}
                                >
                                  <Controller
                                    name={`products.${index}.price`}
                                    control={control}
                                    render={({ field }) => (
                                      <CustomInputNumber
                                        addonAfter={currency_type}
                                        {...field}
                                      />
                                    )}
                                  />
                                </Form.Item>
                              </Col>
                              <Col xs={24} md={6}>
                                <Form.Item
                                  label={t("O'lcham turi")}
                                  {...getValidationStatusForArray(
                                    errors,
                                    "products",
                                    index,
                                    "size_type"
                                  )}
                                  required={true}
                                >
                                  <Controller
                                    name={`products.${index}.size_type`}
                                    control={control}
                                    render={({ field }) => (
                                      <CustomSelect
                                        options={SIZE_TYPE}
                                        showSearch={false}
                                        {...field}
                                      />
                                    )}
                                  />
                                </Form.Item>
                              </Col>

                              {watch(`products.${index}.size_type`) ===
                                "O'lchovli" && (
                                <Col xs={24} md={6}>
                                  <Form.Item
                                    label={t("O'lchami")}
                                    {...getValidationStatusForArray(
                                      errors,
                                      "products",
                                      index,
                                      "part_size"
                                    )}
                                    required={true}
                                  >
                                    <Controller
                                      name={`products.${index}.part_size`}
                                      control={control}
                                      render={({ field }) => (
                                        <CustomInputNumber min={0} {...field} />
                                      )}
                                    />
                                  </Form.Item>
                                </Col>
                              )}

                              {watch(`products.${index}.size_type`) ===
                                "Formatli" && (
                                <>
                                  <Col xs={24} md={6}>
                                    <Form.Item
                                      label={t("Bo'yi")}
                                      {...getValidationStatusForArray(
                                        errors,
                                        "products",
                                        index,
                                        "height"
                                      )}
                                      required={true}
                                    >
                                      <Controller
                                        name={`products.${index}.height`}
                                        control={control}
                                        render={({ field }) => (
                                          <CustomInputNumber
                                            min={0}
                                            {...field}
                                          />
                                        )}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col xs={24} md={6}>
                                    <Form.Item
                                      label={t("Eni")}
                                      {...getValidationStatusForArray(
                                        errors,
                                        "products",
                                        index,
                                        "width"
                                      )}
                                      required={true}
                                    >
                                      <Controller
                                        name={`products.${index}.width`}
                                        control={control}
                                        render={({ field }) => (
                                          <CustomInputNumber
                                            min={0}
                                            {...field}
                                          />
                                        )}
                                      />
                                    </Form.Item>
                                  </Col>

                                  <Col xs={24} md={6}>
                                    <Form.Item label={t("Perimetr")}>
                                      {(() => {
                                        const height = watch(
                                          `products.${index}.height`
                                        );
                                        const width = watch(
                                          `products.${index}.width`
                                        );
                                        let perimeter = 0;

                                        if (height && width) {
                                          perimeter =
                                            2 *
                                            (parseFloat(height) +
                                              parseFloat(width));

                                          // Agar perimeter float bo'lsa, uni toFixed(2) bilan yaxlitlang
                                          if (perimeter % 1 !== 0) {
                                            perimeter = perimeter.toFixed(2);
                                          }
                                        }

                                        return <div>{perimeter}</div>;
                                      })()}
                                    </Form.Item>
                                  </Col>
                                </>
                              )}

                              <Col xs={24} md={6}>
                                <Form.Item
                                  label={t("Miqdori")}
                                  {...getValidationStatusForArray(
                                    errors,
                                    "products",
                                    index,
                                    "count"
                                  )}
                                  required={true}
                                >
                                  <Controller
                                    name={`products.${index}.count`}
                                    control={control}
                                    render={({ field }) => (
                                      <CustomInputNumber min={0} {...field} />
                                    )}
                                  />
                                </Form.Item>
                              </Col>

                              {currentValue && (
                                <Col xs={24} md={6}>
                                  <Form.Item
                                    label={t("Ombordagi joriy miqdori")}
                                  >
                                    {get(
                                      currentProduct,
                                      "product_type",
                                      "Sanaladigan"
                                    ) == "Sanaladigan" ? (
                                      <>
                                        {NumberToThousandFormat(
                                          get(
                                            currentProduct,
                                            "current_total_count",
                                            ""
                                          ),
                                          get(currentProduct, "format.name", "")
                                        )}
                                      </>
                                    ) : (
                                      t("Sanalmaydigan mahsulot")
                                    )}
                                  </Form.Item>
                                </Col>
                              )}

                              {currentValue && (
                                <Col xs={24} md={6}>
                                  <Form.Item
                                    label={t("Tanlangan miqdor")}
                                    {...getValidationStatusForArray(
                                      errors,
                                      "products",
                                      index,
                                      "total_count"
                                    )}
                                  >
                                    {NumberToThousandFormat(
                                      productTotalCount,
                                      get(currentProduct, "format.name", "")
                                    )}
                                  </Form.Item>
                                </Col>
                              )}
                            </Row>
                          </Card>
                        </Col>
                        <Col xs={24} md={2}>
                          {productFields.length > 1 && (
                            <Button
                              icon={<DeleteFilled />}
                              danger
                              size="small"
                              onClick={() => removeProduct(index)}
                            />
                          )}
                        </Col>
                      </Row>
                    </>
                  );
                })}
                <Flex gap={"small"} align="center">
                  <RiMoneyDollarBoxFill size={20} />
                  <Typography.Text type="default" strong>
                    {t("SUMMA")}: {NumberToThousandFormat(totalProductPrice)}
                  </Typography.Text>
                </Flex>
              </Flex>
            </Card>
          </Flex>
        </Col>
        <Col xs={24} md={6}>
          <Card title={<CardTitle title={t("To'lov")} />}>
            <Row gutter={[20, 20]}>
              <Col xs={24} md={24}>
                <Flex vertical gap={"middle"}>
                  <TitleAndIconText
                    title={t("Mahsulotlar").toUpperCase()}
                    value={NumberToThousandFormat(totalProductPrice)}
                    icon={<RiMoneyDollarBoxFill />}
                  />
                  <TitleAndIconText
                    type="warning"
                    title={t("Xizmatlar").toUpperCase()}
                    value={NumberToThousandFormat(totalServicePrice)}
                    icon={<RiMoneyDollarBoxFill />}
                  />
                  <TitleAndIconText
                    type="success"
                    title={t("Umumiy summa").toUpperCase()}
                    value={NumberToThousandFormat(totalSumma)}
                    icon={<RiMoneyDollarBoxFill />}
                  />
                </Flex>
              </Col>

              <Col xs={24} md={24}>
                <Form.Item
                  label={t("Chegirma")}
                  {...getValidationStatus(errors, "discount_summa")}
                  required={true}
                >
                  <Controller
                    name="discount_summa"
                    control={control}
                    render={({ field }) => (
                      <CustomInputNumber
                        addonAfter={currency_type}
                        prefix={<RiMoneyDollarBoxFill />}
                        {...field}
                      />
                    )}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={24}>
                <Flex vertical gap={"middle"}>
                  <TitleAndIconText
                    title={t("To'lov summasi").toUpperCase()}
                    value={NumberToThousandFormat(paymentSumma)}
                    icon={<RiMoneyDollarBoxFill />}
                  />
                </Flex>
              </Col>

              <Col xs={24} md={24}>
                <Form.Item
                  label={t("Barchasini to'lash")}
                  {...getValidationStatus(errors, "pay_type")}
                  required={true}
                >
                  <Controller
                    name="pay_type"
                    control={control}
                    render={({ field }) => (
                      <CustomSwitch prefix={<RiCashLine />} {...field} />
                    )}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={24}>
                <Form.Item
                  label={t("Naqt")}
                  {...getValidationStatus(errors, "cash")}
                  required={true}
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
              <Col xs={24} md={24}>
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
              <Col xs={24} md={24}>
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
              <Col xs={24} md={24}>
                <Form.Item {...getValidationStatus(errors, "total_summa")}>
                  <TitleAndIconText
                    type="success"
                    title={t("Summa").toUpperCase()}
                    value={NumberToThousandFormat(totalPayment)}
                    icon={<RiMoneyDollarBoxFill />}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={24}>
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
              <Col xs={24} md={24}>
                <Form.Item
                  label={t("Izoh")}
                  {...getValidationStatus(errors, "desc")}
                >
                  <Controller
                    name="desc"
                    control={control}
                    render={({ field }) => <CustomTextarea {...field} />}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
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

export default OrderForm;
