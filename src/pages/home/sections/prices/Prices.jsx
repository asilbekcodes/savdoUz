import {
  RiAwardFill,
  RiBarChartBoxFill,
  RiCalendarScheduleFill,
  RiCashFill,
  RiCheckFill,
  RiCloseFill,
  RiGroup3Fill,
  RiGroupFill,
  RiInfinityFill,
  RiMedal2Fill,
  RiMedalFill,
  RiStore3Fill,
  RiUserStarFill,
  RiWallet3Fill,
} from "@remixicon/react";
import { Button, Col, Row } from "antd";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Styled } from "./prices.styles";
import { useNavigate } from "react-router-dom";

const Prices = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const data = [
    {
      name: "Basic",
      icon: <RiAwardFill size={40} />,
      info: {
        statistics: <RiCloseFill style={{ color: "red" }} />,
        storages: 1,
        clients: 50,
        suppliers: 50,
        workers: 10,
        day: 10,
        price: {
          monthly: "99.000",
          yearly: "1.000.000",
        },
      },
    },
    {
      name: "Premium",
      icon: <RiMedalFill size={40} />,
      info: {
        statistics: <RiCheckFill style={{ color: "green" }} />,
        storages: 2,
        clients: 100,
        suppliers: 100,
        workers: 10,
        day: 10,
        price: {
          monthly: "199.000",
          yearly: "2.000.000",
        },
      },
    },
    {
      name: "Gold",
      icon: <RiMedal2Fill size={40} />,
      info: {
        statistics: <RiCheckFill style={{ color: "green" }} />,
        storages: <RiInfinityFill />,
        clients: <RiInfinityFill />,
        suppliers: <RiInfinityFill />,
        workers: <RiInfinityFill />,
        day: 10,
        price: {
          monthly: "299.000",
          yearly: "3.000.000",
        },
      },
    },
  ];

  return (
    <Styled name="prices" style={{ overflow: "hidden" }}>
      <>
        <Container>
          <div className="title">{t("Narxlar")}</div>
          <div className="desc">
            {t("Gold tarifni 10 kun bepul sinab ko'ring !")}
          </div>
          <Row gutter={[20, 20]} className="cards">
            {data.map((item) => {
              return (
                <Col xs={24} md={8}>
                  <div className="my-card">
                    <div className="img-box">{item.icon}</div>
                    <div className="card-title">{item.name}</div>
                    <ul className="info-data">
                      <li>
                        <div className="icon">
                          <RiBarChartBoxFill size={25} />
                        </div>
                        <div className="text">{t("Statistika")}:</div>
                        <div className="count">{item.info.statistics}</div>
                      </li>
                      <li>
                        <div className="icon">
                          <RiStore3Fill size={25} />
                        </div>
                        <div className="text">{t("Omborxona soni")}:</div>
                        <div className="count">{item.info.storages}</div>
                      </li>
                      <li>
                        <div className="icon">
                          <RiGroupFill size={25} />
                        </div>
                        <div className="text">{t("Mijozlar soni")}:</div>
                        <div className="count">{item.info.clients}</div>
                      </li>
                      <li>
                        <div className="icon">
                          <RiUserStarFill size={25} />
                        </div>
                        <div className="text">{t("Ta'minotchilar soni")}:</div>
                        <div className="count">{item.info.suppliers}</div>
                      </li>
                      <li>
                        <div className="icon">
                          <RiGroup3Fill size={25} />
                        </div>
                        <div className="text">{t("Ishchilar soni")}:</div>
                        <div className="count">{item.info.workers}</div>
                      </li>
                      <li>
                        <div className="icon">
                          <RiCashFill size={25} />
                        </div>
                        <div className="text">{t("Narxi (Oylik)")}:</div>
                        <div className="count">
                          {item?.info?.price?.monthly} {t("so'm")}
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <RiWallet3Fill size={25} />
                        </div>
                        <div className="text">{t("Narxi (Yillik)")}:</div>
                        <div className="count">
                          {item?.info?.price?.yearly} {t("so'm")}
                        </div>
                      </li>
                    </ul>
                    <div className="btn-box">
                      <Button
                        type="primary"
                        onClick={() => navigate("/auth/sign-in")}
                      >
                        {t("Sinab ko'rish")}
                      </Button>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </>
    </Styled>
  );
};

export default Prices;
