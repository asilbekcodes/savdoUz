import React from "react";
import { HiChevronLeft } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import icon from "../assets/Vector (5).svg";
import savat from "../assets/Group 1414.svg";

function TopBar({ text }) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center w-full">
        {/* <HiChevronLeft className="text-lg mr-2" /> */}
        <img onClick={goBack} src={icon} alt="" />
        <span className="flex-1 text-[24px] text-center font-semibold text-black">
          {text}
        </span>
      </div>
      <Link to="/user/savat">
        <img src={savat} alt="" />
      </Link>
    </div>
  );
}

export default TopBar;
