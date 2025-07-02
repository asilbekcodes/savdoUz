import { Checkbox, Flex, Select, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import CardTitle from "../card-title/CardTitle";

export const StyledCustomDataTable = styled(Table)`
  .ant-table {
    .ant-table-thead {
      .ant-table-cell {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: -0.07px;
      }
    }
    .ant-table-tbody {
      .ant-table-cell {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: -0.07px;
      }
    }

    .ant-table-title {
      padding: 10px 10px;
    }
  }

  .ant-table-pagination {
    margin: 30px 0 !important;
  }
`;

const CustomDataTable = ({
  columns,
  data,
  pagination,
  loading,
  onChange,
  title,
  ...rest
}) => {
  const { t } = useTranslation();
  // Filter out the columns with keys 'id' and 'operation' for selection
  const selectableColumns = columns.filter(
    (column) =>
      column.key !== "id" &&
      column.key !== "index" &&
      column.key !== "operation"
  );

  const [visibleColumns, setVisibleColumns] = useState(columns);

  useEffect(() => {
    const initialVisibleColumns = columns.filter(
      (column) =>
        !column.hidden ||
        column.key === "id" ||
        (column.key !== "index" && column.key === "operation")
    );
    setVisibleColumns(initialVisibleColumns);
  }, [columns]);

  const handleColumnChange = (selectedColumns) => {
    const newColumns = columns
      .map((column) => ({
        ...column,
        hidden:
          !selectedColumns.includes(column.key) &&
          column.key !== "id" &&
          column.key !== "index" &&
          column.key !== "operation",
      }))
      .filter((column) => !column.hidden);
    setVisibleColumns(newColumns);
  };

  const [localPagination, setLocalPagination] = useState(pagination);

  useEffect(() => {
    setLocalPagination(pagination);
  }, [pagination]);

  const calculateRowIndex = (index) => {
    return (localPagination.current - 1) * localPagination.pageSize + index + 1;
  };

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ width: "100%", margin: 0 }}
    >
      <>
        <StyledCustomDataTable
          locale={{
            filterReset: t("Tozalash"),
          }}
          bordered={true}
          style={{ maxWidth: "100%" }}
          scroll={{ x: true }}
          columns={visibleColumns?.map((column) =>
            column.key === "id"
              ? {
                  ...column,
                  render: (text, record, index) => {
                    return calculateRowIndex(index);
                  },
                }
              : column
          )}
          rowKey={(record) => record.id}
          dataSource={data}
          pagination={
            pagination
              ? {
                  current: pagination.current,
                  pageSize: pagination.pageSize,
                  total: pagination.total,
                  showSizeChanger: true,
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} / ${total}`,
                }
              : false
          }
          loading={loading}
          onChange={onChange}
          title={() => (
            <>
              <Flex align="center" justify={title ? "space-between" : "end"}>
                {title && <CardTitle title={title} />}
                <Select
                  mode="multiple"
                  showSearch={false}
                  placeholder={t("Ustunlarni tanlang")}
                  onChange={handleColumnChange}
                  style={{ width: "180px" }}
                  dropdownRender={(menu) => (
                    <div style={{ padding: "5px", cursor: "pointer" }}>
                      <Checkbox.Group
                        value={visibleColumns.map((column) => column.key)}
                        onChange={(checkedValues) => {
                          handleColumnChange(checkedValues);
                        }}
                      >
                        {selectableColumns.map((column) => (
                          <div key={column.key} style={{ width: "100%", margin: "3px 0" }}>
                            <Checkbox
                              key={column.key}
                              value={column.key}
                              style={{ lineHeight: "25px" }}
                            >
                              {column.title}
                            </Checkbox>
                          </div>
                        ))}
                      </Checkbox.Group>
                    </div>
                  )}
                >
                  {selectableColumns.map((column) => (
                    <Option key={column.key} value={column.key}>
                      {column.title}
                    </Option>
                  ))}
                </Select>
              </Flex>
            </>
          )}
          {...rest}
        />
      </>
    </Space>
  );
};

export default CustomDataTable;
