import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

interface BadgeData {
  number: number;
  image: React.ReactNode;
  title: string;
  className?: string
}

const Badge: React.FC<BadgeData> = ({ number, image, title, className = '' }) => {

  return (
    <>
      <div
        className={`${className} flex justify-start gap-[14px] w-full bg-[white] items-center px-[10px] py-3 rounded-2xl`}
      >
        <div className="p-2 bg-[#F4F7FE] rounded-full shadow-sm">{image}</div>
        <div className="flex flex-col justify-between w-full">
          <p className="font-semibold text-[#A3AED0] w-full">{title}</p>
          <p className="text-[15px] font-bold">
            {number.toLocaleString()}
          </p>
        </div>
      </div>
    </>
  );
};

export default Badge;
