import Logo from "@/assets/images/logo.png";
import { NumberToThousandFormat } from "@/utils/helpers";
import { Col, Flex, Row, Table, Typography } from "antd";
import { get } from "lodash";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const { Title, Text } = Typography;

const Styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const ValueContainer = styled(Typography.Text)`
  font-weight: bold;
`;

const TitleAndIconText = ({ title, value, icon, ...rest }) => {
  return (
    <Styled>
      <TitleContainer>
        {icon && React.cloneElement(icon, { size: 20 })}
        <Typography.Text strong {...rest}>
          {title}:
        </Typography.Text>
      </TitleContainer>
      <ValueContainer>{value}</ValueContainer>
    </Styled>
  );
};

const ProductsPrintUI = ({ data, componentRef }) => {
  const { t } = useTranslation();

  return (
    <div style={{ display: "none" }}>
      <div ref={componentRef}>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <Flex vertical align="center" justify="center" gap={"15px"}>
              <img src={Logo} alt="" style={{ width: "150px" }} />
              <Title level={4} align="center">
                {t("Mahsulotlar")}
              </Title>
            </Flex>
          </Col>

          <Col span={24}>
            <Products data={data} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductsPrintUI;

function Products({ data }) {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("#"),
      dataIndex: "index",
      key: "index",
      render: (value, item, index) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: t("Nomi"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("Kategoriya"),
      dataIndex: "category",
      key: "category",
      render: (value) => {
        return <>{get(value, "name", "")}</>;
      },
    },
    {
      title: t("Mahsulot turi"),
      dataIndex: "product_type",
      key: "product_type",
    },
    {
      title: t("Format"),
      dataIndex: "format",
      key: "format",
      render: (value) => {
        return <>{get(value, "name", "")}</>;
      },
    },
    {
      title: t("Narxi"),
      dataIndex: "price",
      key: "price",
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>;
      },
    },
  ];

  return (
    <Table
      size="small"
      dataSource={data}
      columns={columns}
      pagination={false}
    />
  );
}
