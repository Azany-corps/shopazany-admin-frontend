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
      image: <Icon icon="akar-icons:shipping-box-02" color="#1b7cfc" width={36} height={36} />,
      title: "Total Orders",
    },
    {
      id: 2,
      orders: "45",
      image: <Icon icon="la:shipping-fast" color="#1b7cfc" width={36} height={36} />,
      title: "Completed Orders ",
    },
    {
      id: 3,
      orders: "143",
      image: <Icon icon="wi:time-3" color="#1b7cfc" width={36} height={36} />,
      title: "Pending Orders",
    },
    {
      id: 4,
      orders: "23",
      image: <Icon icon="ReplyOutline" color="#1b7cfc" width={36} height={36} />,
      title: "Returned Orders",
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
