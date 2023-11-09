import React from "react";

type CardProps = {
  name: string;
  price: string;
  image: string;
};

const DashboardCard = ({ name, price, image }: CardProps) => {
  return (
    <div className="flex items-center p-4 rounded-lg bg-white h-28">
      <div className="bg-[#EEEEEF] rounded-full p-[15px]">
        <img src={image} />
      </div>
      <div className="ml-9">
        <p className="text-[#8E95A9] text-sm font-medium font-inter capitalize">
          {name}
        </p>
        <p className="text-[#231F20] font-semibold text-2xl font-inter uppercase">
          {price}
        </p>
      </div>
    </div>
  );
};

export default DashboardCard;
