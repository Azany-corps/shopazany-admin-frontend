import React, { ReactNode, useEffect, useState } from "react";
import Layout from "../../components/Core/Layout";
import LayoutComp from "../../components/Core/LayoutComp";
import axios from "axios";
import { Icon } from "@iconify/react";
import Profile from "../../components/Sellers/Profile";
import Subscription from "../../components/Sellers/Subscription";
import Feedback from "../../components/Sellers/Feedback";
import Table from "../../components/Core/Table/Table";
import { useParams } from "react-router-dom";
import { approveSeller, suspendSeller } from "../../Services/seller.service";
import { error } from "console";

interface IProduct {
  product_name: string;
  category: string;
  status: string;
  action: string;
}
const Seller = () => {
  let { id } = useParams<string>()
  const [activeTab, setActiveTab] = useState<number>(1)
  const [seller, setSeller] = useState<any>({})
  const [products, setProducts] = useState<IProduct[]>([])
  const [rowData, setRowData] = useState<any>([])
  const [status, setStatus] = useState<string>('')
  const headers = ['Product name', 'Category', 'Status', 'Action'];
  const handleTabChange = (index: number) => {
    setActiveTab(index)
  }



  // const rowData = products.map((data, index) => {
  //   return {
  //     product_name: (
  //       <div className="flex items-center gap-3">
  //         <span className=" h-[35px] rounded-full overflow-hidden bg-red-400 w-[35px]">
  //           <img className="object-cover w-full h-full" src="" alt="" />
  //         </span>
  //         <p className="text-[13px] font-medium">{data.product_name}</p>
  //       </div>
  //     ),
  //     category_name: <p className="text-[#555F7E] text-[13px]">{data.category}</p>,
  //     status: <p className="text-[#FFAD33] text-[13px]">{data.status}</p>,
  //     action: <span className="bg-[#0F60FF29] text-[#0F60FF] font-semibold rounded-lg py-1 px-4 text-[11px] ">{data.action}</span>
  //   }
  // })

  useEffect(() => {
    console.log('pr: ', products)
    const rowData = products.map((data, index) => {
      return {
        product_name: (
          <div className="flex items-center gap-3">
            <span className=" h-[35px] rounded-full overflow-hidden bg-red-400 w-[35px]">
              <img className="object-cover w-full h-full" src="" alt="" />
            </span>
            <p className="text-[13px] font-medium">{data.product_name}</p>
          </div>
        ),
        category_name: <p className="text-[#555F7E] text-[13px]">{data.category}</p>,
        status: <p className="text-[#FFAD33] text-[13px]">{data.status}</p>,
        action: <span className="bg-[#0F60FF29] text-[#0F60FF] font-semibold rounded-lg py-1 px-4 text-[11px] ">{data.action}</span>
      }
    })
    console.log('row: ', rowData)
    setRowData(rowData);
  }, [products])

  useEffect(() => {
    getSellerProducts(id);
  }, [])

  useEffect(() => {
    getSellerDetails(id);
  }, [status])


  const handleApprove = () => {
    approveSeller(id).then((res: any) => {
      console.log(res)
      setStatus('Active');
    }).catch((error) => {
      console.log(error);
    })
  }

  const handleSuspend = () => {
    suspendSeller(id).then((res: any) => {
      console.log(res)
      setStatus('Suspended');
    }).catch((error) => {
      console.log(error);
    })
  }

  const getSellerProducts = (id: string | undefined) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://test.shopazany.com/api/auth/admin/sellers/products/all/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log('res: ', response.data.all_user_products);
        const products: IProduct[] = response.data.all_user_products.map((product: IProduct, index: number) => {
          return {
            product_name: product.product_name,
            category: product.category,
            status: product.status,
            action: 'action'
          }
        });

        setProducts(products);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const getSellerDetails = (id: string | undefined) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://test.shopazany.com/api/auth/admin/sellers/details/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log('res: ', response.data.seller);
        setSeller(response.data.seller);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <LayoutComp title={'Manage Seller'}>
        <div className="flex flex-col gap-4 bg-[#fafafa]">
          <div className="flex flex-col items-start gap-6 px-3 py-5 bg-white rounded-3xl">
            <h2 className="text-[#0F60FF] font-medium">Store Details</h2>
            <div className="flex items-start gap-4">
              <div className="flex h-[264px] w-[209px] bg-slate-300 rounded-[20px] relative">
                <span className="py-3 absolute text-xs w-[90%] bottom-3 left-1/2 -translate-x-1/2 z-10 rounded-3xl text-center bg-white/50 backdrop:blur-md">Shop logo</span>
              </div>
              <div className="flex gap-12">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col items-start gap-4 font-semibold text-left">
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
                  <div className="flex flex-col gap-2">
                    {seller.status !== 'Active' && (
                      <button onClick={handleApprove} className="rounded-[16px] text-white bg-[#279F51] px-[10px] py-2">Approve</button>
                    )}
                    {seller.status !== 'Suspended' && (
                      <button onClick={handleSuspend} className="rounded-[16px] bg-transparent border border-[#D65D5B] px-[10px] py-2">Suspend</button>
                    )}
                  </div>
                </div>
                <div className="flex flex-col font-semibold">
                  <h2 className="text-[#0F60FF] font-medium">Store Details</h2>
                  <div className="flex flex-col items-start gap-4 text-left">
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
                  <div className="flex flex-col items-start gap-4 text-left">
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
                  <div className="flex flex-col items-start gap-4 text-left">
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
          <div className="flex flex-col items-start gap-6 px-3 py-5 bg-white rounded-3xl">
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
            <Table headers={headers} data={rowData} />
          </div>
        </div>
      </LayoutComp>
    </>
  );
};

export default Seller;
