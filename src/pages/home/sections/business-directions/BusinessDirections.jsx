import {
  RiBattery2ChargeFill,
  RiBuilding2Fill,
  RiCalendarTodoFill,
  RiCommandLine,
  RiDatabaseLine,
  RiHammerFill,
  RiTShirt2Fill,
  RiToolsFill,
} from "@remixicon/react";
import { Col, Row } from "antd";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Element } from "react-scroll";
import { BusinessDirectionsStyled } from "./business-directions.styles";

const BusinessDirections = () => {
  const { t } = useTranslation();

  const data = [
    {
      name: t("Qurilish mollari"),
      icon: <RiBuilding2Fill size={40} />,
    },
    {
      name: t("Xozmak"),
      icon: <RiHammerFill size={40} />,
    },
    {
      name: t("Aksessuar"),
      icon: <RiCommandLine size={40} />,
    },
    {
      name: t("Maishiy texnika"),
      icon: <RiDatabaseLine size={40} />,
    },
    {
      name: t("Santexnika"),
      icon: <RiToolsFill size={40} />,
    },
    {
      name: t("Kiyim-kechak"),
      icon: <RiTShirt2Fill size={40} />,
    },
    {
      name: t("Kanstovar"),
      icon: <RiCalendarTodoFill size={40} />,
    },
    {
      name: t("Elektronika"),
      icon: <RiBattery2ChargeFill size={40} />,
    },
  ];

  return (
    <BusinessDirectionsStyled name="industries" style={{ overflow: "hidden" }}>
      <>
        <Container>
          <div className="title">{t("Qo'llab quvvatlaydigan sohalar")}</div>
          <div className="desc">
            {t("Smart tizim qaysi sohalarga mos keladi ?")}
          </div>
          <Row gutter={[20, 20]} className="cards">
            {data.map((item) => {
              return (
                <Col xs={12} md={6}>
                  <div className="my-card">
                    <div className="img-box">{item.icon}</div>
                    <div className="card-title">{item.name}</div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </>
    </BusinessDirectionsStyled>
  );
};

export default BusinessDirections;
