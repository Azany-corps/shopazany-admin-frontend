import React, { useState } from "react";
import ExtendFreeTrialPopUp from "./ExtendFreeTrialPopUp";
import PopUpModal from "../Core/PopUp";

const Subscription = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="flex justify-between  items-center">
        <p className="font-semibold text-[16px]">Subscription</p>
        <div className="flex items-center p-2 px-4 bg-[#FFD700]">
          <p className="font-semibold text-[14px]">Give Unlimited Access</p>
        </div>
      </div>
      <div className="flex-col flex gap-2">
        <p className="text-[#515151] text-[16px]">Current Subscription</p>
        <div className="flex items-center gap-2">
          <p className="text-[#1B7CFC] text-[24px]">Premium Plan</p>
          <p className="text-[#E51B48] text-[14px]">Upgrade Plan</p>
        </div>
        <p className="text-[#515151] text-[14px]">Expires 20 June 2023</p>
      </div>
      <div className="border-t border-black my-4"></div>
      <div className="flex flex-col gap-16">
        <div className="">
          <p>Last Payment: 19 May 2023</p>
        </div>
        <div className="flex justify-between items-center">
          <p>No free trial available</p>
          <div className="flex items-center p-2 px-4 bg-[#E51B48] hover:bg-[red] cursor-pointer" onClick={openModal}>
            <p className="font-semibold text-[14px] text-[white]">Extend Free Trial</p>
          </div>{" "}
        </div>
      </div>
      <PopUpModal isOpen={isModalOpen} onClose={closeModal}>
        <ExtendFreeTrialPopUp />
      </PopUpModal>
    </div>
  );
};

export default Subscription;
