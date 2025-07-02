import CustomModalConfirm from "@/components/molecules/custom-modal-confirm/CustomModalConfirm";
import { httpDeleteProductCategory } from "@/services/api/requests/product-categories.requests";
import { handleSuccessNotification } from "@/utils/helpers.jsx";
import { DeleteFilled, EditFilled, EyeFilled } from "@ant-design/icons";
import { RiListSettingsFill } from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import { Button, Flex } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useProductCategoryColumns = (
  pagination,
  filters,
  setFilters,
  refetch
) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const deleteMutate = useMutation({
    mutationFn: httpDeleteProductCategory,
    onSuccess: () => {
      handleSuccessNotification();
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
      width: "50px",
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
      title: <RiListSettingsFill size={15} />,
      dataIndex: "id",
      key: "operation",
      align: "center",
      width: 90,
      render: (id) => (
        <Flex align="center" justify="space-between" gap={"small"}>
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
