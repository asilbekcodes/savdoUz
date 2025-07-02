import React from "react";
import home from "../assets/Vector (3).svg";
import search from "../assets/Vector (1).svg";
import profil from "../assets/Vector.svg";
import order from "../assets/Ellipse 286.svg";
import imoji from "../assets/emoji.svg";
import mijoz from "../../deliver/assets/Vector (8).svg";
import Footer from "../components/Footer";
import useUserStore from "@/store/useUserStore";
import TopBar from "../components/TopBar";
import { useQuery } from "@tanstack/react-query";
import { httpGetAllClients } from "@/services/api/requests/clients.requests";
import Card from "../../deliver/components/Card";
import img from "../../deliver/assets/Frame 427321904.png";
import icon from "../../deliver/assets/Vector (9).svg";
import plus from "../assets/Vector (11).svg";

const userLinks = [
  { to: "/user/user", label: "Asosiy", icon: home },
  { to: "/user/katalog", label: "Katalog", icon: search },
  //   { to: "/user/aksiyalar", label: "Aksiyalar", icon: imoji, userRole: "CLIENT" },
  { to: "/user/mijozlar", label: "Mijozlar", icon: mijoz, userRole: "MANAGER" },
  { to: "/user/orders", label: "Buyurtmalar", icon: order },
  { to: "/user/profil", label: "Profil", icon: profil },
];

function Clients() {
  const role = useUserStore();
  const userRole = role.me.role;
  
  const filteredLinks = userLinks.filter(
    (link) => !link.userRole || link.userRole === userRole
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["clients"],
    queryFn: () => httpGetAllClients(),
    select: (response) => response.data,
  });

  return (
    <div className="p-3">
      <TopBar text="Mijozlar" />
      <header className="my-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={icon} alt="" />
          <p className="m-0">{role?.me?.location?.[0]?.name}</p>
        </div>
        <button className="bg-blue-600 py-2 px-3 rounded flex items-center gap-2 text-white">
            <img src={plus} alt="" />
            Qo'shish
        </button>
      </header>
      <main className="mt-4 flex flex-col gap-4">
        {data?.length > 0 ? (
          data.map((item) => (
            <Card
              key={item.id}
              img={item.image || img}
              title={item.name}
              location={
                item.location?.length > 0
                  ? item.location
                      .map((loc) => "Qashqadaryo - " + loc.name)
                      .join(", ")
                  : "Noma'lum joylashuv"
              }
            />
          ))
        ) : (
          <p className="text-center mt-5">Sizga mijozlar mavjud emas</p>
        )}
      </main>
      <Footer links={filteredLinks} />
    </div>
  );
}

export default Clients;
