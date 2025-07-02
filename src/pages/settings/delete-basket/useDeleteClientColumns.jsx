import CustomModalConfirm from "@/components/molecules/custom-modal-confirm/CustomModalConfirm";
import useClientTypes from "@/hooks/useClientTypes";
import {
  httpDeleteBasketClient,
  httpRestoreClient,
} from "@/services/api/requests/clients.requests";
import {
  NumberToThousandFormat,
  formatTimeForUI,
  handleSuccessNotification,
} from "@/utils/helpers.jsx";
import { DeleteFilled } from "@ant-design/icons";
import { RiCopyleftFill, RiListSettingsFill } from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import { Button, Flex, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useDeleteClientColumns = (
  pagination,
  filters,
  setFilters,
  handleRefetch
) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const clientTypes = useClientTypes();

  const deleteMutate = useMutation({
    mutationFn: httpDeleteBasketClient,
    onSuccess: () => {
      handleSuccessNotification(t("Muvaffaqiyatli bajarildi !"));
      handleRefetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDelete = (id) => {
    deleteMutate.mutate(id);
  };

  const restoreMutate = useMutation({
    mutationFn: httpRestoreClient,
    onSuccess: () => {
      handleSuccessNotification(t("Muvaffaqiyatli bajarildi !"));
      handleRefetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleRestore = (id) => {
    restoreMutate.mutate(id);
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
      title: t("Mijoz turi"),
      dataIndex: "client_type",
      filters: [...clientTypes],
      filteredValue: filters.client_type || null,
      filterSearch: true,
      render: (client_type) => {
        switch (client_type) {
          case "Doimiy":
            return <Tag color={"green"}>{client_type}</Tag>;
          case "Tezkor":
            return <Tag color={"red"}>{client_type}</Tag>;
        }
      },
    },
    {
      title: t("Holati"),
      dataIndex: "status",
      key: "status",
      filters: [
        { text: t("To'langan"), value: "To'langan" },
        { text: "Qarzdorlik", value: "Qarzdorlik" },
      ],
      filteredValue: filters.status || null,
      render: (status) => {
        switch (status) {
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
    },
    {
      title: t("Sana"),
      dataIndex: "deleted_at",
      key: "deleted_at",
      render: (value) => {
        return <>{formatTimeForUI(value)}</>;
      },
    },
    {
      title: t("O'chirish kuni"),
      dataIndex: "deleted_range_day",
      key: "deleted_range_day",
      render: (value) => {
        return <>{NumberToThousandFormat(value, t("kun"))}</>;
      },
    },
    {
      title: <RiListSettingsFill size={15} />,
      dataIndex: "id",
      key: "operation",
      align: "center",
      width: 100,
      render: (id) => (
        <Flex align="center" justify="space-between" gap={"middle"}>
          <CustomModalConfirm
            trigger={<Button type="primary" icon={<RiCopyleftFill />} />}
            onOk={() => handleRestore(id)}
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
