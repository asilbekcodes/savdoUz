import { NumberToThousandFormat, formatTimeForUI } from "@/utils/helpers"
import {
  RiCalendarTodoFill,
  RiMoneyDollarBoxFill,
  RiRefreshFill,
  RiShakeHandsFill,
  RiStackFill,
  RiUser2Fill,
} from "@remixicon/react"
import { Col, Divider, Flex, Row, Table, Typography } from "antd"
import { get, isEmpty } from "lodash"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import React from "react"

const { Title, Text } = Typography

const Styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TitleContainer = styled.div`
  display: flex;
  gap: 5px;
`

const ValueContainer = styled(Typography.Text)`
  font-weight: bold;
`

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
  )
}

const CheckUI = ({ data, componentRef }) => {
  const { t } = useTranslation()

  return (
    <div style={{ display: "none" }}>
      <div ref={(el) => (componentRef.current = el)}>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <Flex vertical align="center" justify="center" gap={"15px"}>
              {/* <img src={Logo || "/placeholder.svg"} alt="" style={{ width: "150px" }} /> */}
              <Title level={5} align="center">
                №: {get(data, "cheque_id", 0)}
              </Title>
            </Flex>
          </Col>
          <Col span={24}>
            <Flex vertical gap={"15px"}>
              <TitleAndIconText
                title={t("Mijoz").toUpperCase()}
                value={get(data, "client.name", "")}
                icon={<RiUser2Fill />}
              />
              <TitleAndIconText
                title={t("Sana").toUpperCase()}
                value={formatTimeForUI(get(data, "date", ""))}
                icon={<RiCalendarTodoFill />}
              />
              <Divider style={{ margin: "0" }} />
            </Flex>
          </Col>

          <Col span={24}>
            <Flex vertical gap={"15px"}>
              <Title level={5} align="center">
                {t("Mahsulotlar")}
              </Title>
              <Products data={get(data, "products", [])} />
              <TitleAndIconText
                title={t("Summa (mahsulotlar)").toUpperCase()}
                value={NumberToThousandFormat(get(data, "total_product_summa", ""))}
                icon={<RiStackFill />}
              />
              <Divider style={{ margin: "0" }} />
            </Flex>
          </Col>
          {!isEmpty(get(data, "services", [])) && (
            <Col span={24}>
              <Flex vertical gap={"15px"}>
                <Title level={5} align="center">
                  {t("Xizmatlar")}
                </Title>
                <Services data={get(data, "services", [])} />
                <TitleAndIconText
                  title={t("Summa (xizmatlar)").toUpperCase()}
                  value={NumberToThousandFormat(get(data, "total_service_summa", ""))}
                  icon={<RiShakeHandsFill />}
                />
                <Divider style={{ margin: "0" }} />
              </Flex>
            </Col>
          )}
          <Col span={24}>
            <Flex vertical gap={"15px"}>
              {get(data, "discount_summa", 0) != 0 && (
                <>
                  <TitleAndIconText
                    title={t("Chegirma").toUpperCase()}
                    value={NumberToThousandFormat(get(data, "discount_summa", ""))}
                    icon={<RiRefreshFill />}
                  />
                </>
              )}
              <TitleAndIconText
                title={t("Umumiy summa").toUpperCase()}
                value={NumberToThousandFormat(get(data, "total_summa", ""))}
                icon={<RiMoneyDollarBoxFill />}
              />
            </Flex>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default CheckUI

function Products({ data }) {
  const { t } = useTranslation()

  const columns = [
    {
      title: t("#"),
      dataIndex: "index",
      key: "index",
      render: (value, item, index) => {
        return <>{index + 1}</>
      },
    },
    {
      title: t("Nomi"),
      dataIndex: "product",
      key: "product",
      render: (value) => {
        return <>{get(value, "name", "")}</>
      },
    },
    {
      title: t("Narxi"),
      dataIndex: "price",
      key: "price",
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>
      },
    },
    {
      title: t("O'lcham (BxExS)"),  
      key: "size",
      render: (_, row) => {
        const width = get(row, "width", "")
        const height = get(row, "height", "")
        const count = get(row, "count", "")

        if (width && height) {
          return (
            <>
              {width} x {height} x {count}
            </>
          )
        } else {
          return <>{NumberToThousandFormat(count)}</>
        }
      },
    },
    // {
    //   title: t("O'lcham turi"),
    //   dataIndex: "size_type",
    //   key: "size_type",
    // },
    {
      title: t("Miqdor"),
      dataIndex: "total_count",
      key: "total_count",
      render: (value, row) => {
        if (get(row, "size_type") === "Formatli") {
          const height = get(row, "height")
          const width = get(row, "width")

          let perimeter =
            height && width ? 2 * (parseFloat(height) + parseFloat(width)) : 0;

          // Agar perimeter float bo'lsa, uni toFixed(2) bilan yaxlitlang
          if (perimeter % 1 !== 0) {
            perimeter = parseFloat(perimeter.toFixed(2));
          }

          return (
            <>
              {NumberToThousandFormat(value, row.product.format)} (
              {t("P")}: {perimeter})
            </>
          );

        } else {
          return <>{NumberToThousandFormat(value, row.product.format)}</>
        }
      },
    },
    {
      title: t("Summa"),
      dataIndex: "price",
      key: "price",
      render: (price, row) => {
        return <>{NumberToThousandFormat(price * row.total_count)}</>
      },
    },
  ]

  return <Table size="small" dataSource={data} columns={columns} pagination={false} />
}

function Services({ data }) {
  const { t } = useTranslation()

  const columns = [
    {
      title: t("#"),
      dataIndex: "index",
      key: "index",
      render: (value, item, index) => {
        return <>{index + 1}</>
      },
    },
    {
      title: t("Nomi"),
      dataIndex: "service",
      key: "service",
      render: (value) => {
        return <>{get(value, "name", "")}</>
      },
    },
    {
      title: t("Narxi"),
      dataIndex: "price",
      key: "price",
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>
      },
    },
    {
      title: t("Miqdori"),
      dataIndex: "count",
      key: "count",
      render: (value) => {
        return <>{NumberToThousandFormat(value, t("ta"))}</>
      },
    },
  ]

  return <Table size="small" pagination={false} dataSource={data} columns={columns} />
}

