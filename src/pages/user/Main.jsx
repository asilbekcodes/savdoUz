import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Card from "./components/Card";
import home from "./assets/Vector (3).svg";
import search from "./assets/Vector (1).svg";
import profil from "./assets/Vector.svg";
import order from "./assets/Ellipse 286.svg";
import imoji from "./assets/emoji.svg";
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

function Main() {
  const role = useUserStore();
  const userRole = role.me.role  

  const filteredLinks = userLinks.filter(link => !link.userRole || link.userRole === userRole);
  return (
    <div className="p-3">
      <Navbar />
      <div className="lg:px-40 mt-5 mb-14">
        <Card />
      </div>

      <Footer links={filteredLinks}/>
    </div>
  );
}

export default Main;
