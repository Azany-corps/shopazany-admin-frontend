import { Icon } from "@iconify/react";
import React from "react";
import Layout from "../../components/Core/Layout";
import { Link } from "react-router-dom";

const Tracking = () => {
  return (
    <div>
      <Layout>
        <div className="flex gap-4 flex-col">
          <div className="flex justify-between items-center">
            <div className="flex gap-8 items-center">
              <p className="text-[36px] font-bold">Orders - Tracking - </p>
              <div className="flex gap-2 items-center text-[#1B7CFC]">
                <Icon icon="icon-park-outline:left" />
                <p>Back to Orders</p>
              </div>
            </div>
          </div>
          <div className="bg-[white] rounded-sm p-4 flex gap-6">
            <div className="flex-col gap-2 flex">
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
                  <p className="text-[#1B7CFC] font-semibold">VIEW MORE</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
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
                  <p className="text-[#1B7CFC] font-semibold">VIEW PROFILE</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
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
                  </div>
                  <p>Est. Delivery: 20th July </p>
                  <p>$47.56 </p>
                  <p>Tracking ID: #245YJTK4</p>
                </div>
                <div className="flex flex-row gap-2">
                  <div>
                    <img src="/images/chimeze.png" alt="" className="w-10 h-10" />
                  </div>
                  <div className="flex flex-col gap-1 text-[14px]">
                    <p className="font-semibold text-[16px]">Chimeze LTD</p>
                    <div className="flex gap-2 items-center">
                      <Icon icon="mdi:location" width="16" height="16" />
                      <p>Austin, Texas</p>
                    </div>
                    <p className="text-[#E51B48] font-semibold">VIEW STORE </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Tracking;
