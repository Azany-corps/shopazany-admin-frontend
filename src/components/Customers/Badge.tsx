import React from "react";
import { Icon } from "@iconify/react";

interface BadgeData {
  id: number;
  orders: number;
  image: React.ReactNode;
  title: string;
}

const Badge = () => {
  const data: BadgeData[] = [
    {
      id: 1,
      orders: 334200,
      image: <Icon icon="ri:customer-service-2-line" color="#1b7cfc" width={36} height={36} />,
      title: "Total Customers",
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
