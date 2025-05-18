import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../src/assets/assets";
import { userAppContext } from "../context/AppContext";

import toast from "react-hot-toast";


const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const {
    user,
    setUser,
    navigate,
    setShowUserLogin,
    showUserLogin,
    searchQuery,
    setSearchQuery,
    getCartCount,
    axios
  } = userAppContext();
  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout")
      if (data.success) {
        setUser(null);
        navigate("/");
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);
  return (
    <div>
      <nav
        className={`flex items-center z-50 justify-between  px-4 md:px-14  py-4 border-b border-gray-300 bg-white relative transition-all`}
      >
        <NavLink to="/" onClick={() => setOpen(false)}>
         <h2 className="text-3xl font-extrabold text-blue-400">DigiCart</h2>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">All Products</NavLink>

          <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              type="text"
              placeholder="Search products"
            />
            <img
              src={assets.search_icon}
              alt="search"
              className="w-4 h-4 "
            ></img>
          </div>

          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <img
              src={assets.nav_cart_icon}
              alt="cart"
              className="w-6 opacity-80"
            />
            <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
              {getCartCount()}
            </button>
          </div>

          {!user ? (
            <button
              onClick={() => setShowUserLogin(true)}
              className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-primary transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <div className="relative group">
              <img src={assets.profile_icon} alt="" className="w-10" />
              <ul
                className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30
              rounded-md text-sm z-40 px-2"
              >
                <li
                  onClick={() => navigate("/my-orders")}
                  className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
                >
                  My Orders
                </li>
                <li
                  onClick={logout}
                  className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="flex items-end gap-6 sm:hidden">
        <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <img
              src={assets.nav_cart_icon}
              alt="cart"
              className="w-6 opacity-80"
            />
            <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
              {getCartCount()}
            </button>
          </div>
      </div>
        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
          className="sm:hidden"
        >
          {/* Menu Icon SVG */}
          <img src={assets.menu_icon} alt="menu" className="cursor-pointer" />
        </button>

        {/* Mobile Menu */}
        {open && (
          <div
            className={`${
              open ? "flex" : "hidden"
            } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
          >
            <NavLink to="/" onClick={() => setOpen(false)} className="block">
              Home
            </NavLink>
            <NavLink
              to="/products"
              onClick={() => setOpen(false)}
              className="block"
            >
              All Product
            </NavLink>
            {user && (
              <NavLink
                to="/my-orders"
                onClick={() => setOpen(false)}
                className="block"
              >
                My Orders
              </NavLink>
            )}
          
            {!user ? (
              <button
                onClick={() => {
                  setOpen(false), setShowUserLogin(!showUserLogin);
                }}
                className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-primary transition text-white rounded-full text-sm"
              >
                Login
              </button>
            ) : (
              <button
                onClick={logout}
                className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-primary transition text-white rounded-full text-sm"
              >
                LogOut
              </button>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
