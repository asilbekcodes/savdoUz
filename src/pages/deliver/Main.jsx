import React from "react";
import Footer from "../user/components/Footer";
import home from "../user/assets/Vector (3).svg";
import profil from "../user/assets/Vector.svg";
import mijoz from "./assets/Vector (8).svg";
import logo from "@/assets/images/logo-icon.png";
import { Link } from "react-router-dom";
import Card from "./components/Card";
import img from "./assets/Frame 427321904.png";
import { useQuery } from "@tanstack/react-query";
import { httpGetOrder } from "@/services/api/requests/order.request";
import useUserStore from "@/store/useUserStore";

const deliverLinks = [
  { to: "/deliver/deliver", label: "Asosiy", icon: home },
  { to: "/deliver/mijozlar", label: "Mijozlar", icon: mijoz },
  { to: "/deliver/profil", label: "Profil", icon: profil },
];

function Main() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["leads"],
    queryFn: httpGetOrder,
    select: (response) => response.data,
  });
  const me = useUserStore();

  // Foydalanuvchiga tegishli bo'lgan lokatsiyalar
  const userLocations = me?.me.location?.map((loc) => loc.name) || [];

  const filteredClients = data?.filter((client) =>
    client?.client?.location?.some((loc) => userLocations.includes(loc.name))
  );

  if (isLoading) {
    return <div>Yuklanmoqda...</div>;
  }

  if (isError) {
    return <div>Xatolik yuz berdi: {error.message}</div>;
  }

  return (
    <div className="p-3">
      <nav>
        <Link to={"/deliver"}>
          <img className="w-16" src={logo || "/placeholder.svg"} alt="logo" />
        </Link>
      </nav>
      <main className="mt-4">
        <p>Buyurtmalar</p>
        <div className="flex flex-col gap-4">
          {filteredClients?.length > 0 ?(
            filteredClients.map((order) => (
              <Link key={order.id} to={`/deliver/mijozlar/${order.id}`}>
                <Card img={`https://admin.yerqurgon.uz${order?.client?.image}` || img} title={`${order?.client?.name}`} location={order?.client?.location[0]?.name} soni={<><span className='bg-blue-600 text-white px-2 py-1 text-[10px] rounded-full'>{order?.status}</span></>}/>
              </Link>
            ))
          ) : (
            <p>Sizga buyurtmalar mavjud emas</p>
          )}
        </div>
      </main>
      <Footer links={deliverLinks} />
    </div>
  );
}

export default Main;
