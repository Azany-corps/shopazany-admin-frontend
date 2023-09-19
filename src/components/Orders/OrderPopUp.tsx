import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";

const OrderPopUp = () => {
  return (
    <div className=" flex flex-col gap-6 p-4">
      <div className="flex flex-row items-center gap-2">
        <p className="text-[22px]">Order Details</p>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[#EC6F29]"></div>
          <p className="font-semibold text-[14px]">Pending</p>
        </div>{" "}
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex gap-6">
          <div>
            <p className="font-semibold text-[16px]">Product</p>
            <div className="flex flex-row gap-2">
              <div>
                <img src="/images/orderimage.png" alt="" className="w-10 h-10" />
              </div>
              <div className="flex flex-col gap-1 text-[14px]">
                <p>Hp 16 Victus Gaming Intel Core I5 16" </p>
                <p>16GB RAM/512GB SSD 4GB Nvidia RTX</p>
                <p>3050 Win 11</p>
                <p>34 units - $47,576 </p>
                <Link to="/products/product">
                <p className="text-[#1B7CFC]">VIEW MORE</p>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div>
              <p className="font-semibold text-[16px]">Customer Details</p>
              <div className="flex flex-row gap-2">
                <div>
                  <img src="/images/hannah.png" alt="" className="w-10 h-10" />
                </div>
                <div className="flex flex-col gap-1 text-[14px]">
                  <p>Hannah Jones</p>
                  <p>Email: Hannahjones443@yahoo.com</p>
                  <p>Phone: +313 746 3748</p>
                  <p>Location: Nairobi Kenya</p>
                  <p>ID: #28384</p>
                  <p className="text-[#1B7CFC]">VIEW PROFILE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="font-semibold text-[16px]">Shipping</p>
          <div className="flex flex-row gap-2">
            <div>
              <img src="/images/feded.png" alt="" className="w-10 h-10" />
            </div>
            <div className="flex flex-col gap-1 text-[14px]">
              <p>FedEx</p>
              <div className="flex gap-2 items-center">
                <Icon icon="mdi:location" width="16" height="16" />
                <p>Austin, Texas - Nairobi Kenya</p>
                <Link to="/orders/tracking">
                  <p className="text-[#1B7CFC] cursor-pointer">TRACK ORDER</p>
                </Link>
              </div>
              <p>Est. Delivery: 20th July </p>
              <p>$47.56 </p>
              <p>Tracking ID: #245YJTK4</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <p>Total: $47,635</p>
          <div className="gap-4 flex item-center">
            <button className="border border-[#E51B48] text-[#E51B48] p-1 px-2 rounded-sm">Cancel</button>
            <button className="bg-[#E51B48] text-[white] p-1 px-2 rounded-sm">Print Order Slip </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPopUp;
