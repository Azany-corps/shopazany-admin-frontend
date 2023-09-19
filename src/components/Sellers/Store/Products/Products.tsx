import React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

const Products = () => {
  const rows: GridRowsProp = [
    {
      id: 1,
      product: "Men Leather Loafers",
      price: "$74.95",
      rating: 4,
      location: "Ikeja, Lagos",
      unitsold: Math.floor(Math.random() * 100),
      orders: Math.floor(Math.random() * 100),
      Returns: Math.floor(Math.random() * 50),
    },
    {
      id: 2,
      product: "Women's Sneakers",
      price: "$59.99",
      rating: Math.floor(Math.random() * 5) + 1,
      location: "Abuja, Nigeria",
      unitsold: Math.floor(Math.random() * 100),
      orders: Math.floor(Math.random() * 100),
      Returns: Math.floor(Math.random() * 50),
    },
    {
      id: 3,
      product: "Kids Backpack",
      price: "$29.99",
      rating: Math.floor(Math.random() * 5) + 1,
      location: "Lagos, Nigeria",
      unitsold: Math.floor(Math.random() * 100),
      orders: Math.floor(Math.random() * 100),
      Returns: Math.floor(Math.random() * 50),
    },
    {
      id: 4,
      product: "Women's Dress",
      price: "$49.95",
      rating: Math.floor(Math.random() * 5) + 1,
      location: "Abuja, Nigeria",
      unitsold: Math.floor(Math.random() * 100),
      orders: Math.floor(Math.random() * 100),
      Returns: Math.floor(Math.random() * 50),
    },
  ];

  const columns: GridColDef[] = [
    { field: "product", headerName: "Product", width: 150 },
    { field: "price", headerName: "Price", width: 80 },
    {
      field: "rating",
      headerName: "Rating",
      width: 120,
      renderCell: (params) => {
        const value = params.value || 0;
        return <Rating name={`rating-${params.row.id}`} value={value} precision={0.5} readOnly />;
      },
    },
    { field: "location", headerName: "Location", width: 100 },
    { field: "unitsold", headerName: "Unit Sold", width: 100 },
    { field: "orders", headerName: "Orders", width: 100 },
    { field: "Returns", headerName: "No. of Returns", width: 120 },
  ];
  return (
    <div className="bg-[white] p-4 flex flex-col gap-4">
      <div className="flex justify-between">
        <p className="font-semibold">Products</p>
        <Link to="/sellers/products">
        <p className="text-[#E51B48]">SEE MORE</p>
        </Link>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col ">
          <p className="text-[14px] text-[#515151]">Total Products</p>
          <p className="text-[24px]">19</p>
        </div>
      </div>
      <div className="mb-5">
        <p className="text-[14px] text-[#515151]">List</p>
        <DataGrid rows={rows} columns={columns} onRowClick={(params) => params.row.onClick && params.row.onClick()} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Products;
