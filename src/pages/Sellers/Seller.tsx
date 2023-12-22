import React, { useState } from "react";
import Layout from "../../components/Core/Layout";
import LayoutComp from "../../components/Core/LayoutComp";

import { Icon } from "@iconify/react";
import Profile from "../../components/Sellers/Profile";
import Subscription from "../../components/Sellers/Subscription";
import Feedback from "../../components/Sellers/Feedback";
import Table from "../../components/Core/Table/Table";

const Seller = () => {
  const [activeTab, setActiveTab] = useState<number>(1)
  const headers = ['Product name', 'Category', 'Status', 'Action'];
  const handleTabChange = (index: number) => {
    setActiveTab(index)
  }
  const tdata = [
    {
      product_name: 'Gucci bag',
      category: 'Clothing',
      status: 'Status',
      action: <div className="bg-slate-400 text-white px-3 py-2">Custom Content</div>
    },
    {
      product_name: 'Gucci bag',
      category: 'Clothing',
      status: 'Status',
      action: <div className="bg-slate-400 text-white px-3 py-2">Custom</div>
    },
  ];

  const data = [...tdata.map((dat, index) => [...Object.values(dat).map((item, index) => item)])]
  console.log('data: ', data)
  return (
    <>
      <LayoutComp title={'Manage Seller'}>
        <div className="flex flex-col gap-4 bg-[#fafafa]">
          <div className="flex flex-col items-start gap-6 bg-white py-5 px-3 rounded-3xl">
            <h2 className="text-[#0F60FF] font-medium">Store Details</h2>
            <div className="flex gap-4 items-start">
              <div className="flex h-[264px] w-[209px] bg-slate-300 rounded-[20px] relative">
                <span className="py-3 absolute text-xs w-[90%] bottom-3 left-1/2 -translate-x-1/2 z-10 rounded-3xl text-center bg-white/50 backdrop:blur-md">Shop logo</span>
              </div>
              <div className="flex gap-12">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4 items-start text-left font-semibold">
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-sm text-[#909090]">Shop name</h3>
                      <p className="">Getfit Technologies</p>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-sm text-[#909090]">Status</h3>
                      <p className="text-[#FFC600]">Pending</p>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-sm text-[#909090]">Business type</h3>
                      <p className="">Individual</p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-col">
                    <button className="rounded-[16px] text-white bg-[#279F51] px-[10px] py-2">Approve</button>
                    <button className="rounded-[16px] bg-transparent border border-[#D65D5B] px-[10px] py-2">Approve</button>
                  </div>
                </div>
                <div className="flex flex-col font-semibold">
                  <h2 className="text-[#0F60FF] font-medium">Store Details</h2>
                  <div className="flex flex-col gap-4 items-start text-left">
                    <div className="flex flex-col">
                      <h4 className="text-[10px] text-[#909090]">Account managers first name </h4>
                      <p className="text-xs">Emmanuel</p>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-[10px] text-[#909090]">Account managers middle name </h4>
                      <p className="text-xs">Johnathan</p>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-[10px] text-[#909090]">Account managers last name </h4>
                      <p className="text-xs">Emmanuel</p>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-[10px] text-[#909090]">Account number</h4>
                      <p className="text-xs">345678980</p>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-[10px] text-[#909090]">Bank</h4>
                      <p className="text-xs">First bank</p>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-[10px] text-[#909090]">Country</h4>
                      <p className="text-xs">Nigeria</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col font-semibold">
                  <h2 className="text-[#0F60FF] font-medium">Business info</h2>
                  <div className="flex flex-col gap-4 items-start text-left">
                    <div className="flex flex-col">
                      <h4 className="text-[10px] text-[#909090]">Legal representative first name</h4>
                      <p className="text-xs">Emmanuel</p>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-[10px] text-[#909090]">Legal representative middle name</h4>
                      <p className="text-xs">Johnathan</p>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-[10px] text-[#909090]">Account managers last name </h4>
                      <p className="text-xs">Emmanuel</p>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-[10px] text-[#909090]">Registered company name</h4>
                      <p className="text-xs">Getfit Technologies limited</p>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-[10px] text-[#909090]">CAC registration number</h4>
                      <p className="text-xs">345678980</p>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-[10px] text-[#909090]">Tax Identification number</h4>
                      <p className="text-xs">345678980</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col font-semibold">
                  <h2 className="text-[#0F60FF] font-medium">Contact Details</h2>
                  <div className="flex flex-col gap-4 items-start text-left">
                    <div className="flex flex-col">
                      <h4 className="text-[10px] text-[#909090]">Phone Number</h4>
                      <p className="text-xs">09034867656</p>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-[10px] text-[#909090]">Additional Number</h4>
                      <p className="text-xs">09034867656</p>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-[10px] text-[#909090]">Email</h4>
                      <p className="text-xs">emmy433@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-6 bg-white py-5 px-3 rounded-3xl">
            <div className="flex items-end gap-6">
              <div onClick={() => handleTabChange(1)} className={`flex hover:cursor-pointer items-end pb-1 gap-2 font-bold ${activeTab === 1 ? 'text-[#0F60FF] border-b-[3px] border-b-[#0F60FF]' : 'text-[#D0D0D0]'}`}>
                <p>New Listings</p>
                <span className={`text-white font-normal bg-[#0F60FF] rounded-full px-1 ${activeTab === 1 ? '' : 'opacity-40'}`}>9+</span>
              </div>
              <div onClick={() => handleTabChange(2)} className={`flex hover:cursor-pointer items-end pb-1 gap-2 font-bold ${activeTab === 2 ? 'text-[#0F60FF] border-b-[3px] border-b-[#0F60FF]' : 'text-[#D0D0D0]'}`}>
                <p>Approved</p>
                <span className={`text-white font-normal bg-[#0F60FF] rounded-full px-1 ${activeTab === 2 ? '' : 'opacity-40'}`}>9+</span>
              </div>
              <div onClick={() => handleTabChange(3)} className={`flex hover:cursor-pointer items-end pb-1 gap-2 font-bold ${activeTab === 3 ? 'text-[#0F60FF] border-b-[3px] border-b-[#0F60FF]' : 'text-[#D0D0D0]'}`}>
                <p>Rejected</p>
                <span className={`text-white font-normal bg-[#0F60FF] rounded-full px-1 ${activeTab === 3 ? '' : 'opacity-40'}`}>9+</span>
              </div>
            </div>
            <Table headers={headers} data={data} />
          </div>
        </div>
      </LayoutComp>
    </>
  );
};

export default Seller;
