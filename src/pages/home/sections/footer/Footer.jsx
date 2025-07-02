import {
  RiFacebookBoxFill,
  RiInstagramFill,
  RiMailFill,
  RiPhoneFill,
  RiTelegramFill,
  RiYoutubeFill
} from "@remixicon/react";
import { Col, Row } from "antd";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-scroll";
import { Styled } from "./footer.styles";
import Logo from "@/assets/images/logo.png";

const Footer = () => {
  const { t } = useTranslation();

  const menus = [
    {
      name: t("Bosh sahifa"),
      target: "home",
    },
    {
      name: t("Sohalar"),
      target: "industries",
    },
    {
      name: t("Takliflar"),
      target: "suggestions",
    },
    {
      name: t("Narxlar"),
      target: "prices",
    },
  ];

  return (
    <Styled name="contacts" style={{ overflow: "hidden" }}>
      <>
        <Container>
          <Row gutter={[30, 30]}>
            <Col xs={24} md={8}>
              <div className="box">
                <div className="title">
                  <img
                    onClick={() => scroll.scrollToTop()}
                    className="desctop-logo"
                    src={Logo}
                    style={{ width: "150px", cursor: "pointer" }}
                    alt=""
                  />
                </div>
                <div className="commit">
                  {t("Smart tizim - aqlli tizim platformasi.")}
                </div>
                <div className="contact-box">
                  <a
                    href="https://www.instagram.com/smarttizim1"
                    target="_blank"
                  >
                    <RiInstagramFill size={25} />
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61563322245109"
                    target="_blank"
                  >
                    <RiFacebookBoxFill size={25} />
                  </a>
                  <a href="https://youtube.com/@smart-tizim" target="_blank">
                    <RiYoutubeFill size={25} />
                  </a>
                  <a href="https://t.me/smarttizim" target="_blank">
                    <RiTelegramFill size={25} />
                  </a>
                </div>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="box">
                <div className="title">{t("Menyu")}</div>
                <ul>
                  {menus.map((menu, index) => (
                    <li key={index}>
                      <Link
                        activeClass="active"
                        to={menu.target}
                        spy={true}
                        smooth={true}
                        hashSpy={true}
                        duration={100}
                        delay={100}
                        isDynamic={true}
                        ignoreCancelEvents={false}
                        spyThrottle={500}
                      >
                        {menu.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="box">
                <div className="title">{t("Kontaktlar")}</div>
                <ul>
                  <li>
                    <div className="phone">
                      <RiPhoneFill size={25} /> <span>+998 77 300 28 29</span>
                    </div>
                  </li>
                  <li>
                    <div className="phone">
                      <RiMailFill size={25} /> <span>smarttizim@gmail.com</span>
                    </div>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <div className="footer-border" />
          <div className="text">
            Copyright @ SMART TIZIM {new Date().getFullYear()}.{" "}
            {t("Barcha huquqlar himoyalangan.")}
          </div>
        </Container>
      </>
    </Styled>
  );
};

export default Footer;
