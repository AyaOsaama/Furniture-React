import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { t } = useTranslation("profileuser");

  return (
    <aside className="w-64 bg-gray-100 shadow-md rounded-xl p-4">
      <nav className="flex flex-col space-y-4">
        <NavLink to="/profile" className="text-blue-600 font-semibold">
          {t("profileOverview")}
        </NavLink>
        <NavLink to="/orders" className="text-gray-600">
          {t("myOrders")}
        </NavLink>
        <NavLink to="/wishlist" className="text-gray-600">
          {t("wishlist")}
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
