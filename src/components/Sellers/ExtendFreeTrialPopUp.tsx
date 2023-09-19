import React from "react";

const ExtendFreeTrialPopUp = () => {
  return (
    <div className="w-full flex flex-col gap-6 p-4">
      <p className="text-[22px]">Extend Free Trial</p>
      <div className="flex-col flex gap-3">
        <div className="flex gap-2 items-center">
          <img
            className="rounded-full w-8 h-8"
            src="https://randomwordgenerator.com/img/picture-generator/sebastiaan-stam-XbZkCaminOY-unsplash.jpg"
            alt="avatar"
          />
          <p className="text-[20px]">Samsung</p>
        </div>
        <p>No Free Trial Available</p>
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-[12px] text-[#515151]">PLAN</p>
            <input type="text" placeholder="Select Plan" className="border border-[#C1C1C1] bg-[#F5F5F5] p-2 rounded-sm w-full" />
          </div>
          <div>
            <p className="text-[12px] text-[#515151]">DAYS</p>
            <input type="text" placeholder="Input amount of days" className="border border-[#C1C1C1] bg-[#F5F5F5] p-2 rounded-sm w-full" />
            <p className="text-[14px]">Trial will end when the days selected above is reached</p>
          </div>
          <div>
            <p className="text-[12px] text-[#515151]">PASSWORD</p>
            <input type="text" placeholder="Select Plan" className="border border-[#C1C1C1] bg-[#F5F5F5] p-2 rounded-sm w-full" />
          </div>
        </div>
      </div>
      <button className="p-2 bg-[#E51B48] text-[white] rounded-sm">Confirm</button>
    </div>
  );
};

export default ExtendFreeTrialPopUp;
