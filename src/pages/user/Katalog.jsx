import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import icon from "./assets/Vector 2.svg";
import useProductCategories from "@/hooks/api/useProductCategories";
import { useNavigate } from "react-router-dom";
import home from "./assets/Vector (3).svg";
import search from "./assets/Vector (1).svg";
import profil from "./assets/Vector.svg";
import order from "./assets/Ellipse 286.svg";
import imoji from "./assets/emoji.svg"
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

function Katalog() {
  const category = useProductCategories();
  const navigate = useNavigate(); // Navigatsiya uchun hook

  const handleCategoryClick = (id) => {
    navigate(`/user/katalog/${id}`); 
  };

  const role = useUserStore();
  const userRole = role.me.role  

  const filteredLinks = userLinks.filter(link => !link.userRole || link.userRole === userRole);
  
  return (
    <div className="p-3 px-40">
      <TopBar text="Katalog" />
      <div className="mt-3 mb-5">
        {category.productCategoriesData.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between py-3"
            onClick={() => {
              handleCategoryClick(category.id);
            }}
          >
            <div className="flex items-center gap-3">
              <img
                src={search}
                alt={category.name}
                className="w-8 h-8 rounded-md object-cover"
              />
              <span className="text-black text-[18px]">{category.name}</span>
            </div>
            {/* <IoIosArrowForward className="w-5 h-5 text-gray-600" /> */}
            <img src={icon} alt="" />
          </div>
        ))}
      </div>
      <Footer links={filteredLinks}/>
    </div>
  );
}

export default Katalog;
