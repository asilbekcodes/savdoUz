import CustomModalConfirm from "@/components/molecules/custom-modal-confirm/CustomModalConfirm";
import useClientTypes from "@/hooks/useClientTypes";
import {
  httpDeleteClient,
  httpSpecialClient,
} from "@/services/api/requests/clients.requests";
import {
  formatTimeForUI,
  handleSuccessNotification,
} from "@/utils/helpers.jsx";
import { DeleteFilled, EditFilled, EyeFilled } from "@ant-design/icons";
import { RiHeartFill, RiHeartLine, RiListSettingsFill } from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import { Button, Flex, Tag } from "antd";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useSpecialClientColumns = (
  pagination,
  filters,
  setFilters,
  refetch
) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const clientTypes = useClientTypes();

  const deleteMutate = useMutation({
    mutationFn: httpDeleteClient,
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

  const specialMutate = useMutation({
    mutationFn: httpSpecialClient,
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSpecial = async (data) => {
    specialMutate.mutate(data);
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
      title: <RiListSettingsFill size={15} />,
      dataIndex: "id",
      key: "operation",
      align: "center",
      width: 100,
      render: (id, row) => (
        <Flex align="center" justify="space-between" gap={"middle"}>
          {get(row, "is_special", false) === true ? (
            <>
              <Button
                type="primary"
                icon={<RiHeartFill />}
                onClick={() =>
                  handleSpecial({ client: row.id, is_special: false })
                }
              />
            </>
          ) : (
            <>
              <Button
                type="primary"
                icon={<RiHeartLine />}
                onClick={() =>
                  handleSpecial({ client: row.id, is_special: true })
                }
              />
            </>
          )}
          <Button
            type="primary"
            icon={<EyeFilled />}
            onClick={() => navigate(`/clients/clients/${id}`)}
          />
          <Button
            onClick={() => navigate(`/clients/clients/update/${id}`)}
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
