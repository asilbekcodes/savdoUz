import React from "react";
import TopBar from "../user/components/TopBar";
import tel from "../user/assets/Vector (6).svg";
import Footer from "../user/components/Footer";
import profil from "../user/assets/Vector.svg";
import mijoz from "./assets/Vector (8).svg";
import home from "../user/assets/Vector (3).svg";
import { useQuery } from "@tanstack/react-query";
import { httpGetMe } from "@/services/api/requests/auth.requests";
import useAuthStore from "@/store/useAuthStore";

const deliverLinks = [
  { to: "/deliver/deliver", label: "Asosiy", icon: home },
  { to: "/deliver/mijozlar", label: "Mijozlar", icon: mijoz },
  { to: "/deliver/profil", label: "Profil", icon: profil },
];

function Profil() {
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
    isRefetching,
    ...rest
  } = useQuery({
    queryKey: ["me"],
    queryFn: () => httpGetMe(),
    select: (response) => response.data,
  });

  const { clearAccessToken } = useAuthStore();

  const logout = () => {
    clearAccessToken();
  };

  return (
    <div className="p-3">
      <TopBar text={"Profil"} />
      <main className="mt-4">
        <h2 className="text-xl font-semibold mb-4 hidden md:block">
          Profil Ma'lumotlari
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Ism"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue={data?.first_name}
          />
          <input
            type="text"
            placeholder="Familiya"
            defaultValue={data?.last_name}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            defaultValue={data?.username}
            placeholder="+998 99 000 90 90"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* <input
                    type="text"
                    placeholder="INN"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  /> */}
          <input
            type="email"
            placeholder="Email"
            defaultValue={data?.email}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* <input
            type="text"
            placeholder="Manzil"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
        </div>
        <div className="flex items-center justify-center my-5">
          <p className="m-0 text-red-600 cursor-pointer" onClick={logout}>
            Tizimdan chiqish
          </p>
        </div>
        <div className="block md:hidden">
          <a href="tel:+998938080018">
            <button className="flex items-center justify-center gap-2 w-full p-3 mb-20 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              <img className="w-6" src={tel} alt="" />
              Call Center
            </button>
          </a>
        </div>
      </main>
      <Footer links={deliverLinks} />
    </div>
  );
}

export default Profil;
