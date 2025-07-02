import LogoIcon from "@/assets/images/logo-icon.png";
import Logo from "@/assets/images/logo.png";
import useUserStore from "@/store/useUserStore";
import {
  RiAlignItemBottomFill,
  RiArrowLeftSLine,
  RiBankFill,
  RiBarChart2Fill,
  RiBarChartBoxFill,
  RiBarChartHorizontalFill,
  RiBubbleChartFill,
  RiColorFilterFill,
  RiContactsBookFill,
  RiDashboard3Fill,
  RiDashboardFill,
  RiDatabase2Fill,
  RiDeleteBinFill,
  RiExchange2Fill,
  RiFileAddLine,
  RiFileListLine,
  RiGovernmentFill,
  RiGroupFill,
  RiGuideFill,
  RiHandCoinFill,
  RiHomeOfficeFill,
  RiPieChart2Fill,
  RiProductHuntFill,
  RiSettings6Fill,
  RiShakeHandsFill,
  RiShapesFill,
  RiShieldUserFill,
  RiShoppingBag3Fill,
  RiShoppingCart2Fill,
  RiShoppingCartFill,
  RiStackFill,
  RiTeamFill,
  RiTriangleFill,
  RiUserSettingsFill,
  RiUserStarFill,
  RiWaterFlashFill,
} from "@remixicon/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import * as S from "../Layout.styles";
import Category from "./Category";

