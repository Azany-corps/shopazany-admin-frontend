import React from "react";
import Layout from "../../components/Core/Layout";
import Badges from "../../components/Overview/Badges";
import Chart from "../../components/Overview/Chart";
import PieChartExample from "../../components/Overview/Pie";
import List from "../../components/Overview/Table";
import Layout2 from "../../components/Core/Layout2";
import DashboardCard from "../../components/Overview/DashboardCard";

type each = {
  image: string;
  name: string;
  price: string;
};

const Home = () => {
  const cards = [
    { name: "revenue", price: "NGN 7,825", image: "/images/revenue.svg" },
    { name: "orders", price: "NGN 8,325", image: "/images/order.svg" },
    { name: "farmers", price: "NGN 5,004", image: "/images/farmers.svg" },

    { name: "visitors", price: "NGN 7,825", image: "/images/visitors.svg" },
    {
      name: "manufacturers",
      price: "NGN 90,004",
      image: "/images/manufacturers.svg",
    },
    { name: "stores", price: "NGN 6,004", image: "/images/stores.svg" },
    { name: "merchants", price: "NGN 8,004", image: "/images/merchants.svg" },

    {
      name: "inactives stores",
      price: "NGN 1,568",
      image: "/images/inactive.svg",
    },
  ];

  const table = [
    {
      image: "/images/deco.svg",
      shop: "Deco accessory",
      revenue: "NGN 215.19",
      sold: "409",
      order: "1822.27",
    },

    {
      image: "/images/pottery.svg",
      shop: "Potter Food",
      revenue: "NGN 174.18",
      sold: "409",
      order: "8545.25",
    },
    {
      image: "/images/logi.svg",
      shop: "Logi Electronics",
      revenue: "NGN 818.19",
      sold: "409",
      order: "7287.01",
    },
    {
      image: "/images/cactus.svg",
      shop: "Flowering Cactus",
      revenue: "NGN 974.16",
      sold: "639",
      order: "9325.47",
    },
    {
      image: "/images/cactus.svg",
      shop: "Flowering Cactus",
      revenue: "NGN 974.16",
      sold: "639",
      order: "9325.47",
    },
  ];
  return (
    <div>
      {/* <Layout>
        <div className="flex flex-col gap-4 bg-[#F5F5F5]">
          <div className="">
            <p className="text-[36px] font-bold">Overview</p>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Badges />
          </div>
        </div>
        <div>
          <div className="flex gap-4 flex-row py-4">
            <div className="bg-[white] z--1 p-4 w-full rounded-md">
              <Chart />
            </div>
            <div className="bg-[white] p-4 w-3/5 rounded-md">
              <PieChartExample />
            </div>
          </div>
          <div className="bg-[white] gap-4 flex-col flex p-4">
            <p className="font-semibold text-[18px]">Top Products</p>
            <List />
          </div>
        </div>
      </Layout> */}
      <Layout2>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="flex flex-col max-h-[217px] rounded-lg bg-gray-50 p-[26.15px] bg-white">
              <div className="flex">
                <div>
                  <p className="text-[#23272E] font-semibold text-xl">
                    Total Sales
                  </p>
                  <p className="text-[#8B909A] text-base font-medium mt-4px">
                    Last 7 days
                  </p>
                  <div className="flex">
                    <p className="mt-[32.69px] text-[34.873px] font-bold">
                      350K
                    </p>
                    <p className="mt-[48px] ml-[35.59px] text-xl font-bold text-[#D65D5B]">
                      $235K
                    </p>
                  </div>
                  <p className="mt-5 text-[15.257px] flex">
                    <span className="text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        className="text-[#1EB564] text-center flex items-center"
                      >
                        <path
                          d="M8.87307 3.41301C8.96994 3.41301 9.06076 3.42802 9.14552 3.45805C9.23028 3.48808 9.30898 3.53967 9.38164 3.6128L14.1767 8.40785C14.322 8.55315 14.3946 8.72558 14.3946 8.92513C14.3946 9.12468 14.322 9.29735 14.1767 9.44314C14.0314 9.58845 13.8619 9.6611 13.6681 9.6611C13.4744 9.6611 13.3049 9.58845 13.1596 9.44314L9.59959 5.88318L9.59959 14.0202C9.59959 14.2261 9.52985 14.3956 9.39035 14.5288C9.25086 14.662 9.07843 14.7286 8.87307 14.7286C8.66722 14.7286 8.49455 14.6588 8.35506 14.5194C8.21557 14.3799 8.14606 14.2074 8.14655 14.0021L8.14655 5.88318L4.58659 9.44314C4.44128 9.58845 4.27176 9.6611 4.07802 9.6611C3.88428 9.6611 3.71476 9.58845 3.56946 9.44314C3.42415 9.29784 3.3515 9.12517 3.3515 8.92513C3.3515 8.7251 3.42415 8.55267 3.56946 8.40785L8.36451 3.6128C8.43716 3.54015 8.51586 3.48857 8.60062 3.45805C8.68539 3.42754 8.7762 3.41252 8.87307 3.41301Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <span className="text-[#1EB564]">8.56K</span>{" "}
                    <span className="text-[#8B909A] ml-2">vs last 7 days</span>
                  </p>
                </div>

                <div></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 my-[10.13px]">
              {cards.map((each, index) => (
                <DashboardCard
                  key={index}
                  name={each.name}
                  image={each.image}
                  price={each.price}
                />
              ))}
            </div>

            <div className="bg-white px-8 py-3 rounded-lg font-inter mb-12">
              <p className="text-[#1C2A53] font-inter font-medium text-xl">
                Bestsellers
              </p>
              <div className="relative overflow-x-auto sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-sm font-semibold text-[#8E95A9] capitalize bg-[#F8F8F8] font-inter px-[13px] py-[16px]">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Shop
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Revenue
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Sold
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Orders
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.map((tab, index) => (
                      <tr
                        className="bg-white border-b border-[#F8F8F8]"
                        key={index}
                      >
                        <th
                          scope="row"
                          className="px-[16px] py-[6px] font-normal text-[13px] text-[#555F7E] whitespace-nowrap"
                        >
                          <p className="flex items-center">
                            <span className="mr-3">
                              <img src={tab.image} />
                            </span>
                            <span>{tab.shop}</span>
                          </p>
                        </th>
                        <td className="px-6 py-4">{tab.revenue}</td>
                        <td className="px-6 py-4">{tab.sold}</td>
                        <td className="px-6 py-4">{tab.order}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-span-1"></div>
        </div>
      </Layout2>
    </div>
  );
};

export default Home;
