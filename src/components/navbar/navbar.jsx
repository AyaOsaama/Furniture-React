import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import searchLight from "../../assets/icons/search.png";
import bagLight from "../../assets/icons/bag.png";
import searchDark from "../../assets/icons/search-black.png";
import bagDark from "../../assets/icons/bag-black.png";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About Us" },
  { href: "/contactus", label: "Contact Us" },
];

function Navbar() {
  const cartItemsCount = useSelector((state) => state.cart.items.length);

  const navigate = useNavigate();

  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navbarEffect = scrolled
    ? "backdrop-blur-md bg-white/70 shadow-md text-black"
    : isHome
    ? "text-white"
    : "text-black";

  const searchIcon = scrolled || !isHome ? searchDark : searchLight;
  const bagIcon = scrolled || !isHome ? bagDark : bagLight;
  const handleUserIconClick = () => {
    const token = localStorage.getItem("token"); 
    const user = localStorage.getItem("user"); 
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300 ${navbarEffect}`}
    >
      <div className="navbar justify-between">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 ${
                scrolled || !isHome
                  ? "bg-white text-black"
                  : "bg-black/90 text-white"
              }`}
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <a className="text-2xl font-semibold">FurniITI</a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal font-medium text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`${
                    pathname === link.href ? "font-bold underline" : ""
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <img
            src={searchIcon}
            alt="Search"
            className="w-5 h-5 cursor-pointer"/>
    <FaRegUser
      className="w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-600"
      onClick={handleUserIconClick}
    />
<div className="relative">
  <img
    src={bagIcon}
    alt="Bag"
    className="w-5 h-5 cursor-pointer"
    onClick={() => navigate("/cart")}
  />
  {cartItemsCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
      {cartItemsCount}
    </span>
  )}
</div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
