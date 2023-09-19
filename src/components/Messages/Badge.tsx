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
      orders: 589,
      image: <Icon icon="uil:ticket" color="#1b7cfc" width={36} height={36} />,
      title: "Support Ticket",
    },
    {
      id: 2,
      orders: 3545,
      image: <Icon icon="icon-park-outline:message-sent" color="#1b7cfc" width={36} height={36} />,
      title: "Total Notifications Sent",
    },
    {
      id: 3,
      orders: 450,
      image: <Icon icon="mdi:email-sent-outline" color="#1b7cfc" width={36} height={36} />,
      title: "Total Emails Sent",
    },
  ];

  return (
    <>
      {data.map((badge) => (
        <div className="flex w-1/7 gap-7 bg-[white] px-4 p-2 rounded-md" key={badge.id}>
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
