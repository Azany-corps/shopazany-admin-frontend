import React from 'react'
import { Icon } from '@iconify/react';

interface BadgeData {
  id: number;
  orders: number;
  image: React.ReactNode;
  title: string;
}

const Badges = () => {
  const data: BadgeData[] = [
    {
      id: 1,
      orders: 32,
      image: <Icon icon="ps:store" color="#1b7cfc" width="36" height="36" />,
      title: "Active Stores",
    },
    {
      id: 2,
      orders: 8,
      image: <Icon icon="mdi:store-off-outline" color="#1b7cfc" width="36" height="36" />,
      title: "Inactive Stores",
    },
    {
      id: 3,
      orders: 17,
      image: <Icon icon="mdi:account-cowboy-hat-outline" color="#1b7cfc" width="36" height="36" />,
      title: "Farmer Accounts",
    },
    {
      id: 4,
      orders: 5,
      image: <Icon icon="mdi:card-account-details-star-outline" color="#1b7cfc" width="36" height="36" />,
      title: "Manufacturer Accounts",
    },
    {
      id: 5,
      orders: 2,
      image: <Icon icon="solar:diploma-verified-broken" color="#1b7cfc" width="36" height="36" />,
      title: "Verified Businesses",
    },
    {
      id: 6,
      orders: 2,
      image: <Icon icon="octicon:unverified-16" color="#1b7cfc" width="36" height="36" />,
      title: "Unverified Businesses",
    },
    {
      id: 7,
      orders: 242,
      image: <Icon icon="material-symbols:business-messages-outline" color="#1b7cfc" width="36" height="36" />,
      title: "Merchant Accounts",
    },
    {
      id: 8,
      orders: 83200,
      image: <Icon icon="material-symbols:business-messages-outline" color="#1b7cfc" width="36" height="36" />,
      title: "Total Sales",
    }
  ]

  return (
    <>
      {data.map((badge) => (
        <div className='flex justify-between items-center bg-[white] p-2 rounded-md' key={badge.id}>
          <div className='flex flex-col justify-between'>
          <p className="font-semibold text-[14px]">{badge.title}</p>
          <p className="font-semibold text-[26px]">{badge.orders.toLocaleString()}</p>
          </div>
          <div>
            {badge.image}
          </div>
        </div>
      ))}
    </>
  )
}

export default Badges;