const Sidebar = ({ openSidebar, toggleSidebar, setOpenSidebar }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const {
    me: { role },
  } = useUserStore();

  const [initialMenus, setInitialMenus] = useState([
    {
      label: t("ASOSIY"),
      icon: <RiDashboardFill />,
      permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER" ],
      children: [
        {
          title: t("Bosh sahifa"),
          path: "/admin/dashboard",
          icon: <RiDashboard3Fill />,
          permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER"],
        },
        {
          title: t("Savdo"),
          path: "/trades/trades",
          icon: <RiShoppingCartFill />,
          isClick: true,
          permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER"],
        },
        {
          title: t("Mahsulotlar"),
          path: "/products/products",
          icon: <RiProductHuntFill />,
          isClick: true,
          permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER"],
        },
        {
          title: t("Buyurtmalar"),
          path: "/orders/orders",
          icon: <RiFileListLine />,
          isClick: true,
          permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER"],
        },
        {
          title: t("Omborxonalar"),
          path: "/storages/storages",
          icon: <RiHomeOfficeFill />,
          isClick: true,
          permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER"],
        },
        {
          title: t("Statistika"),
          path: "/statistics/trade-statistics",
          icon: <RiBarChartBoxFill />,
          isClick: true,
          permissions: ["DIRECTOR", "MANAGER"],
        },
        {
          title: t("Moliya"),
          path: "/admin/payment",
          icon: <RiBankFill />,
          permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER"],
        },
        {
          title: t("Mijozlar"),
          path: "/clients/clients",
          icon: <RiTeamFill />,
          isClick: true,
          permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER"],
        },
        {
          title: t("Xizmatlar"),
          path: "/admin/services",
          icon: <RiShakeHandsFill />,
          permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER"],
        },
        {
          title: t("Yo'riqnoma"),
          path: "/admin/guide",
          icon: <RiGuideFill />,
          permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER"],
        },
      ],
    },
    {
      label: t("SAVDO"),
      icon: <RiShoppingCartFill />,
      children: [
        {
          title: t("Savdolar"),
          path: "/trades/trades",
          icon: <RiHandCoinFill />,
          permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER"],
        },
        {
          title: t("Savdo qo'shish"),
          path: "/trades/trade-create",
          icon: <RiShoppingCart2Fill />,
          permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER"],
        },
      ],
    },
    {
      label: t("MAHSULOT"),
      icon: <RiProductHuntFill />,
      children: [
        {
          title: t("Mahsulotlar"),
          path: "/products/products",
          icon: <RiStackFill />,
          permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER"],
        },
        {
          title: t("Kategoriya"),
          path: "/products/category",
          icon: <RiBarChartHorizontalFill />,
          permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER"],
        },
        {
          title: t("Format"),
          path: "/products/formats",
          icon: <RiShapesFill />,
          permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER"],
        },
      ],
    },
    {
      label: t("BUYURTMALAR"),
      icon: <RiFileListLine />,
      children: [
        {
          title: t("Buyurtmalar"),
          path: "/orders/orders",
          icon: <RiFileListLine />,
          permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER"],
        },
        {
          title: t("Buyurtma qo'shish"),
          path: "/orders/orders-create",
          icon: <RiFileAddLine />,
          permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER"],
        },
      ],
    },
    {
      label: t("MIJOZLAR"),
      icon: <RiTeamFill />,
      children: [
        {
          title: t("Mijozlar"),
          path: "/clients/clients",
          icon: <RiGroupFill />,
          permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER"],
        },
        {
          title: t("Maxsus mijozlar"),
          path: "/clients/special-clients",
          icon: <RiUserStarFill />,
          permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER"],
        },
      ],
    },
    {
      label: t("OMBORXONA"),
      icon: <RiHomeOfficeFill />,
      children: [
        {
          title: t("Omborxonalar"),
          path: "/storages/storages",
          icon: <RiDatabase2Fill />,
          permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER"],
        },
        {
          title: t("Omborga mahsulot"),
          path: "/storages/storage-products",
          icon: <RiShoppingBag3Fill />,
          permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER"],
        },
        {
          title: t("Ta'minotchilar"),
          path: "/storages/suppliers",
          icon: <RiUserStarFill />,
          permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER"],
        },
        {
          title: t("Yaroqsiz mahsulotlar"),
          path: "/storages/storage-products-off",
          icon: <RiWaterFlashFill />,
          permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER"],
        },
      ],
    },
    {
      label: t("MOLIYA"),
      icon: <RiBankFill />,
      children: [
        {
          title: t("Chiqim"),
          path: "/finance/finance-outcomes",
          icon: <RiExchange2Fill />,
          permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER"],
        },
        {
          title: t("Tranzaktsiya"),
          path: "/finance/finance-transactions",
          icon: <RiTriangleFill />,
          permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER"],
        },
      ],
    },
    {
      label: t("STATISTIKA"),
      icon: <RiBarChartBoxFill />,
      children: [
        {
          title: t("Savdo statistikasi"),
          path: "/statistics/trade-statistics",
          icon: <RiAlignItemBottomFill />,
          permissions: ["DIRECTOR", "MANAGER"],
        },
        {
          title: t("Ombor statistikasi"),
          path: "/statistics/storage-statistics",
          icon: <RiColorFilterFill />,
          permissions: ["DIRECTOR", "MANAGER"],
        },
        {
          title: t("Mahsulot statistikasi"),
          path: "/statistics/product-statistics",
          icon: <RiBarChart2Fill />,
          permissions: ["DIRECTOR", "MANAGER"],
        },
        {
          title: t("Moliya statistikasi"),
          path: "/statistics/finance-statistics",
          icon: <RiPieChart2Fill />,
          permissions: ["DIRECTOR", "MANAGER"],
        },
        {
          title: t("Mijoz statistikasi"),
          path: "/statistics/client-statistics",
          icon: <RiContactsBookFill />,
          permissions: ["DIRECTOR", "MANAGER"],
        },
        {
          title: t("Xizmatlar statistikasi"),
          path: "/statistics/service-statistics",
          icon: <RiBubbleChartFill />,
          permissions: ["DIRECTOR", "MANAGER"],
        },
      ],
    },
    {
      label: t("SOZLAMALAR"),
      icon: <RiSettings6Fill />,
      children: [
        {
          title: t("Profil"),
          path: "/settings/profile",
          icon: <RiShieldUserFill />,
          permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER"],
        },
        {
          title: t("Tashkilot"),
          path: "/settings/organization",
          icon: <RiGovernmentFill />,
          permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER"],
        },
        {
          title: t("Xodimlar"),
          path: "/settings/workers",
          icon: <RiUserSettingsFill />,
          permissions: ["DIRECTOR"],
        },
        {
          title: t("O'chirilgan"),
          path: "/settings/delete-basket",
          icon: <RiDeleteBinFill />,
          permissions: ["DIRECTOR", "MANAGER", "SHOPKEEPER"],
        },
      ],
    },
  ]);

  const [MENUS, setMenus] = useState([]);

  useEffect(() => {
    const updatedMenu = initialMenus?.map((menu) => {
      const isOpen = menu.children.some(
        (child) => child.path === location.pathname && !child.isClick
      );
      return { ...menu, isOpen };
    });

    setInitialMenus(updatedMenu);
  }, [location.pathname]);

  useEffect(() => {
    const filteredMenus = initialMenus
      ?.map((menu) => ({
        ...menu,
        children: menu.children.filter((child) =>
          child.permissions.includes(role)
        ),
      }))
      .filter((menu) => menu.children.length > 0);

    setMenus(filteredMenus);
  }, [role, initialMenus]);

  const handleCategoryClick = (clickedItem) => {
    const updatedMenu = MENUS.map((menu) =>
      menu.label === clickedItem.label
        ? { ...menu, isOpen: !menu.isOpen }
        : { ...menu, isOpen: false }
    );
    setMenus(updatedMenu);
  };

  return (
    <S.Sidebar openSidebar={openSidebar}>
      <div className="logo-box">
        <div className="logo">
          {openSidebar ? (
            <img src={Logo} style={{ width: "150px" }} />
          ) : (
            <img src={LogoIcon} style={{ width: "40px" }} />
          )}{" "}
        </div>
        <div className="mobile-open-close-btn" onClick={() => toggleSidebar()}>
          <RiArrowLeftSLine />
        </div>
      </div>
      <div className="menu-box">
        <div className="categories">
          {MENUS?.map((item, index) => (
            <Category
              item={item}
              openSidebar={openSidebar}
              key={index}
              open={item.isOpen}
              handleToggle={handleCategoryClick}
              setOpenSidebar={setOpenSidebar}
            />
          ))}
        </div>
      </div>
    </S.Sidebar>
  );
};

export default Sidebar;
