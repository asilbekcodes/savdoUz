import Image from "@/assets/images/5196871.jpg";
import { RiRegisteredFill } from "@remixicon/react";
import { Button, Col, Row } from "antd";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Navbar from "../../_components/navbar/Navbar";
import { HeaderStyled } from "./header.styles";

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <HeaderStyled name="home" style={{ overflow: "hidden" }}>
      <Navbar />
      <Container>
        <div className="main">
          <Row gullter={[20, 20]}>
            <Col xs={24} md={24}>
              <div className="left">
                <h1
                  className="title"
                  dangerouslySetInnerHTML={{
                    __html: t(
                      "<span> Smart tizim</span> - biznesning savdo, moliya, omborxona ishlarini avtomatlashtirish tizimi"
                    ),
                  }}
                />
                <p className="description">
                  {t("Biz bilan biznesingizni oson boshqaring.")}
                </p>
                {/* <div>
                  <Button
                    icon={<RiRegisteredFill />}
                    type="primary"
                    size="large"
                    onClick={() => navigate("/auth/sign-up")}
                  >
                    {t("Ro'yxatdan o'tish")}
                  </Button>
                </div> */}
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </HeaderStyled>
  );
};

export default Header;
