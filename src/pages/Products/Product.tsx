import React from "react";
import Layout from "../../components/Core/Layout";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <>
      <Layout>
        <div className="flex flex-col gap-4 bg-[#F5F5F5]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <p className="text-[36px] font-bold">Products - #4567829 </p>
              <div className="flex gap-2 items-center text-[#1B7CFC]">
                <Icon icon="icon-park-outline:left" />
                <p>Back to Products</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Link to={'./add-category'} className="p-2 py-2 bg-[#E51B48] text-white text-[14px] rounded-sm">Add Category</Link>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="bg-[white] w-full rounded-md p-4 flex">
              <div>
                <img src="/images/productimage.png" alt="" />
              </div>
              <div className="flex flex-col gap-2 px-2">
                <div>
                  <p>Samsung Galaxy A04s, 4GB/64GB Memory - Black</p>
                  <p>Category: Electronics</p>
                  <p>Stock: 203 Units left shipping from Kenya</p>
                </div>

                <div className="border-t-2 border-gray-500"></div>
                <div className="flex justify-between">
                  <div>
                    <p>$563.34</p>
                  </div>
                  <div>
                    <p>Discount</p>
                    <p>20% at 50 units</p>
                    <p>40% at 100 units</p>
                    <p>80% at 100 units</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-col flex bg-[white] p-4 rounded-md w-full justify-between">
              <div className="flex flex-row justify-between">
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
                <div className="flex flex-row gap-2">
                  <div>
                    <img src="/images/chimeze.png" alt="" className="w-10 h-10" />
                  </div>
                  <div className="flex flex-col gap-1 text-[14px]">
                    <p className="font-semibold text-[16px]">Chimeze LTD</p>
                    <div className="flex items-center gap-2">
                      <Icon icon="mdi:location" width="16" height="16" />
                      <p>Austin, Texas</p>
                    </div>
                    <p className="text-[#E51B48] font-semibold">VIEW STORE </p>
                  </div>
                </div>
              </div>
              <div></div>
              <div className="flex items-center justify-between gap-4">
                <button className="font- text-[18px] w-full py-1 border border-[#E51B48] text-[#E51B48]">Edit</button>
                <button className="font- text-[18px] bg-[#E51B48] text-[white] w-full py-1">Delete Product</button>
              </div>{" "}
            </div>
          </div>
          <div className="bg-[white] p-4 rounded-md flex-col flex gap-4">
            <div>
              <h1 className="text-[24px]">Product Details</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.Lorem ipsum
                dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
                consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.
                Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.Lorem ipsum
                dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet
                consectetur.Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.
                Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.Lorem ipsum
                dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet{" "}
              </p>
            </div>
            <div>
              <h1 className="text-[24px]">Specifications</h1>
              <p>
                {" "}
                Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.Lorem ipsum
                dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
                consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.
                Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.Lorem ipsum
                dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet
                consectetur.Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.
                Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.Lorem ipsum
                dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Product;
