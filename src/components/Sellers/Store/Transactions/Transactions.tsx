import React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const Transactions = () => {
  const rows: GridRowsProp = [
    {
      id: 1,
      type: "Withdrawal",
      date: "12/04/2023",
      amount: "- $5,400",
    },
    {
      id: 2,
      type: "Withdrawal",
      date: "12/04/2023",
      amount: "- $3,400",
    },
    {
      id: 3,
      type: "Sales",
      date: "12/04/2023",
      amount: "$7,900",
    },
    {
      id: 4,
      type: "Withdrawal",
      date: "12/04/2023",
      amount: "$400",
    },
  ];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "type", headerName: "Type", width: 200 },

    { field: "date", headerName: "Date", width: 150 },
    { field: "amount", headerName: "Amount", width: 150 },
  ];
  return (
    <div className="bg-[white] p-4 flex flex-col gap-4">
      <div className="flex justify-between">
        <p className="font-semibold">Transactions</p>
        <Link to="/sellers/transactions" className="text-[#E51B48]">
          <p className="text-[#E51B48]">SEE MORE</p>
        </Link>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col ">
          <p className="text-[14px] text-[#515151]">Total Transaction</p>
          <p className="text-[24px]">49</p>
        </div>
        <div className="flex flex-col ">
          <p className="text-[14px] text-[#515151]">Total Amount</p>
          <p className="text-[24px]">$63,319</p>
        </div>
        <div className="flex flex-col ">
          <p className="text-[14px] text-[#515151]">Available Amount</p>
          <p className="text-[24px]">$21,130</p>
        </div>
      </div>
      <div className="mb-5">
        <p className="text-[14px] text-[#515151]">History</p>
        <DataGrid rows={rows} columns={columns} onRowClick={(params) => params.row.onClick && params.row.onClick()} className="cursor-pointer " />
      </div>
    </div>
  );
};

export default Transactions;
