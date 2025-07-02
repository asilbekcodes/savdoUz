import { useParams } from "react-router-dom";
import plus from "./assets/Vector (4).svg";
import check from "./assets/Vector (10).svg";
import { useQuery } from "@tanstack/react-query";
import { httpGetAllProducts } from "@/services/api/requests/products.requests";
import { objectToQueryString } from "@/utils/helpers";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";
import home from "./assets/Vector (3).svg";
import search from "./assets/Vector (1).svg";
import profil from "./assets/Vector.svg";
import order from "./assets/Ellipse 286.svg";
import imoji from "./assets/emoji.svg";
import { useEffect, useState } from "react";
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

function KatalogId() {
  const { id } = useParams();
  const [addedItems, setAddedItems] = useState({});

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product-one", id],
    queryFn: () => httpGetAllProducts(objectToQueryString({ category: id })),
    select: (response) => response.data,
  });

  useEffect(() => {
    // Sahifa yangilanganda saqlangan savatni tekshirish
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const initialState = cart.reduce((acc, item) => {
      acc[item.id] = true;
      return acc;
    }, {});
    setAddedItems(initialState);
  }, []);

  const addToCart = (item) => {
    if (addedItems[item.id]) return; // Agar allaqachon qo‘shilgan bo‘lsa, hech narsa qilmaymiz

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...item, quantity: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
  };

  const role = useUserStore();
  const userRole = role.me.role  

  const filteredLinks = userLinks.filter(link => !link.userRole || link.userRole === userRole);

  return (
    <div className="p-3">
      <TopBar
        text={data && data.length > 0 ? data[0].category.name : "Katalog"}
      />
      <div className="lg:px-40 my-5">
        {isLoading ? (
          <p className="text-center text-gray-500">Yuklanmoqda...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Xatolik yuz berdi!</p>
        ) : data?.length === 0 ? (
          <p className="text-center text-gray-500">Mahsulot topilmadi</p>
        ) : (
          <div className="grid grid-cols-2 gap-y-10 md:gap-x-3 gap-x-1.5 md:grid-cols-3 xl:grid-cols-4">
            {data.map((item) => (
              <div key={item.id} className="rounded-xl bg-white">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-[120px] md:h-48 bg-gray-200 rounded-t-xl"
                />
                <div className="p-2">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <div className="flex items-center justify-between">
                    <p className="m-0">
                      <span className="font-medium">Narxi:</span> {item.price}{" "}
                      so‘m
                    </p>
                    <button
                      className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                        addedItems[item.id]
                          ? "bg-white border-2 border-blue-600"
                          : "bg-blue-500"
                      } text-white`}
                      onClick={() => addToCart(item)}
                      disabled={addedItems[item.id]} // Tugmani faqat bir marta bosish uchun
                    >
                      <img src={addedItems[item.id] ? check : plus} alt="" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer links={filteredLinks} />
    </div>
  );
}

export default KatalogId;
