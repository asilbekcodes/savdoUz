import {
  RiBankFill,
  RiBarChartBoxFill,
  RiCheckFill,
  RiShoppingCartFill,
  RiStore3Fill,
} from "@remixicon/react";
import { Col, Row } from "antd";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Styled } from "./adventages.styles";

const Adventages = () => {
  const { t } = useTranslation();

  const data = [
    {
      name: t("Omborxona"),
      icon: <RiStore3Fill size={40} />,
      info: [
        {
          text: t("Omborga keltiriladigan mahsulotlar hisobi"),
        },
        {
          text: t("Qarzga, Naqtga import qilish jarayonlari hisobi"),
        },
        {
          text: t("Ta'minotchilar orqali omborlar balansini tahlil qilish"),
        },
      ],
    },
    {
      name: t("Savdo"),
      icon: <RiShoppingCartFill size={40} />,
      info: [
        {
          text: t("Mijozlar bilan qarz yoki naqt tranzaksiyada savdo qilish"),
        },
        {
          text: t("Qarzdor mijozlarni tahlil qilib borish"),
        },
        {
          text: t("Haridorlar uchun kvitansiya chiqarish"),
        },
      ],
    },
    {
      name: t("Moliya"),
      icon: <RiBankFill size={40} />,
      info: [
        {
          text: t("Barcha turdagi chiqimlarni kiritib borish"),
        },
        {
          text: t(
            "Naqt, Karta va boshqa turdagi to'lov usullari bilan ishlash"
          ),
        },
        {
          text: t("Kerakli hisobotlarni excel formatda integratsiya qilish"),
        },
      ],
    },
    {
      name: t("Statistika"),
      icon: <RiBarChartBoxFill size={40} />,
      info: [
        {
          text: t("Savdo jarayonlarini vaqtbay kuzatib borish"),
        },
        {
          text: t("Ombordagi mahsulotlar jarayonlarini kuzatib borish"),
        },
        {
          text: t("Mahsulot, qarzdorlik qoldiqlarini tahlil qilish"),
        },
      ],
    },
  ];

  return (
    <Styled name="suggestions" style={{ overflow: "hidden" }}>
      <>
        <Container>
          <div className="title">{t("Bizning takliflar")}</div>
          <div className="desc">
            {t("Qaysi yo'nalishlarni avtomatlashtiramiz:")}
          </div>
          <Row gutter={[20, 20]} className="cards">
            {data.map((item) => {
              return (
                <Col xs={24} md={6}>
                  <div className="my-card">
                    <div className="img-box">{item.icon}</div>
                    <div className="card-title">{item.name}</div>
                    <ul className="info-data">
                      {item.info.map((i) => (
                        <li>
                          <div className="icon">
                            <RiCheckFill />
                          </div>
                          <div className="text">{i.text}</div>
                        </li>
                      ))}
                    </ul>
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

export default Adventages;
