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
import { httpDeleteOrder } from "@/services/api/requests/order.request";
import { FaArrowDown, FaCartArrowDown, FaBoxOpen } from "react-icons/fa";

export const useOrderColumns = (pagination, filters, setFilters, refetch) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { clientsOptions } = useClients();

  const deleteMutate = useMutation({
    mutationFn: httpDeleteOrder,
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

  // Navigate to total products page
  const navigateToTotalProducts = () => {
    navigate('/orders/products/total-products');
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
      title: (
        <Flex align="center" gap="small" onClick={navigateToTotalProducts}>
          {t("Jami Mahsulotlar")}
        </Flex>
      ),
      key: "total_products",
      hidden: true,
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
            return record.lead_products?.map((product, index) => (
              <div key={index}>{index + 1}</div>
            ));
          },
        },
        {
          title: t("Nomi"),
          dataIndex: "products",
          key: "products",
          render: (_, record) => {
            return record.lead_products?.map((product, index) => (
              <div key={index}>{get(product.product, "name", "")}</div>
            ));
          },
        },
        {
          title: t("Narxi"),
          dataIndex: "products",
          key: "products",
          render: (_, record) => {
            return record.lead_products?.map((item, index) => (
              <div key={index}>
                {NumberToThousandFormat(get(item.product, "price", ""))}
              </div>
            ));
          },
        },
        {
          title: t("O'lchov turi"),
          dataIndex: "products",
          key: "products",
          render: (_, record) => {
            return record.lead_products?.map((item, index) => (
              <div key={index}>{item.size_type}</div>
            ));
          },
        },
        {
          title: t("Miqdori"),
          dataIndex: "products",
          key: "products",
          render: (_, record) => {
            return record.lead_products?.map((item, index) => (
              <div key={index}>{item.count}</div>
            ));
          },
        },
      ],
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
      title: t("Holati"),
      dataIndex: "status",
      key: "status",
      filters: [
        { text: t("Pending"), value: "PENDING" },
        { text: t("Processing"), value: "PROCESSING" },
        { text: t("Success"), value: "SUCCESS" },
        { text: t("Failed"), value: "FAILED" },
      ],
      filteredValue: filters.status || null,
      render: (value) => {
        switch (value) {
          case "PENDING":
            return <Tag color={"yellow"}>{t("Pending")}</Tag>;
          case "PROCESSING":
            return <Tag color={"blue"}>{t("Processing")}</Tag>;
          case "SUCCESS":
            return <Tag color={"green"}>{t("Success")}</Tag>;
          case "FAILED":
            return <Tag color={"red"}>{t("Failed")}</Tag>;
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
      title: <RiListSettingsFill size={15} />,
      dataIndex: "id",
      key: "operation",
      align: "center",
      width: 100,
      render: (id, row) => (
        <Flex align="center" justify="space-between" gap={"middle"}>
          <Button
            type=""
            onClick={() =>
              navigate(`/trades/trade-create`, {
                state: {
                  orderId: row.id,
                  clientId: row.client?.id,
                  orderProducts: row.lead_products.map((product) => ({
                    product: product.product?.id,
                    count: product.count,
                    price: product.product?.price,
                    size_type: product.size_type,
                    storage: product.storage?.id,
                    part_size: product.part_size,
                    width: product.width,
                    height: product.height,
                  })),
                },
              })
            }
            icon={<FaCartArrowDown />}
          />

          <Button
            type=""
            onClick={() =>
              navigate(`/storages/storage-products/create`, {
                state: {
                  orderId: row.id,
                  orderProducts: row.lead_products.map((product) => ({
                    product: product.product?.id,
                    count: product.count,
                    price: product.product?.price,
                    size_type: product.size_type,
                    storage: product.storage?.id,
                    part_size: product.part_size,
                    width: product.width,
                    height: product.height,
                  })),
                },
              })
            }
            icon={<FaArrowDown />}
          />

          <Button
            type="primary"
            onClick={() => navigate(`/orders/orders/${id}`)}
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