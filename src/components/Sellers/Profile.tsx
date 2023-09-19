import React, { useState } from "react";
import { Link } from "react-router-dom";
import PopUpModal from "../Core/PopUp";
import LocationPopUp from "./LocationPopUp";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="flex justify-between ">
        <p className="font-semibold text-[16px]">Profile</p>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[#1CC00E]"></div>
          <p className="font-semibold text-[14px]">Online</p>
        </div>
      </div>
      <div className="flex justify-between ">
        <div className="flex flex-col gap-2 text-[14px]">
          <p>
            <span className="text-[#515151]">Name:</span> Samsung Inc
          </p>
          <div className="flex items-center gap-2">
            <p>
              <span className="text-[#515151]">Location:</span> Nambia
            </p>
            <p className="text-[#E51B48] font-semibold cursor-pointer hover:text-[red]" onClick={openModal}>
              VIEW
            </p>
          </div>
          <p>
            <span className="text-[#515151]">Business Reg no:</span> 623UWSD2
          </p>
          <p>
            <span className="text-[#515151]">Store ID:</span> #4532DFR34
          </p>
        </div>
        <div className="flex flex-col gap-2 flex-end text-[14px]">
          <p>
            <span className="text-[#515151]">Email:</span> Johndo@mailinator.com
          </p>
          <p>
            <span className="text-[#515151]">Password:</span> *******
          </p>
        </div>
      </div>
      <div className="border-t border-black my-4"></div>
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col ">
          <p className="text-[14px] font-semibold text-[#515151]">Total products</p>
          <p className="text-[24px] font-medium">238</p>
        </div>

        <div className="flex flex-col ">
          <p className="text-[14px] font-semibold text-[#515151]">Orders</p>
          <p className="text-[24px] font-medium">138</p>
        </div>
        <div className="flex flex-col ">
          <p className="text-[14px] font-semibold text-[#515151]">Reviews</p>
          <p className="text-[24px] font-medium">119</p>
        </div>
        <div className="flex flex-col ">
          <p className="text-[14px] font-semibold text-[#515151]">Total Sales</p>
          <p className="text-[24px] font-medium">%4401</p>
        </div>
        <div className="flex flex-col ">
          <p className="text-[14px] font-semibold text-[#515151]">Avg. Rating</p>
          <p className="text-[24px] font-medium">3.4</p>
        </div>
        <div className="flex flex-col ">
          <Link to="/sellers/store">
            <p className="text-[#E51B48] font-semibold cursor-pointer hover:text-red-600">VIEW STORE</p>
          </Link>
        </div>
      </div>
      <PopUpModal isOpen={isModalOpen} onClose={closeModal}>
        <LocationPopUp />
      </PopUpModal>
    </div>
  );
};

export default Profile;
