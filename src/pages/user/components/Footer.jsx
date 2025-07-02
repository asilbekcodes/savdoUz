import { Link, useLocation } from "react-router-dom";

const Footer = ({ links }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Ekran o'lchami uchun media query (desktopda yashirish uchun)
  if (window.innerWidth >= 1024) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-md z-50">
      <div className="flex justify-around py-2 text-sm text-gray-700">
        {links.map(({ to, label, icon }, index) => (
          <Link
            key={index}
            to={to}
            className={`flex flex-col items-center ${
              currentPath === to ? "text-black font-bold" : "text-black"
            }`}
          >
            <img src={icon} alt={label} className="mb-2 mt-1" />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
