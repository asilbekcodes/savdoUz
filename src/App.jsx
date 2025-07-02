import { ConfigProvider, theme } from "antd";
import enUS from "antd/locale/en_US";
import ruRU from "antd/locale/ru_RU";
import uzUZ from "antd/locale/uz_UZ";
import { ThemeProvider } from "styled-components";
import Router from "./router";
import useLangStore from "./store/useLangStrore";
import useThemeStore from "./store/useThemeStore";
import GlobalStyles from "./styles/global.styles";
import darkTheme from "./styles/themes/darkTheme";
import lightTheme from "./styles/themes/lightTheme";

function App() {
  const { mode } = useThemeStore();

  const { lang } = useLangStore();

  const LANG = lang === 'uz' ? uzUZ : lang === 'ru' ? ruRU : enUS;

  const THEME = mode === "light" ? lightTheme : darkTheme;

  const config = {
    token: {
      colorPrimary: THEME.colors.primaryColor,
      colorBgBase: THEME.colors.backgroundBaseNormal,
      colorTextBase: THEME.colors.textBasePrimary,
      borderRadius: 6,
      fontFamily: "Poppins",
      fontSize: 14,

      colorText: THEME.colors.textBasePrimary,
      colorTextSecondary: THEME.colors.textBaseSecondary,
      colorTextTertiary: THEME.colors.textBaseTertiary,
    },
    algorithm: [theme.compactAlgorithm],
  };

  return (
    <ConfigProvider theme={config} locale={LANG}>
      <ThemeProvider theme={THEME}>
        <GlobalStyles />
        <Router />
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default App;
