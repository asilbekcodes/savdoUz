import CustomModalConfirm from "@/components/molecules/custom-modal-confirm/CustomModalConfirm";
import { httpDeleteWorker } from "@/services/api/requests/workers.requests";
import {
  formatTimeForUI,
  handleSuccessNotification,
} from "@/utils/helpers.jsx";
import { DeleteFilled, EditFilled, EyeFilled } from "@ant-design/icons";
import { RiCheckFill, RiCloseFill, RiListSettingsFill } from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import { Button, Flex } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useWorkerColumns = (pagination, filters, setFilters, refetch) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const deleteMutate = useMutation({
    mutationFn: httpDeleteWorker,
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
      title: t("Ism"),
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: t("Familiya"),
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: t("Telefon raqami"),
      dataIndex: "username",
      key: "username",
      render: (phone) => {
        return <>{phone}</>;
      },
    },
    {
      title: t("Email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("Rol"),
      dataIndex: "role",
      key: "role",
    },
    {
      title: t("Holati"),
      dataIndex: "is_active",
      render: (value) => {
        switch (value) {
          case true:
            return <RiCheckFill style={{ color: "green" }} />;
          case false:
            return <RiCloseFill style={{ color: "red" }} />;
        }
      },
    },
    {
      title: t("Savdo"),
      dataIndex: "is_trade",
      render: (value) => {
        switch (value) {
          case true:
            return <RiCheckFill style={{ color: "green" }} />;
          case false:
            return <RiCloseFill style={{ color: "red" }} />;
        }
      },
    },
    {
      title: t("Mijoz"),
      dataIndex: "is_client",
      render: (value) => {
        switch (value) {
          case true:
            return <RiCheckFill style={{ color: "green" }} />;
          case false:
            return <RiCloseFill style={{ color: "red" }} />;
        }
      },
    },
    {
      title: t("Statistika"),
      dataIndex: "is_statistics",
      render: (value) => {
        switch (value) {
          case true:
            return <RiCheckFill style={{ color: "green" }} />;
          case false:
            return <RiCloseFill style={{ color: "red" }} />;
        }
      },
    },
    {
      title: t("Ombor"),
      dataIndex: "is_storage",
      render: (value) => {
        switch (value) {
          case true:
            return <RiCheckFill style={{ color: "green" }} />;
          case false:
            return <RiCloseFill style={{ color: "red" }} />;
        }
      },
    },
    {
      title: t("Yaratilgan vaqti"),
      dataIndex: "date_joined",
      key: "date_joined",
      render: (value) => {
        return <>{formatTimeForUI(value)}</>;
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
            type="primary"
            icon={<EyeFilled />}
            onClick={() => navigate(`/settings/workers/${id}`)}
          />
          <Button
            onClick={() => navigate(`/settings/workers/update/${id}`)}
            icon={<EditFilled />}
          />
          {row.role !== "DIRECTOR" && (
            <CustomModalConfirm
              trigger={<Button danger icon={<DeleteFilled />} />}
              onOk={() => handleDelete(id)}
            />
          )}
        </Flex>
      ),
    },
  ];
};
