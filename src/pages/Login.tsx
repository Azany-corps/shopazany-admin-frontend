import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {};

export default function Login({}: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event: any) => {
    event?.preventDefault();
    let config = {
      method: "post",
      url: "https://test.shopazany.com/api/auth/admin_login",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: {
        email: email,
        password: password,
      },
    };

    try {
      const response = await axios(config);
      console.log(response.data);
      localStorage.clear();
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "profile",
        JSON.stringify(response.data.data.values)
      );
      navigate("/");
    } catch (error: any) {
      toast.error(error?.response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(error);
    }
  };

  return (
    <section className="w-screen h-screen flex justify-center items-center bg-login-bg bg-cover font-public-sans">
      <main className="w-full flex flex-col justify-center items-center">
        <div className="w-full max-w-[540px] p-4 bg-white rounded-lg sm:p-6 px-[73px]">
          <p className="mt-[38px] mb-[21px] text-center w-full text-[40px] font-bold font-public-sans">
            Login
          </p>
          <form
            action=""
            className="flex flex-col gap-4 w-full"
            onSubmit={(e) => handleLogin(e)}
          >
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-3 text-base font-normal text-[#5A5A5D] "
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-transparent border border-[#D0D0D0] text-gray-900 text-sm rounded-lg focus:ring-[#D65D5B] focus:border-[#D65D5B] block w-full py-[15px] px-[15px] placeholder:text-[#D0D0D0] placeholder:text-sm placeholder:font-normal"
                placeholder="johndoe@azany.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-3 text-base font-normal text-[#5A5A5D] "
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent border border-[#D0D0D0] text-gray-900 text-sm rounded-lg focus:ring-[#D65D5B] focus:border-[#D65D5B] block w-full py-[15px] px-[15px] placeholder:text-[#D0D0D0] placeholder:text-sm placeholder:font-normal pr-10" // Added `pr-10` for padding right
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-[15px]">
                  <Icon
                    className="cursor-pointer"
                    icon={
                      showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"
                    }
                    width="20"
                    height="20"
                    color="#D0D0D0"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
              </div>
            </div>
            <button className="text-white bg-[#D65D5B] hover:bg-[#bf4f4d] focus:ring-4 focus:outline-none focus:ring-[#f37472] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">
              Login
            </button>
            <div className="flex items-end justify-end mt-[105px] mb-[25px] ml-auto ">
              <p className="text-sm cursor-pointer">
                <span>Forgot password?</span>
                <span className="text-[#D65D5B] ml-4">Contact Admin</span>
              </p>
            </div>
          </form>
        </div>
      </main>
    </section>
  );
}
