import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import React from "react";
import Layout from "../../../components/Core/Layout";
import { Icon } from "@iconify/react";
import Badge from "../../../components/Sellers/Store/Branches/Badge";
const StoreBranches = () => {
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
    { field: "name", headerName: "Name", width: 200 },
    { field: "location", headerName: "Location", width: 250 },

    { field: "products", headerName: "Products", width: 250 },
    { field: "date", headerName: "Date Created", width: 250 },
    { field: "orders", headerName: "Orders", width: 200 },
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
          <p className="text-[18px] font-semibold">Branches</p>
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

export default StoreBranches;
