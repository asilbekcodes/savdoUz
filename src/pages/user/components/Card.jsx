import { useState, useEffect } from "react";
import useProducts from "@/hooks/api/useProducts";
import plus from "../assets/Vector (4).svg";
import check from "../assets/Vector (10).svg";

const Card = () => {
  const product = useProducts();
  const [addedItems, setAddedItems] = useState({});

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

  return (
    <div className="grid grid-cols-2 gap-y-10 md:gap-x-3 gap-x-1.5 md:grid-cols-3 xl:grid-cols-4">
      {product.productsData.map((item) => (
        <div key={item.id} className="rounded-xl bg-white">
          <img src={item.image} alt="" className="w-full h-[120px] md:h-48 bg-gray-200 rounded-t-xl" />
          <div className="p-2">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <div className="flex items-center justify-between">
              <p className="m-0">
                <span className="font-medium">Narxi:</span> {item.price} so‘m
              </p>
              <button
                className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                  addedItems[item.id] ? "bg-white border-2 border-blue-600" : "bg-blue-500"
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
  );
};

export default Card;
