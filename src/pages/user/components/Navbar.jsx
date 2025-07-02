import React from "react";
import { Link } from "react-router-dom";
import savat from "../assets/Group 1414.svg";
import profil from "../assets/Vector.svg";
import search from "../assets/Vector (1).svg";
import logo from "@/assets/images/logo-icon.png";
import buyurtma from "../assets/Vector (7).svg";

function Navbar() {
  return (
    <div>
      <nav className="flex items-center justify-between bg-white lg:px-40">
        {/* Kompyuter versiyasi */}
        <div className="flex items-center justify-between w-full">
          <Link to={"/user"} className="w-16 md:w-32">
            <img src={logo || "/placeholder.svg"} alt="logo" />
          </Link>
          <div className="w-[200px] lg:w-[350px] xl:w-[500px] items-center relative hidden lg:flex">
            <input
              type="search"
              id="search-dropdown"
              //   value={searchTerm}
              //   onChange={(e) => setSearchTerm(e.target.value)}
              className="py-2.5 px-4 w-full text-sm text-gray-900 rounded-lg border-s-2 border border-gray-300 outline-none"
              placeholder="Mahsulotlarni qidirish..."
              required
            />
            <button
              type="submit"
              className="px-4 xl:px-7 py-[13.5px] text-sm font-medium h-full text-white rounded-e-lg border bg-[#F6F9FC] relative right-1"
            >
              <img src={search} alt="" />
              {/* <FaSearch className="text-gray-500" /> */}
            </button>
            {/* Filtrlash natijalarini ko'rsatish */}
            {/* {filteredData.length > 0 && (
              <ul className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg z-10 max-h-52 overflow-y-auto">
                {filteredData.map((item) => (
                  <Link to={`/about/${item.id}`} key={item.id}>
                    <li
                      className="hover:cursor-pointer hover:bg-gray-50 p-2"
                      onClick={() => setSearchTerm(item.title)}
                    >
                      {item.title}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
            {searchTerm && filteredData.length === 0 && (
              <p className="absolute top-12 left-0 w-full p-2 bg-white shadow-lg rounded-lg z-10 max-h-52 overflow-y-auto">
                Ma'lumotlar topilmadi
              </p>
            )} */}
          </div>
          <div className="flex items-center space-x-3 xl:space-x-6">
            <Link to="/user/savat" className="flex items-center text-black text-xl">
              <img src={savat} alt="" />
              <span className="hidden md:block ml-2">Savat</span>
            </Link>
            <Link
              to="/user/orders"
              className="flex items-center text-black text-xl"
            >
              <img className="mr-2 hidden md:block" src={buyurtma} alt="savat" />
              <span className="hidden md:block">Buyurtmalar</span>
            </Link>
            <Link to="/user/profil" className="hidden md:flex items-center text-black text-xl">
              <img className="mr-2" src={profil} alt="" />
              Profil
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
