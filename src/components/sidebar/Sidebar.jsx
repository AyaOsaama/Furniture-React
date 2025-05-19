import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-64">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-2 px-3 py-1 bg-blue-600 text-white rounded"
      >
        {isOpen ? "إخفاء القائمة" : "عرض القائمة"}
      </button>

      {isOpen && (
        <aside className="bg-gray-100 shadow-md rounded-xl p-4 overflow-hidden">
          <nav className="flex flex-col space-y-4 text-sm md:text-base">
            <NavLink
              to="/profile"
              className="text-blue-600 font-semibold whitespace-nowrap"
            >
              My Profile
            </NavLink>
            <NavLink to="/orders" className="text-gray-600 whitespace-nowrap">
              My Orders
            </NavLink>
            <NavLink to="/wishlist" className="text-gray-600 whitespace-nowrap">
              Wishlist
            </NavLink>
          </nav>
        </aside>
      )}
    </div>
  );
};

export default Sidebar;
