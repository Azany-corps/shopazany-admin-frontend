import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

interface BadgeData {
  id: number;
  orders: number;
  link: string;
  image: React.ReactNode;
  title: string;
}

interface BadgeProps {
  badgeData?: BadgeData[];
}

const Badge: React.FC<BadgeProps> = ({ badgeData }) => {
  const data: BadgeData[] = badgeData
    ? badgeData
    : [
      {
        id: 1,
        orders: 334200,
        link: "#",
        image: (
          <Icon
            icon="streamline:shopping-bag-hand-bag-1-shopping-bag-purse-goods-item-products"
            color="#1b7cfc"
            width={36}
            height={36}
          />
        ),
        title: "Total Products",
      },
      {
        id: 2,
        orders: 242000,
        link: "#",
        image: (
          <Icon
            icon="streamline:shopping-bag-hand-bag-1-shopping-bag-purse-goods-item-products"
            color="#1b7cfc"
            width={36}
            height={36}
          />
        ),
        title: "Farm Products",
      },
      {
        id: 3,
        orders: 242000,
        link: "./categories",
        image: (
          <Icon
            icon="carbon:categories"
            color="#1b7cfc"
            width={36}
            height={36}
          />
        ),
        title: "Product Categories",
      },
    ];

  return (
    <>
      {data.map((badge) => (
        <Link
          to={badge.link}
          className="flex justify-start gap-6 bg-[white] items-center px-4 w-60 py-5 rounded-2xl"
          key={badge.id}
        >
          <div className="p-4 bg-[#F4F7FE] rounded-full shadow-sm">{badge.image}</div>
          <div className="flex flex-col justify-between">
            <p className="font-semibold text-[#A3AED0] text-[14px]">{badge.title}</p>
            <p className="font-bold text-2xl">
              {badge.orders.toLocaleString()}
            </p>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Badge;
