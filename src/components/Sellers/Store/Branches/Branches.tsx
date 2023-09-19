import React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const Branches = () => {
  const rows: GridRowsProp = [
    {
      id: 1,
      name: "Samsung Galaxy",
      location: "Badagry, Lagos",
      products: "approved",
      date: "12/04/2023",
      orders: "23",
    },
    {
      id: 2,
      name: "Apple iPhone",
      location: "Ikeja, Lagos",
      products: "pending",
      date: "15/04/2023",
      orders: "12",
    },
    {
      id: 3,
      name: "Google Pixel",
      location: "Victoria Island, Lagos",
      products: "approved",
      date: "18/04/2023",
      orders: "17",
    },
    {
      id: 4,
      name: "Samsung Galaxy",
      location: "Badagry, Lagos",
      products: "approved",
      date: "12/04/2023",
      orders: "23",
    },
  ];

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 100 },
    { field: "location", headerName: "Location", width: 200 },

    { field: "products", headerName: "Products" },
    { field: "date", headerName: "Date Created", width: 150 },
    { field: "orders", headerName: "Orders", width: 150 },
  ];
  return (
    <div className="bg-[white] p-4 flex flex-col gap-4">
      <div className="flex justify-between">
        <p className="font-semibold">Branches</p>
        <Link to="/sellers/branches">
        <p className="text-[#E51B48]">SEE MORE</p>
        </Link>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col ">
          <p className="text-[14px] text-[#515151]">Total Branches</p>
          <p className="text-[24px]">7</p>
        </div>
      </div>
      <div>
        <p className="text-[14px] text-[#515151]">List</p>
        <DataGrid rows={rows} columns={columns} onRowClick={(params) => params.row.onClick && params.row.onClick()} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Branches;
