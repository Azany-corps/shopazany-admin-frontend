import React from "react";
import Layout from "../../../components/Core/Layout";
import { Icon } from "@iconify/react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import Badge from "../../../components/Sellers/Store/Transactions/Badge";
import Rating from "@mui/material/Rating";

const StoreTransactions = () => {
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
    {
      id: 5,
      type: "Deposit",
      date: "13/04/2023",
      amount: "$1,200",
    },
    {
      id: 6,
      type: "Sales",
      date: "13/04/2023",
      amount: "$2,500",
    },
    {
      id: 7,
      type: "Withdrawal",
      date: "14/04/2023",
      amount: "- $1,000",
    },
    {
      id: 8,
      type: "Deposit",
      date: "14/04/2023",
      amount: "$3,000",
    },
  ];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "type", headerName: "Type", width: 300 },

    { field: "date", headerName: "Date", width: 300 },
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
          <p className="text-[18px] font-semibold">Transactions</p>
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

export default StoreTransactions;
