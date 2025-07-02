import React, { useState } from "react";
import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import icon from "./assets/Vector 2 (1).svg";
import home from "./assets/Vector (3).svg";
import search from "./assets/Vector (1).svg";
import profil from "./assets/Vector.svg";
import order from "./assets/Ellipse 286.svg";
import imoji from "./assets/emoji.svg";
import { useQuery } from "@tanstack/react-query";
import { httpGetOrder } from "@/services/api/requests/order.request";
import dayjs from "dayjs";
import mijoz from "../deliver/assets/Vector (8).svg"
import useUserStore from "@/store/useUserStore";

const userLinks = [
  { to: "/user/user", label: "Asosiy", icon: home },
  { to: "/user/katalog", label: "Katalog", icon: search },
  // { to: "/user/aksiyalar", label: "Aksiyalar", icon: imoji, userRole: "CLIENT" },
  { to: "/user/mijozlar", label: "Mijozlar", icon: mijoz, userRole: "MANAGER" },
  { to: "/user/orders", label: "Buyurtmalar", icon: order },
  { to: "/user/profil", label: "Profil", icon: profil },
];

function Order() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["trades"],
    queryFn: httpGetOrder,
    select: (response) => response.data,
  });

  const [openOrderId, setOpenOrderId] = useState(null);

  if (isLoading) return <div>Yuklanmoqda...</div>;
  if (isError) return <div>Xatolik: {error.message}</div>;

  const toggleOrder = (orderId) => {
    setOpenOrderId(openOrderId === orderId ? null : orderId);
  };

  const role = useUserStore();
  const userRole = role.me.role  

  const filteredLinks = userLinks.filter(link => !link.userRole || link.userRole === userRole);

  return (
    <div className="p-3">
      <div className="md:block hidden">
        <Navbar />
      </div>
      <div className="md:hidden block">
        <TopBar text="Buyurtmalar" />
      </div>
      <div className="lg:px-40 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {data.map((order) => (
            <div key={order.id} className="border rounded-xl px-4 py-4 shadow-sm">
              <p className="font-semibold text-lg">
                ID: <span className="font-bold">{order.id}</span>
              </p>
              <div className="flex items-center justify-between">
                <p className="text-[14px] text-gray-500 m-0">
                  {dayjs(order.date).format("DD MMMM YYYY")}
                </p>
                <button
                className={`px-4 text-[14px] py-1 text-white rounded-full ${
                  order.status === "SUCCESS"
                    ? "bg-green-600"
                    : order.status === "PENDING"
                    ? "bg-yellow-500"
                    : order.status === "PROCESSING"
                    ? "bg-blue-600"
                    : "bg-red-600"
                }`}
              >
                {order.status === "SUCCESS"
                  ? "Yetkazildi"
                  : order.status === "PENDING"
                  ? "Kutilmoqda"
                  : order.status === "PROCESSING"
                  ? "Tayyorlanmoqda"
                  : "Bekor qilindi"}
              </button>
              </div>
              <hr className="my-4" />
              
              {/* Mahsulotlarni ko‘rish tugmasi */}
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleOrder(order.id)}
              >
                <p className="text-[14px] m-0">Mahsulotlarni ko'rish</p>
                <img src={icon} alt="ochish" className={`transition-transform ${openOrderId === order.id ? "rotate-180" : ""}`} />
              </div>

              {/* Mahsulotlar ro‘yxati */}
              {openOrderId === order.id && (
                <ul className="mt-3 p-0 text-[14px] text-black rounded-lg">
                  {order.lead_products?.map((product) => (
                    <li key={product.id}>
                      <p className="flex justify-between">
                      <span>{product.product.name.length > 15 ? product.product.name.slice(0, 15) + "..." : product.product.name} ({product.count} x {product.product.price})</span><span className="font-semibold"> {(product.count * product.product.price).toLocaleString()} so'm</span> 
                      </p>
                    </li>
                  ))}
                  <div className="flex justify-between">
                    <p>Umumiy narx:</p>
                    <p className="font-semibold">so'm</p>
                  </div>
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer links={filteredLinks} />
    </div>
  );
}

export default Order;
