// Sidebar.jsx
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64  bg-gray-100  shadow-md rounded-xl p-4">
      <nav className="flex flex-col space-y-4">
        <NavLink to="/profile" className="text-blue-600 font-semibold">My Profile</NavLink>
        <NavLink to="/orders" className="text-gray-600">My Orders</NavLink>
        <NavLink to="/wishlist" className="text-gray-600">Wishlist</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
