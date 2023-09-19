import React, { useState } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Navbar from "./Navbar";

type each = {
  image: React.ReactNode;
  title: string;
};

const Layout = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  const [list, setList] = useState([]);
  const [active, setActive] = useState<each>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const data = [
    {
      image: <Icon icon="tabler:template" width={24} height={24} />,
      title: "Overview",
      path: "/",
    },
    {
      image: <Icon icon="material-symbols:sell-sharp" width={24} height={24} />,
      title: "Sellers",
      path: "/sellers",
    },
    {
      image: <Icon icon="solar:delivery-linear" width={24} height={24} />,
      title: "Orders",
      path: "/orders",
    },
    {
      image: <Icon icon="streamline:shopping-bag-hand-bag-1-shopping-bag-purse-goods-item-products" width={24} height={24} />,
      title: "Products",
      path: "/products",
    },
    {
      image: <Icon icon="iconamoon:profile-light" width={24} height={24} />,
      title: "Customers",
      path: "/customers",
    },
    {
      image: <Icon icon="typcn:messages" width={24} height={24}/>,
      title: "Messages",
      path: "/messages",
    },
  ];

  return (
    <div className="">
      <Grid container spacing={0}>
        <Grid item xs={12} md={2} display={{ xs: "none", sm: "block" }}  style={{ position: "sticky", top: 0, height: "100vh" }}>
          <div className="bg-white py-8 flex flex-col  justify-between h-screen">
            <div className="flex flex-col gap-4">
              <div className="px-8">
                <img src="/images/azanylogocolour.png" alt="" className="w-32" />
              </div>
              <div className="gap-4 flex flex-col">
                {data.map((each, index) => (
                  <div
                    className={`list-itemed px-8 text-black ${
                      active === each ? "bg-[#D9E9FF]" : ""
                    } hover:bg-[#D9E9FF] hover:text-[#1B7CFC] cursor-pointer focus:bg-[#D9E9FF] p-2`}
                    key={index}
                    onClick={() => {
                      setActive(each);
                      navigate(`${each.path}`);
                    }}
                  >
                    <div className="group flex gap-8 items-center">
                      <div className="flex flex-row gap-4">
                        <div>{each.image}</div>
                        <h2 className="text-[18px]">{each.title}</h2>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-4 hover:bg-[#D9E9FF] cursor-pointer hover:text-[#1B7CFC] p-2 px-8">
                <Icon icon="ant-design:setting-outlined" width={24} height={24} />
                <h2 className="text-[18px]">Settings</h2>
              </div>
              <div className="flex flex-row items-center gap-4 hover:bg-[#D9E9FF] cursor-pointer hover:text-[#1B7CFC] px-8 p-2">
                <Icon icon="mingcute:exit-line" width={24} height={24} />
                <h2 className="text-[18px]">Logout</h2>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={10}>
          <div className="p-4 px-8 bg-[#F5F5F5] h-full">
            <Navbar />
            {children}
          </div>
        </Grid>
      </Grid>
      {isModalOpen /* &&   <CloseAccountModal onClose={closeModal}/>*/}
    </div>
  );
};

export default Layout;
