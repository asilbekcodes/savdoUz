import CustomModalConfirm from "@/components/molecules/custom-modal-confirm/CustomModalConfirm";
import useFinanceTransactions from "@/hooks/api/useFinanceTransactions";
import { httpDeleteClient } from "@/services/api/requests/clients.requests";
import { httpDeleteFinanceOutcome } from "@/services/api/requests/finance-outcomes.requests";
import {
  NumberToThousandFormat,
  formatTimeForUI,
  handleSuccessNotification,
} from "@/utils/helpers.jsx";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { RiListSettingsFill } from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import { Button, Flex, Tag } from "antd";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useFinanceOutcomeColumns = (
  pagination,
  filters,
  setFilters,
  refetch
) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { transactionsOptions } = useFinanceTransactions();

  const deleteMutate = useMutation({
    mutationFn: httpDeleteFinanceOutcome,
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
      title: t("Tranzaktsiya"),
      dataIndex: "transaction",
      key: "transaction",
      render: (transaction) => {
        return <>{get(transaction, "name", "")}</>;
      },
      filters: [...transactionsOptions],
      filteredValue: filters.transaction || null,
      filterSearch: true,
    },
    {
      title: t("Naqt"),
      dataIndex: "cash",
      key: "cash",
      hidden: true,
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>;
      },
    },
    {
      title: t("Karta"),
      dataIndex: "card",
      key: "card",
      hidden: true,
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>;
      },
    },
    {
      title: t("Boshqa"),
      dataIndex: "other",
      key: "other",
      hidden: true,
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>;
      },
    },
    {
      title: t("Jami summa"),
      dataIndex: "total",
      key: "total",
      render: (value, row) => {
        return (
          <>
            {NumberToThousandFormat(
              get(row, "cash", 0) + get(row, "card", 0) + get(row, "other", 0)
            )}
          </>
        );
      },
    },
    {
      title: t("Sana"),
      dataIndex: "date",
      key: "date",
      render: (value) => {
        return <>{formatTimeForUI(value)}</>;
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
          <Button
            onClick={() => navigate(`/finance/finance-outcomes/update/${id}`)}
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
