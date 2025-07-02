import { RiArrowDownSLine } from "@remixicon/react";
import { Tooltip } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import * as S from "../Layout.styles";

const Category = ({
  item,
  openSidebar,
  open,
  handleToggle,
  setOpenSidebar,
}) => {
  const navigate = useNavigate();

  return (
    <S.Category className="category" open={open} openSidebar={openSidebar}>
      <Tooltip placement="top" title={openSidebar ? "" : item.label}>
        <div className="label" onClick={() => handleToggle(item)}>
          {openSidebar && (
            <div className="left">
              {item.icon}
              <div className="title">{item.label}</div>
            </div>
          )}

          <div className="arrow-icon">
            <RiArrowDownSLine />
          </div>
        </div>
      </Tooltip>

      <ul className="menu">
        {item?.children?.map((menu, index) => (
          <li key={index} className="menu-item">
            <Tooltip placement="right" title={openSidebar ? "" : menu.title}>
              {menu.isClick ? (
                <div
                  className="menu-item-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (window.innerWidth < 567) {
                      setOpenSidebar(false);
                    }
                    navigate(menu.path);
                  }}
                >
                  <div className="icon">{menu.icon}</div>
                  {openSidebar && <div className="title">{menu.title}</div>}
                </div>
              ) : (
                <NavLink
                  className="menu-item-link"
                  to={menu.path}
                  onClick={() => {
                    if (window.innerWidth < 567) {
                      setOpenSidebar(false);
                    }
                  }}
                >
                  <div className="icon">{menu.icon}</div>
                  {openSidebar && <div className="title">{menu.title}</div>}
                </NavLink>
              )}
            </Tooltip>
          </li>
        ))}
      </ul>
    </S.Category>
  );
};

export default Category;
