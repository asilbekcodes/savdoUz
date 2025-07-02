import CustomModalConfirm from "@/components/molecules/custom-modal-confirm/CustomModalConfirm";
import useClients from "@/hooks/api/useClients";
import { httpDeleteTrade } from "@/services/api/requests/trade.requests";
import {
  NumberToThousandFormat,
  formatTimeForUI,
  handleSuccessNotification,
} from "@/utils/helpers.jsx";
import {
  DeleteFilled,
  EditFilled,
  EyeFilled,
  PrinterOutlined,
} from "@ant-design/icons";
import { RiListSettingsFill } from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import { Button, Flex, Tag } from "antd";
import { get } from "lodash";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";
import CheckUI from "./_components/check-ui/CheckUI";

export const useTradeColumns = (pagination, filters, setFilters, refetch) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { clientsOptions } = useClients();

  const deleteMutate = useMutation({
    mutationFn: httpDeleteTrade,
    onSuccess: () => {
      handleSuccessNotification(t("Muvaffaqiyatli bajarildi !"));
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDelete = (id) => {
    deleteMutate.mutate(id);
  };

  const refs = useRef({});

  const getRef = (id) => {
    if (!refs.current[id]) {
      refs.current[id] = React.createRef();
    }
    return refs.current[id];
  };

  return [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("Mijoz"),
      dataIndex: "client",
      key: "client",
      render: (client) => {
        return (
          <>
            <NavLink to={`/clients/clients/${get(client, "id", "")}`}>
              {get(client, "name", "")}
            </NavLink>
          </>
        );
      },
      filters: [...clientsOptions],
      filteredValue: filters.client || null,
      filterSearch: true,
      hidden: false,
    },
    {
      title: "Mahsulotlar",
      key: "products",
      hidden: true,
      children: [
        {
          title: t("#"),
          dataIndex: "products",
          key: "products",
          render: (_, record) => {
            return record.products.map((product, index) => (
              <div key={index}>{index + 1}</div>
            ));
          },
        },
        {
          title: t("Nomi"),
          dataIndex: "products",
          key: "products",
          render: (_, record) => {
            return record.products.map((product, index) => (
              <div key={index}>{get(product.product, "name", "")}</div>
            ));
          },
        },
        {
          title: t("Narxi"),
          dataIndex: "products",
          key: "products",
          render: (_, record) => {
            return record.products.map((item, index) => (
              <div key={index}>{NumberToThousandFormat(item.price)}</div>
            ));
          },
        },
        {
          title: t("O'lchov turi"),
          dataIndex: "products",
          key: "products",
          render: (_, record) => {
            return record.products.map((item, index) => (
              <div key={index}>{item.size_type}</div>
            ));
          },
        },
        {
          title: t("Miqdori"),
          dataIndex: "products",
          key: "products",
          render: (_, record) => {
            return record.products.map((item, index) => (
              <div key={index}>
                {NumberToThousandFormat(item.count, item.product.format)}
              </div>
            ));
          },
        },
      ],
    },
    {
      title: "Xizmatlar",
      key: "services",
      hidden: true,
      children: [
        {
          title: t("#"),
          dataIndex: "services",
          key: "services",
          render: (_, record) => {
            return record.services.map((item, index) => (
              <div key={index}>{index + 1}</div>
            ));
          },
        },
        {
          title: t("Nomi"),
          dataIndex: "services",
          key: "services",
          render: (_, record) => {
            return record.services.map((item, index) => (
              <div key={index}>{get(item.service, "name", "")}</div>
            ));
          },
        },
        {
          title: t("Narxi"),
          dataIndex: "services",
          key: "services",
          render: (_, record) => {
            return record.services.map((item, index) => (
              <div key={index}>{NumberToThousandFormat(item.price)}</div>
            ));
          },
        },
        {
          title: t("Miqdori"),
          dataIndex: "services",
          key: "services",
          render: (_, record) => {
            return record.services.map((item, index) => (
              <div key={index}>
                {NumberToThousandFormat(item.count, t("ta"))}
              </div>
            ));
          },
        },
      ],
    },
    {
      title: t("Jami summa (mahsulotlar)"),
      dataIndex: "total_product_summa",
      key: "total_product_summa",
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>;
      },
      hidden: true,
    },
    {
      title: t("Jami summa (xizmatlar)"),
      dataIndex: "total_service_summa",
      key: "total_service_summa",
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>;
      },
      hidden: true,
    },
    {
      title: t("Chegirma"),
      dataIndex: "discount_summa",
      key: "discount_summa",
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>;
      },
    },
    {
      title: t("Jami summa"),
      dataIndex: "total_summa",
      key: "total_summa",
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>;
      },
    },
    {
      title: t("To'langan"),
      dataIndex: "total_pay",
      key: "total_pay",
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>;
      },
    },
    {
      title: t("Qarzdorlik"),
      dataIndex: "debt_balance",
      key: "debt_balance",
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>;
      },
    },
    {
      title: t("Holati"),
      dataIndex: "status",
      key: "status",
      filters: [
        { text: t("Qarzdorlik"), value: "Qarzdorlik" },
        { text: t("To'langan"), value: "To'langan" },
      ],
      filteredValue: filters.status || null,
      render: (value) => {
        switch (value) {
          case "Qarzdorlik":
            return <Tag color={"red"}>{t("Qarzdorlik")}</Tag>;
          case "To'langan":
            return <Tag color={"green"}>{t("To'langan")}</Tag>;
        }
      },
    },
    {
      title: t("Sana"),
      dataIndex: "date",
      key: "date",
      render: (date) => {
        return <>{formatTimeForUI(date)}</>;
      },
    },
    {
      title: t("Izoh"),
      dataIndex: "desc",
      key: "desc",
      width: 300,
      hidden: true,
    },
    {
      title: <RiListSettingsFill size={15} />,
      dataIndex: "id",
      key: "operation",
      align: "center",
      width: 100,
      render: (id, row) => (
        <Flex align="center" justify="space-between" gap={"middle"}>
          <Button
            type="primary"
            onClick={() => navigate(`/trades/trades/${id}`)}
            icon={<EyeFilled />}
          />
          <CheckUI data={row} componentRef={getRef(id)} />
          <ReactToPrint
            pageStyle={`@page { size: 80mm 100%; margin: 20px; padding: 0px; } body {  margin: 20px; padding: 0px; }`}
            bodyClass="print"
            trigger={() => <Button icon={<PrinterOutlined />} />}
            content={() => getRef(id).current}
          />
          {!get(row, "is_payment", true) && (
            <Button
              onClick={() => navigate(`/trades/trades/update/${id}`)}
              icon={<EditFilled />}
            />
          )}
          <CustomModalConfirm
            trigger={<Button danger icon={<DeleteFilled />} />}
            onOk={() => handleDelete(id)}
          />
        </Flex>
      ),
    },
  ];
};
