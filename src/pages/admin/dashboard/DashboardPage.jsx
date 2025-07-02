import ProductsCover from "@/assets/images/products-cover.png";
import StorageCover from "@/assets/images/storage-cover.png";
import TradeCover from "@/assets/images/trade-cover.png";
import { Card, Col, Flex, Row, Steps } from "antd";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const { Meta } = Card;

const Styled = styled.div`
  .ant-card {
    .ant-card-cover {
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 50%;
      }
    }
    .ant-card-body {
      padding: 20px;
      padding-top: 10px;
    }
  }
`;

const DashboardPage = () => {
  const { t } = useTranslation();

  return (
    <Styled>
      <Row gutter={[20, 20]}>
        <Col xs={24} md={24}>
          <Card>
            <Meta
              title={"SMART TIZIM"}
              description={t("Ushbu dastur orqali biznesingizni boshqaring !")}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card
            style={{ height: "100%" }}
            hoverable={true}
            cover={<img alt="example" src={ProductsCover} />}
          >
            <Meta
              title={t("Mahsulotlar")}
              description={
                <Flex gap={"large"} vertical>
                  <>
                    <Steps
                      current={-1}
                      direction="vertical"
                      items={[
                        {
                          title: (
                            <NavLink to={"/products/category"}>
                              {t("Mahsulot kategoriyalarini qo'shing")}
                            </NavLink>
                          ),
                        },
                        {
                          title: (
                            <NavLink to={"/products/formats"}>
                              {t("Mahsulot formatlarini qo'shing")}
                            </NavLink>
                          ),
                        },
                        {
                          title: (
                            <NavLink to={"/products/products"}>
                              {t("Mahsulotlaringizni qo'shing")}
                            </NavLink>
                          ),
                        },
                      ]}
                    />
                  </>
                </Flex>
              }
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card
            style={{ height: "100%" }}
            hoverable={true}
            cover={<img alt="example" src={StorageCover} />}
          >
            <Meta
              title={t("Omborxona")}
              description={
                <Flex gap={"large"} vertical>
                  <>
                    <Steps
                      current={-1}
                      direction="vertical"
                      items={[
                        {
                          title: (
                            <NavLink to={"/storages/storages"}>
                              {t("Omborxona qo'shing")}
                            </NavLink>
                          ),
                        },
                        {
                          title: (
                            <NavLink to={"/storages/suppliers"}>
                              {t("Ta'minotchi qo'shing")}
                            </NavLink>
                          ),
                        },
                        {
                          title: (
                            <NavLink to={"/storages/storage-products"}>
                              {t("Omborga mahsulot qo'shing")}
                            </NavLink>
                          ),
                        },
                      ]}
                    />
                  </>
                </Flex>
              }
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card
            style={{ height: "100%" }}
            hoverable={true}
            cover={<img alt="example" src={TradeCover} />}
          >
            <Meta
              title={t("Savdolar")}
              description={
                <Flex gap={"large"} vertical>
                  <>
                    <Steps
                      current={-1}
                      direction="vertical"
                      items={[
                        {
                          title: (
                            <NavLink to={"/clients/clients"}>
                              {t("Mijozlaringizni qo'shing")}
                            </NavLink>
                          ),
                        },
                        {
                          title: (
                            <NavLink to={"/trades/trade-create"}>
                              {t("Savdolaringizni qo'shing")}
                            </NavLink>
                          ),
                        },
                      ]}
                    />
                  </>
                </Flex>
              }
            />
          </Card>
        </Col>
      </Row>
    </Styled>
  );
};

export default DashboardPage;
