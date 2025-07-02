import CustomModalConfirm from "@/components/molecules/custom-modal-confirm/CustomModalConfirm";
import useProductCategories from "@/hooks/api/useProductCategories";
import useProductFormats from "@/hooks/api/useProductFormats";
import useProductTypes from "@/hooks/useProductTypes";
import {
  httpDeleteBasketProduct,
  httpRestoreProduct,
} from "@/services/api/requests/products.requests";
import {
  NumberToThousandFormat,
  formatTimeForUI,
  handleSuccessNotification,
} from "@/utils/helpers.jsx";
import { DeleteFilled } from "@ant-design/icons";
import { RiCopyleftFill, RiListSettingsFill } from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import { Button, Flex, Tag } from "antd";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useDeleteProductColumns = (
  pagination,
  filters,
  setFilters,
  handleRefetch
) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { productFormatsOptions } = useProductFormats();
  const { productCategoriesOptions } = useProductCategories();
  const productTypes = useProductTypes();

  const deleteMutate = useMutation({
    mutationFn: httpDeleteBasketProduct,
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
    mutationFn: httpRestoreProduct,
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
      title: t("Narxi"),
      dataIndex: "price",
      key: "price",
      render: (price) => {
        return <>{NumberToThousandFormat(price, "")}</>;
      },
    },
    {
      title: t("Kategoriya"),
      dataIndex: "category",
      key: "category_id",
      render: (category) => {
        return <>{get(category, "name", "")}</>;
      },
      filters: [...productCategoriesOptions],
      filteredValue: filters.category_id || null,
      filterSearch: true,
    },
    {
      title: t("Mahsulot turi"),
      dataIndex: "product_type",
      key: "product_type",
      filters: [...productTypes],
      filteredValue: filters.product_type || null,
      filterSearch: true,
      render: (product_type) => {
        switch (product_type) {
          case "Sanaladigan":
            return <Tag color={"green"}>{product_type}</Tag>;
          case "Sanalmaydigan":
            return <Tag color={"red"}>{product_type}</Tag>;
        }
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
      title: t("O'chish kuni"),
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
