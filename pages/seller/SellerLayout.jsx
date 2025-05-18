import { Link, NavLink, Outlet } from "react-router-dom";
import { userAppContext } from "../../context/AppContext";
import { assets } from "../../src/assets/assets";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const { axios, navigate } = userAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
  try {
    const { data } = await axios.get("/api/seller/logout")
    if (data.success) {
      toast.success(data.message)
      navigate("/")
      
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    console.log(error.message)
    toast.error(error.message)
    
  }

   
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white ">
        <Link to="/">
            <h2 className="text-3xl font-extrabold text-blue-400">DigiCart</h2>
        </Link>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button
            onClick={logout}
            className="border rounded-full text-sm px-4 py-1"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col ">
          {sidebarLinks.map((item, index) => (
            <NavLink
              to={item.path}
              end={item.path === "/seller"}
              key={item.name}
              className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                          ${
                            isActive
                              ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                              : "hover:bg-gray-100/90 border-white text-gray-700"
                          }`}
            >
              <img src={item.icon} alt="" className="w-7 h-7" />
              <p className="md:block hidden text-center">{item.name}</p>
            </NavLink>
          ))}
        </div>
        <Outlet></Outlet>
      </div>

    </>
  );
};
export default SellerLayout;
