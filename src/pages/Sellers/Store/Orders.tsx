import React from "react";
import Layout from "../../../components/Core/Layout";
import { Icon } from "@iconify/react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import Badge from "../../../components/Sellers/Store/Orders/Badge";

const StoreOrders = () => {
  const rows: GridRowsProp = [
    {
      id: 1,
      product: "Men Leather Loafers...",
      tracking: "12216789",
      shipping: "FedEx",
      date: "12/04/2023",
      status: "approved",
      amount: "$400",
    },
    {
      id: 2,
      product: "Women's Running Shoes...",
      tracking: "23567891",
      shipping: "UPS",
      date: "12/06/2023",
      status: "pending",
      amount: "$250",
    },
    {
      id: 3,
      product: "Kids Backpack...",
      tracking: "35678912",
      shipping: "DHL",
      date: "12/08/2023",
      status: "shipped",
      amount: "$80",
    },
    {
      id: 4,
      product: "Men's T-Shirt...",
      tracking: "46789123",
      shipping: "USPS",
      date: "12/10/2023",
      status: "approved",
      amount: "$30",
    },
    {
      id: 5,
      product: "Women's Handbag...",
      tracking: "57891234",
      shipping: "FedEx",
      date: "12/12/2023",
      status: "delivered",
      amount: "$200",
    },
    {
      id: 6,
      product: "Children's Book...",
      tracking: "68912345",
      shipping: "DHL",
      date: "12/14/2023",
      status: "pending",
      amount: "$15",
    },
    {
      id: 7,
      product: "Men's Watch...",
      tracking: "79123456",
      shipping: "UPS",
      date: "12/16/2023",
      status: "shipped",
      amount: "$150",
    },
    {
      id: 8,
      product: "Women's Sunglasses...",
      tracking: "81234567",
      shipping: "USPS",
      date: "12/18/2023",
      status: "approved",
      amount: "$100",
    },
    {
      id: 9,
      product: "Kids Toy Set...",
      tracking: "92345678",
      shipping: "DHL",
      date: "12/20/2023",
      status: "delivered",
      amount: "$50",
    },
    {
      id: 10,
      product: "Men's Jeans...",
      tracking: "23456789",
      shipping: "FedEx",
      date: "12/22/2023",
      status: "pending",
      amount: "$80",
    },
  ];
  

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "product", headerName: "Product", width: 250 },
    { field: "tracking", headerName: "TrackingID", width: 150 },
    { field: "shipping", headerName: "Shipping Company", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "amount", headerName: "Amount", width: 150 },
  ];
  return (
    <>
      <Layout>
        <div className="flex flex-col gap-2 bg-[#F5F5F5]">
          <div className="flex justify-between items-center">
            <div className="flex gap-8 items-center">
              <p className="text-[36px] font-bold">Seller Store - </p>
              <div className="flex gap-2 items-center">
                <img
                  className="rounded-full w-8 h-8"
                  src="https://randomwordgenerator.com/img/picture-generator/sebastiaan-stam-XbZkCaminOY-unsplash.jpg"
                  alt="avatar"
                />
                <p className="text-[20px]">Samsung</p>
              </div>
              <div className="flex gap-2 items-center text-[#1B7CFC]">
                <Icon icon="icon-park-outline:left" />
                <p>Back to Seller Store</p>
              </div>
            </div>
          </div>
          <p className="text-[18px] font-semibold">Orders</p>
          <div className="flex flex-row items-center gap-4">
            <Badge />
          </div>
          <div className="bg-[white]">
            <DataGrid rows={rows} columns={columns} onRowClick={(params) => params.row.onClick && params.row.onClick()} className="cursor-pointer" />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default StoreOrders;
