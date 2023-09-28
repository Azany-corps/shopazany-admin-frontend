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
          className="flex justify-between gap-8 bg-[white] items-center px-4 p-2 rounded-md"
          key={badge.id}
        >
          <div className="flex flex-col justify-between">
            <p className="font-semibold text-[14px]">{badge.title}</p>
            <p className="font-semibold text-[26px]">
              {badge.orders.toLocaleString()}
            </p>
          </div>
          <div>{badge.image}</div>
        </Link>
      ))}
    </>
  );
};

export default Badge;
