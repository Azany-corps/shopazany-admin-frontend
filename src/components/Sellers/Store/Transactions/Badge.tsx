import React from "react";
import { Icon } from "@iconify/react";

interface BadgeData {
  id: number;
  orders: number | string;
  image: React.ReactNode;
  title: string;
}

const Badge = () => {
  const data: BadgeData[] = [
    {
      id: 1,
      orders: 49,
      image: <Icon icon="grommet-icons:transaction" color="#1b7cfc" width={36} height={36} />,
      title: "Total Transactions",
    },
    {
      id: 2,
      orders: "$4500",
      image: <Icon icon="ic:twotone-money-off" color="#1b7cfc" width={36} height={36} />,
      title: "Total Amount",
    },
    {
      id: 3,
      orders: "$4500",
      image: <Icon icon="bx:dollar" color="#1b7cfc" width={36} height={36} />,
      title: "Available Amount",
    },
  ];

  return (
    <>
      {data.map((badge) => (
        <div className="flex justify-between gap-8 bg-[white] px-4 p-2 rounded-md" key={badge.id}>
          <div className="flex flex-col justify-between">
            <p className="font-semibold text-[14px]">{badge.title}</p>
            <p className="font-semibold text-[26px]">{badge.orders.toLocaleString()}</p>
          </div>
          <div>{badge.image}</div>
        </div>
      ))}
    </>
  );
};

export default Badge;
