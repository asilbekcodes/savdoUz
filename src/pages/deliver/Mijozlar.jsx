import React from "react";
import TopBar from "../user/components/TopBar";
import Card from "./components/Card";
import img from "./assets/Frame 427321904.png";
import home from "../user/assets/Vector (3).svg";
import profil from "../user/assets/Vector.svg";
import mijoz from "./assets/Vector (8).svg";
import Footer from "../user/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { httpGetAllClients } from "@/services/api/requests/clients.requests";
import useUserStore from "@/store/useUserStore";

const deliverLinks = [
  { to: "/deliver/deliver", label: "Asosiy", icon: home },
  { to: "/deliver/mijozlar", label: "Mijozlar", icon: mijoz },
  { to: "/deliver/profil", label: "Profil", icon: profil },
];

function Mijozlar() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["clients"],
    queryFn: () => httpGetAllClients(),
    select: (response) => response.data,
  });

  const me = useUserStore();

  // Foydalanuvchiga tegishli bo'lgan lokatsiyalar
  const userLocations = me?.me.location?.map((loc) => loc.name) || [];

  // Mijozlarni filtrlash (faqat foydalanuvchiga tegishli joylashuvdagi mijozlar)
  const filteredClients = data?.filter((client) =>
    client.location?.some((loc) => userLocations.includes(loc.name))
  );

  return (
    <div className="p-3">
      <TopBar text={"Mijozlar"} />
      <main className="mt-4 flex flex-col gap-4">
        {filteredClients?.length > 0 ? (
          filteredClients.map((item) => (
            <Card
              key={item.id}
              img={item.image || img}
              title={item.name}
              location={
                item.location?.length > 0
                  ? item.location.map((loc) => "Qashqadaryo - " + loc.name).join(", ")
                  : "Noma'lum joylashuv"
              }
            />
          ))
        ) : (
          <p>Sizga mijozlar mavjud emas</p>
        )}
      </main>
      <Footer links={deliverLinks} />
    </div>
  );
}

export default Mijozlar;
