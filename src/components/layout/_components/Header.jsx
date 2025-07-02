import CustomSelect from "@/components/atoms/form-elements/custom-select/CustomSelect";
import useAuthStore from "@/store/useAuthStore";
import useLangStore from "@/store/useLangStrore";
import useThemeStore from "@/store/useThemeStore";
import useUserStore from "@/store/useUserStore";
import { UserOutlined } from "@ant-design/icons";
import {
  RiArrowLeftSLine,
  RiGovernmentFill,
  RiLogoutBoxFill,
  RiMoonClearFill,
  RiShieldUserFill,
  RiSunFill,
} from "@remixicon/react";
import { Avatar, Dropdown, Flex, Typography } from "antd";
import { get } from "lodash";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import * as S from "../Layout.styles";

const Header = ({ openSidebar, toggleSidebar }) => {
  const { t } = useTranslation();

  const { me } = useUserStore();
  const { setTheme, mode } = useThemeStore();
  const { clearAccessToken } = useAuthStore();

  const logout = () => {
    clearAccessToken();
  };

  const toggleTheme = () => {
    setTheme(mode === "dark" ? "light" : "dark");
  };

  const PROFILE_ITEMS = [
    {
      icon: <RiShieldUserFill size={20} />,
      label: (
        <Flex justify="center" vertical>
          <NavLink to={"/settings/profile"}>{`${get(
            me,
            "first_name",
            ""
          )} ${get(me, "last_name", "")}`}</NavLink>
          <Typography.Text type="">{get(me, "role", "")}</Typography.Text>
        </Flex>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: <NavLink to={"/settings/organization"}>{t("Tashkilot")}</NavLink>,
      key: "1",
      icon: <RiGovernmentFill size={20} />,
    },
    {
      type: "divider",
    },
    {
      label: <>{t("Chiqish")}</>,
      key: "3",
      icon: <RiLogoutBoxFill size={20} />,
      onClick: logout,
    },
  ];

  const { lang, setLang } = useLangStore();

  const { i18n } = useTranslation();

  const [currentLang, setCurrentLang] = useState(i18n.language);

  const changeLanguage = (lang = "en") => {
    setCurrentLang(lang);
    setLang(lang);
    i18n.changeLanguage(lang);
    window.location.reload();
  };

  return (
    <S.Header openSidebar={openSidebar}>
      <div className="open-close-btn" onClick={() => toggleSidebar()}>
        <RiArrowLeftSLine />
      </div>
      <Flex gap="middle">
        <CustomSelect
          size={"middle"}
          style={{ width: 50 }}
          allowClear={false}
          showSearch={false}
          value={currentLang}
          onChange={changeLanguage}
          options={[
            {
              value: "uz",
              label: "UZ",
            },
            { value: "ru", label: "RU" },
            { value: "en", label: "EN" },
          ]}
        />
        <div className="switch-theme" onClick={() => toggleTheme()}>
          {mode === "dark" ? <RiSunFill /> : <RiMoonClearFill />}
        </div>
        <Dropdown menu={{ items: PROFILE_ITEMS }} trigger={["click"]}>
          <Avatar
            style={{ cursor: "pointer" }}
            size={35}
            shape="square"
            icon={<UserOutlined />}
          />
        </Dropdown>
      </Flex>
    </S.Header>
  );
};

export default Header;
