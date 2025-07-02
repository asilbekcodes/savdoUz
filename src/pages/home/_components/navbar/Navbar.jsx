import Logo from "@/assets/images/logo.png";
import CustomSelect from "@/components/atoms/form-elements/custom-select/CustomSelect";
import useLangStore from "@/store/useLangStrore";
import { Button, Flex } from "antd";
import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import HamburgerIcon from "../hamburger-icon/HamburgerIcon";
import { NavbarStyled } from "./navbar.styled";

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { lang, setLang } = useLangStore();

  const [menu_show, setMenuShow] = useState(false);

  const toggleMenu = () => setMenuShow(!menu_show);

  const { i18n } = useTranslation();

  const [currentLang, setCurrentLang] = useState(i18n.language);

  const changeLanguage = (lang = "en") => {
    setCurrentLang(lang);
    setLang(lang);
    i18n.changeLanguage(lang);
  };

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

  const [offset, setOffset] = useState(135);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: Number(window.innerWidth),
        height: Number(window.innerHeight),
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenSize.width > 1440) {
      setOffset(-100);
    } else if (screenSize.width < 1440 && screenSize.width > 576) {
      setOffset(-100);
    } else {
      setOffset(-100);
    }
  }, [screenSize]);

  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (lang_open === true) {
      if (ref.current && !ref.current.contains(event.target)) {
        setLangOpen(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return (
    <NavbarStyled>
      <div className="desctop-navbar">
        <Container>
          <div className="content">
            <div className="logo-box">
              <a href="#home">
                <img
                  onClick={() => scroll.scrollToTop()}
                  className="desctop-logo"
                  src={Logo}
                  style={{ width: "150px", cursor: "pointer" }}
                  alt=""
                />
              </a>
            </div>
            <ul>
              {menus.map((menu, index) => (
                <li key={index}>
                  <Link
                    activeClass="active"
                    to={menu.target}
                    spy={true}
                    smooth={true}
                    hashSpy={true}
                    offset={offset}
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
            <div className="right-box">
              <Flex gap={"large"}>
                <CustomSelect
                  style={{ width: 50 }}
                  allowClear={false}
                  showSearch={false}
                  value={currentLang}
                  onChange={changeLanguage}
                  options={[
                    { value: "uz", label: "UZ" },
                    { value: "ru", label: "RU" },
                    { value: "en", label: "EN" },
                  ]}
                />
                <Flex gap={"middle"}>
                  <Button
                    className="sign-in"
                    onClick={() => navigate("/auth/sign-in")}
                  >
                    {t("Kirish")}
                  </Button>
                  {/* <Button
                    type="primary"
                    className="sign-up"
                    onClick={() => navigate("/auth/sign-up")}
                  >
                    {t("Ro'yxatdan o'tish")}
                  </Button> */}
                </Flex>
              </Flex>
            </div>
          </div>
        </Container>
      </div>

      <div className="mobile-navbar">
        <Container>
          <div className="content-box">
            <div className="logo-box">
              <img
                onClick={() => scroll.scrollToTop()}
                className="desctop-logo"
                src={Logo}
                style={{ width: "150px", cursor: "pointer" }}
                alt=""
              />
            </div>
            <div className="right">
              <Flex gap={"middle"} align="center">
                <CustomSelect
                  size={"large"}
                  defaultValue="lucy"
                  style={{ width: 50 }}
                  allowClear={false}
                  showSearch={false}
                  // onChange={handleChange}
                  options={[
                    { value: "jack", label: "UZ" },
                    { value: "lucy", label: "RU" },
                    { value: "Yiminghe", label: "EN" },
                  ]}
                />
                <HamburgerIcon toggleMenu={toggleMenu} menu_show={menu_show} />
              </Flex>
            </div>
          </div>
        </Container>
      </div>

      <div className={`left-menu  ${menu_show ? "open" : "close"}`}>
        <ul>
          {menus.map((menu, index) => (
            <li key={index}>
              <Link
                activeClass="active"
                to={menu.target}
                spy={true}
                smooth={true}
                hashSpy={true}
                offset={offset}
                duration={100}
                delay={100}
                isDynamic={true}
                ignoreCancelEvents={false}
                spyThrottle={500}
                onClick={() => toggleMenu()}
              >
                {menu.name}
              </Link>
            </li>
          ))}
          <li>
            <Button
              className="sign-in"
              size="large"
              onClick={() => navigate("/auth/sign-in")}
            >
              {t("Kirish")}
            </Button>
          </li>
          {/* <li>
            <Button
              type="primary"
              size="large"
              className="sign-up"
              onClick={() => navigate("/auth/sign-up")}
            >
              {t("Ro'yxatdan o'tish")}
            </Button>
          </li> */}
        </ul>
      </div>
    </NavbarStyled>
  );
};

export default Navbar;
