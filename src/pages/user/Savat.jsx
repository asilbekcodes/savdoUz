import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import { Empty } from "antd";
import { useMutation } from "@tanstack/react-query";
import { httpPostOrder } from "@/services/api/requests/order.request";
import home from "./assets/Vector (3).svg";
import search from "./assets/Vector (1).svg";
import profil from "./assets/Vector.svg";
import order from "./assets/Ellipse 286.svg";
import imoji from "./assets/emoji.svg";
import { handleSuccessNotification } from "@/utils/helpers";
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

const Savat = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    updateCart(newCart);
  };

  const increaseQuantity = (id) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(newCart);
  };

  const decreaseQuantity = (id) => {
    const newCart = cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCart(newCart);
  };

  const handleQuantityChange = (id, value) => {
    // Ensure the value is a number between 1 and 999
    const numericValue = Math.max(1, Math.min(999, Number(value) || 1));
    
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: numericValue } : item
    );
    updateCart(newCart);
  };

  const totalDiscountedPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const mutation = useMutation({
    mutationFn: httpPostOrder,
    onSuccess: () => {
      handleSuccessNotification("Muvaffaqiyatli bajarildi !");
      localStorage.removeItem("cart");
      setCart([]);
    },
    onError: (error) => {
      console.error("Xatolik yuz berdi:", error);
    },
  });

  const handleSubmitOrder = () => {
    const orderData = {
      date: new Date().toISOString(),
      discount_summa: 0,
      cash: cart
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toString(),
      card: "0",
      other: "0",
      lead_products: cart.map((item) => ({
        count: item.quantity,
        price: item.price.toString(),
        product: item.id.toString(),
      })),
    };

    mutation.mutate(orderData);
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
        <TopBar text="Savat" />
      </div>
      <div className="lg:px-40 mt-4 mb-28">
        {cart.length === 0 ? (
          <Empty />
        ) : (
          <div className="flex gap-4">
            <div className="w-full md:min-w-[70%]">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="sm:flex justify-between gap-4 p-4 border rounded-lg mb-4"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-[70px] rounded"
                    />
                    <div>
                      <h2 className="font-semibold md:text-lg text-[14px] mt-2">
                        {item.name}
                      </h2>
                      <p className="m-0">Narxi: {item.price}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-5">
                    <div className="flex items-center gap-2 mt-4">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="border px-2 py-1 rounded hover:bg-gray-100"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="999"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        className="w-12 text-center border rounded py-1"
                      />
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="border px-2 py-1 rounded hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <div className="grid place-items-end">
                      <p className="text-lg font-semibold">
                        {(item.price * item.quantity).toLocaleString()} so'm
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-500 hover:text-red-600 flex items-center gap-2"
                      >
                        O'chirish <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border p-4 w-96 max-h-max rounded-lg md:block hidden">
              <h2 className="font-semibold text-lg">Buyurtmangiz</h2>
              <div className="flex justify-between text-gray-700 my-2 text-[15px]">
                <span>Mahsulotlar soni:</span>
                <span className="font-semibold">{cart.length}</span>
              </div>
              <hr className="my-8" />
              <div className="flex justify-between">
                <span className="text-[15px]">Jami:</span>
                <span className="font-semibold">
                  {totalDiscountedPrice.toLocaleString()} so'm
                </span>
              </div>
              <button
                onClick={handleSubmitOrder}
                className="w-full bg-blue-500 text-white py-2 mt-[41px] rounded-lg text-center font-semibold hover:bg-blue-600 transition-colors"
              >
                Rasmiylashtirish
              </button>
            </div>
          </div>
        )}
      </div>
      <div
        className={`fixed bottom-16 rounded-t-xl left-0 right-0 bg-white border-t border-gray-300 shadow-md z-50 py-2 block md:hidden ${
          cart.length === 0 ? "hidden" : "block"
        }`}
      >
        <div className="flex justify-between py-2 px-3 text-sm ">
          <div>
            <p className="m-0 text-gray-700 text-[12px]">
              Buyurtmangiz ({cart.length})
            </p>
            <span className="text-[20px] text-black">
              {totalDiscountedPrice.toLocaleString()} so'm
            </span>
          </div>
          <button
            onClick={handleSubmitOrder}
            className="bg-blue-500 text-white p-2 rounded-lg text-center hover:bg-blue-600 transition-colors"
          >
            Rasmiylashtirish
          </button>
        </div>
      </div>
      <Footer links={filteredLinks} />
    </div>
  );
};

export default Savat;