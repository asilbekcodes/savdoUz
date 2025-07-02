import home from "./assets/Vector (3).svg";
import search from "./assets/Vector (1).svg";
import profil from "./assets/Vector.svg";
import order from "./assets/Ellipse 286.svg";
import imoji from "./assets/emoji.svg"
import Footer from './components/Footer';
import TopBar from './components/TopBar';
import { Empty } from "antd";

const userLinks = [
  { to: "/user/user", label: "Asosiy", icon: home },
  { to: "/user/katalog", label: "Katalog", icon: search },
  { to: "/user/aksiyalar", label: "Aksiyalar", icon: imoji },
  { to: "/user/orders", label: "Buyurtmalar", icon: order },
  { to: "/user/profil", label: "Profil", icon: profil },
];
function Aksiyalar() {
  return (
    <div className='p-3'>
        <TopBar text={"Aksiyalar"} />
        <div className="my-4">
            <Empty />
        </div>
        <Footer links={userLinks} />
    </div>
  )
}

export default Aksiyalar