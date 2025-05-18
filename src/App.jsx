import React from "react";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import { userAppContext } from "../context/AppContext";
import Login from "../components/Login";
import AllProducts from "../pages/AllProducts";
import ProductCategory from "../pages/ProductCategory";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import AddAddress from "../pages/AddAddress";
import MyOrders from "../pages/MyOrders";
import SellerLogin from "../components/seller/SellerLogin";
import SellerLayout from "../pages/seller/SellerLayout";
import AddProduct from "../pages/seller/AddProduct";
import ProductList from "../pages/seller/ProductList";
import Orders from "../pages/seller/Orders";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin, isSeller } = userAppContext();
  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
      {isSellerPath ? null : <Navbar></Navbar>}
      {showUserLogin ? <Login></Login> : null}

      <div
        className={`${isSellerPath ? " " : "px-2 md:mx-16 lg:px-4"}`}
      >
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/products" element={<AllProducts></AllProducts>}></Route>
          <Route
            path="/products/:category"
            element={<ProductCategory></ProductCategory>}
          ></Route>
          <Route
            path="/products/:category/:id"
            element={<ProductDetails></ProductDetails>}
          ></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
          <Route
            path="/add-address"
            element={<AddAddress></AddAddress>}
          ></Route>
          <Route path="/my-orders" element={<MyOrders></MyOrders>}></Route>

          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin></SellerLogin>}
          >
            <Route
              index
              element={isSeller ? <AddProduct></AddProduct> : null}
            />
            <Route path="product-list" element={<ProductList></ProductList>} />
            <Route path="orders" element={<Orders></Orders>} />
          </Route>
        </Routes>
      </div>
      {isSellerPath ? null : <Footer></Footer>}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
