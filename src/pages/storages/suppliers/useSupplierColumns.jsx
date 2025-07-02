import CustomModalConfirm from "@/components/molecules/custom-modal-confirm/CustomModalConfirm";
import useSupplierTypes from "@/hooks/useSupplierTypes";
import { httpDeleteSupplier } from "@/services/api/requests/suppliers.requests";
import {
  formatTimeForUI,
  handleSuccessNotification,
} from "@/utils/helpers.jsx";
import { DeleteFilled, EditFilled, EyeFilled } from "@ant-design/icons";
import { RiListSettingsFill } from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import { Button, Flex, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useSupplierColumns = (
  pagination,
  filters,
  setFilters,
  refetch
) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const supplierTypes = useSupplierTypes();

  const deleteMutate = useMutation({
    mutationFn: httpDeleteSupplier,
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

  return [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
      render: (id, item, index) => {
        return (
          <>{(pagination.current - 1) * pagination.pageSize + index + 1}</>
        );
      },
    },
    {
      title: t("Nomi"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("Telefon raqami"),
      dataIndex: "phone",
      key: "phone",
      render: (phone) => {
        return <>{phone}</>;
      },
    },
    {
      title: t("Ta'minotchi turi"),
      dataIndex: "supplier_type",
      key: "supplier_type",
      filters: [...supplierTypes],
      filteredValue: filters.supplier_type || null,
      filterSearch: true,
      render: (supplier_type) => {
        switch (supplier_type) {
          case "Doimiy":
            return <Tag color={"green"}>{t("Doimiy")}</Tag>;
          case "Tezkor":
            return <Tag color={"red"}>{t("Tezkor")}</Tag>;
        }
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
      filterSearch: true,
      render: (value) => {
        switch (value) {
          case "To'langan":
            return <Tag color={"green"}>{t("To'langan")}</Tag>;
          case "Qarzdorlik":
            return <Tag color={"red"}>{t("Qarzdorlik")}</Tag>;
        }
      },
    },
    {
      title: t("Qo'shilgan vaqti"),
      dataIndex: "added",
      key: "added",
      render: (added) => {
        return <>{formatTimeForUI(added)}</>;
      },
    },
    {
      title: t("Izoh"),
      dataIndex: "desc",
      key: "desc",
      render: (desc) => {
        return <>{desc}</>;
      },
      hidden: true,
    },
    {
      title: <RiListSettingsFill size={15} />,
      dataIndex: "id",
      key: "operation",
      align: "center",
      width: 100,
      render: (id) => (
        <Flex align="center" justify="space-between" gap={"middle"}>
          <Button
            type="primary"
            onClick={() => navigate(`${id}`)}
            icon={<EyeFilled />}
          />
          <Button
            onClick={() => navigate(`update/${id}`)}
            icon={<EditFilled />}
          />
          <CustomModalConfirm
            trigger={<Button danger icon={<DeleteFilled />} />}
            onOk={() => handleDelete(id)}
          />
        </Flex>
      ),
    },
  ];
};
