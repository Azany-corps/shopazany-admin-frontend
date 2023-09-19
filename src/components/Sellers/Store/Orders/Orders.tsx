import React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const Orders = () => {
  const rows: GridRowsProp = [
    {
      id: 1,
      product: "Men Suede Loafers...",
      date: "12/04/2023",
      status: "pending",
      amount: "- $5,400",
    },
    {
      id: 2,
      product: "Men Leather Loafers...",
      date: "12/04/2023",
      status: "approved",
      amount: "- $3,400",
    },
    {
      id: 3,
      product: "Hp 16 Victus Gaming...",
      date: "12/04/2023",
      status: "pending",
      amount: "$7,900",
    },
    {
      id: 4,
      product: "Men Leather Loafers...",
      date: "12/04/2023",
      status: "approved",
      amount: "$400",
    },
  ];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "product", headerName: "Product", width: 200 },

    { field: "date", headerName: "Date", width: 150 },
    { field: "status", headerName: "Status" },
    { field: "amount", headerName: "Amount", width: 150 },
  ];
  return (
    <div className="bg-[white] p-4 flex flex-col gap-4">
      <div className="flex justify-between">
        <p className="font-semibold">Orders</p>
        <Link to="/sellers/orders">
        <p className="text-[#E51B48]">SEE MORE</p>
        </Link>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col ">
          <p className="text-[14px] text-[#515151]">Total Orders</p>
          <p className="text-[24px]">49</p>
        </div>
        <div className="flex flex-col ">
          <p className="text-[14px] text-[#515151]">Completed Orders</p>
          <p className="text-[24px]">319</p>
        </div>
        <div className="flex flex-col ">
          <p className="text-[14px] text-[#515151]">Pending Order</p>
          <p className="text-[24px]">130</p>
        </div>
      </div>
      <div className="mb-5">
        <p className="text-[14px] text-[#515151]">History</p>
        <DataGrid rows={rows} columns={columns} onRowClick={(params) => params.row.onClick && params.row.onClick()} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Orders;
