import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Core/Layout";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import Badge from "../../components/Customers/Badge";
import Rating from "@mui/material/Rating";

const Customers = () => {
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
    {
      id: 5,
      product: "Men's Watch",
      price: "$99.99",
      rating: Math.floor(Math.random() * 5) + 1,
      location: "Lagos, Nigeria",
      unitsold: Math.floor(Math.random() * 100),
      orders: Math.floor(Math.random() * 100),
      Returns: Math.floor(Math.random() * 50),
    },
    {
      id: 6,
      product: "Women's Handbag",
      price: "$39.95",
      rating: Math.floor(Math.random() * 5) + 1,
      location: "Abuja, Nigeria",
      unitsold: Math.floor(Math.random() * 100),
      orders: Math.floor(Math.random() * 100),
      Returns: Math.floor(Math.random() * 50),
    },
    {
      id: 7,
      product: "Men's T-Shirt",
      price: "$24.99",
      rating: Math.floor(Math.random() * 5) + 1,
      location: "Lagos, Nigeria",
      unitsold: Math.floor(Math.random() * 100),
      orders: Math.floor(Math.random() * 100),
      Returns: Math.floor(Math.random() * 50),
    },
    {
      id: 8,
      product: "Women's Sandals",
      price: "$44.95",
      rating: Math.floor(Math.random() * 5) + 1,
      location: "Abuja, Nigeria",
      unitsold: Math.floor(Math.random() * 100),
      orders: Math.floor(Math.random() * 100),
      Returns: Math.floor(Math.random() * 50),
    },
    {
      id: 9,
      product: "Kids Toy",
      price: "$19.99",
      rating: Math.floor(Math.random() * 5) + 1,
      location: "Lagos, Nigeria",
      unitsold: Math.floor(Math.random() * 100),
      orders: Math.floor(Math.random() * 100),
      Returns: Math.floor(Math.random() * 50),
    },
  ];

  const columns: GridColDef[] = [
    { field: "product", headerName: "Product", width: 200 },
    { field: "price", headerName: "Price", width: 120 },
    {
      field: "rating",
      headerName: "Rating",
      width: 200,
      renderCell: (params) => {
        const value = params.value || 0;
        return <Rating name={`rating-${params.row.id}`} value={value} precision={0.5} readOnly />;
      },
    },
    { field: "location", headerName: "Location", width: 200 },
    { field: "unitsold", headerName: "Unit Sold", width: 120 },
    { field: "orders", headerName: "Orders", width: 120 },
    { field: "Returns", headerName: "No. of Returns", width: 120 },
  ];

  const history = useNavigate();
  const handleRowClick = () => {
    // Redirect to /customers/customer page
    history("/customers/customer");
  };
  return (
    <>
      <Layout>
        <div className="flex flex-col gap-4 bg-[#F5F5F5]">
          <p className="text-[36px] font-bold">Customers</p>
          <div className="flex flex-row items-center gap-4">
            <Badge />
          </div>
          <div className="bg-[white]">
            <DataGrid rows={rows} columns={columns} className="cursor-pointer" onRowClick={handleRowClick} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Customers;
