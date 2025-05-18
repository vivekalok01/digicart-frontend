import React, { useEffect, useState } from "react";
import { userAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = userAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/seller/login", {
        email,
        password,
      });
      if (data.success) {
        setIsSeller(true);
        navigate("/seller");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(`client side ${error.message}`);
    }
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  return (
    !isSeller && (
      <form
        onSubmit={onSubmitHandler}
        className="min-h-screen flex items-center text-sm text-gray-600"
      >
        <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
          <p className="text-2xl font-medium accent-auto">
            <span className="text-primary">Seller</span>Login
          </p>
          <div className="w-full">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              type="email"
              placeholder="Enter your email"
              className="border w-full border-gray-200 rounded p-2 mt-1 outline-primary"
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              type="password"
              placeholder="Enter your password"
              className="border w-full border-gray-200 rounded p-2 mt-1 outline-primary"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white w-full p-2 rounded-md cursor-pointer"
          >
            Login
          </button>
        </div>
      </form>
    )
  );
};

export default SellerLogin;
