import React from "react";
import Layout from "../../components/Core/Layout";
import Badges from "../../components/Overview/Badges";
import Chart from "../../components/Overview/Chart";
import PieChartExample  from "../../components/Overview/Pie";
import List from "../../components/Overview/Table";

const Home = () => {
  return (
    <div>
      <Layout>
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
      </Layout>
    </div>
  );
};

export default Home;
