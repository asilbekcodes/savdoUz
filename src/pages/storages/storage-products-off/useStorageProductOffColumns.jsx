import CustomModalConfirm from "@/components/molecules/custom-modal-confirm/CustomModalConfirm";
import useProducts from "@/hooks/api/useProducts";
import { httpDeleteStorageProductOff } from "@/services/api/requests/storage-products-off.requests";
import {
  NumberToThousandFormat,
  handleSuccessNotification,
} from "@/utils/helpers.jsx";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { RiListSettingsFill } from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import { Button, Flex } from "antd";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useStorageProductOffColumns = (
  pagination,
  filters,
  setFilters,
  refetch
) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { productsOptions } = useProducts();

  const deleteMutate = useMutation({
    mutationFn: httpDeleteStorageProductOff,
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
    },
    {
      title: t("Mahsulot"),
      dataIndex: "product",
      key: "product",
      render: (product) => {
        return <>{get(product, "name", "")}</>;
      },
      filters: [...productsOptions],
      filteredValue: filters.product || null,
      filterSearch: true,
      hidden: false,
    },
    {
      title: t("Miqdori"),
      dataIndex: "count",
      key: "count",
      render: (value, row) => {
        return <>{NumberToThousandFormat(value, row.product.format)}</>;
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
          {/* <Button
            type="primary"
            icon={<EyeFilled />}
            onClick={() => navigate(`${id}`)}
          /> */}
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
