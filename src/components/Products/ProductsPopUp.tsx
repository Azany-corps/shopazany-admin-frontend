import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";

const ProductsPopUp = () => {
  return (
    <div className=" flex flex-col gap-6 p-4">
      <div className="flex flex-row items-center gap-2">
        <p className="text-[22px]">Product Details</p>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex gap-6">
          <div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4 items-center">
                <img src="/images/orderimage.png" alt="" className="w-10 h-10" />
                <img src="/images/orderimage.png" alt="" className="w-10 h-10" />
                <img src="/images/orderimage.png" alt="" className="w-10 h-10" />
                <img src="/images/orderimage.png" alt="" className="w-10 h-10" />
                <Icon icon="carbon:next-outline" width="24" height="24" />
              </div>
              <div className="flex flex-col gap-1 text-[14px]">
                <p>Hp 16 Victus Gaming Intel Core I5 16" </p>
                <p>16GB RAM/512GB SSD 4GB Nvidia RTX</p>
                <p>3050 Win 11</p>
                <p>Austin Texas </p>
                <p className="font-semibold">$1,576  </p>
                <Link to="/products/product">
                <p className="text-[#1B7CFC]">VIEW MORE</p>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-col flex justify-between">
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
            <div className="flex gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-[12px]">Orders</p>
                <p className="text-[20px]">78</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[12px]">Units sold</p>
                <p className="text-[20px]">53</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[12px]">No of Returns</p>
                <p className="text-[20px]">11</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          
          <div className="flex gap-2">
            <p>1,454 Reviews</p>
            <p className="text-[#1B7CFC]">VIEW</p>
          </div>
          <div className="gap-4 flex item-center">
            <button className="border border-[#E51B48] text-[#E51B48] p-1 px-2 rounded-sm">Edit</button>
            <button className="bg-[#E51B48] text-[white] p-1 px-2 rounded-sm">Delete Product </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPopUp;
