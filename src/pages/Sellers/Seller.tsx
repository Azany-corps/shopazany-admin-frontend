import React from "react";
import Layout from "../../components/Core/Layout";
import { Icon } from "@iconify/react";
import Profile from "../../components/Sellers/Profile";
import Subscription from "../../components/Sellers/Subscription";
import Feedback from "../../components/Sellers/Feedback";

const Seller = () => {
  return (
    <>
      <Layout>
        <div className="flex flex-col gap-4 bg-[#F5F5F5]">
          <div className="flex justify-between items-center">
            <div className="flex gap-8 items-center">
              <p className="text-[36px] font-bold">Seller Profile - </p>
              <div className="flex gap-2 items-center">
                <img
                  className="rounded-full w-8 h-8"
                  src="https://randomwordgenerator.com/img/picture-generator/sebastiaan-stam-XbZkCaminOY-unsplash.jpg"
                  alt="avatar"
                />
                <p className="text-[20px]">Samsung</p>
              </div>
              <div className="flex gap-2 items-center text-[#1B7CFC]">
                <Icon icon="icon-park-outline:left" />
                <p>Back to Sellers List</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className=" p-2 border border-[#E51B48] text-[#E51B48] text-[14px] rounded-sm">Suspend Account</button>
              <button className="p-2 py-2 bg-[#E51B48] text-[white] text-[14px] rounded-sm">Delete Account</button>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-[white] p-4 w-full rounded-md">
              <Profile />
            </div>
            <div className="bg-[white] p-4 w-full rounded-md">
              <Subscription />
            </div>
          </div>
          <div className="bg-[white] gap-4 flex-col flex p-4 py-4 rounded-md">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-[18px]">Customer Feedback</p>
              <p className="font-semibold text-[18px] text-[#E51B48]">SEE MORE</p>
            </div>
            <Feedback />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Seller;
