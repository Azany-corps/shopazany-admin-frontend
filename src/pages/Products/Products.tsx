import React, { useState } from "react";
import Layout from "../../components/Core/Layout";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import Badge from "../../components/Products/Badge";
import PopUpModal from "../../components/Core/PopUp";
import { useNavigate, Link } from "react-router-dom";
import ProductsPopUp from "../../components/Products/ProductsPopUp";
import Rating from "@mui/material/Rating";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  //   const rows: GridRowsProp = products.map((product: any) => {
  //     return (
  //       id: 4,
  //       product: "Women's Dress",
  //       price: "$49.95",
  //       rating: Math.floor(Math.random() * 5) + 1,
  //         location: "Abuja, Nigeria",
  //           unitsold: Math.floor(Math.random() * 100),
  //             orders: Math.floor(Math.random() * 100),
  //               Returns: Math.floor(Math.random() * 50),
  //                 onClick: () => openModal(),
  //     )
  // })

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
      onClick: () => openModal(),
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
      onClick: () => openModal(),
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
      onClick: () => openModal(),
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
      onClick: () => openModal(),
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
      onClick: () => openModal(),
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
      onClick: () => openModal(),
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
      onClick: () => openModal(),
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
      onClick: () => openModal(),
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
      onClick: () => openModal(),
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col gap-4 bg-[#F5F5F5]">
          <div className="flex justify-between">
            <p className="text-[36px] font-bold">Products</p>
            <div className="flex gap-4">
              <button
                onClick={openModal}
                className="border border-[#E51B48] bg-[#fff] text-[#E51B48] p-1 px-2 rounded-sm"
              >
                Reported Products
              </button>
              <Link
                to={"/products/add-product"}
                className="flex justify-center items-center border border-[#E51B48] bg-[#E51B48] text-[#fff] p-1 px-2 rounded-sm"
              >
                Add Product
              </Link>

            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <Badge />
          </div>
          <div className="bg-[white]">
            <DataGrid rows={rows} columns={columns} onRowClick={(params) => params.row.onClick && params.row.onClick()} className="cursor-pointer" />
          </div>
          <PopUpModal isOpen={isModalOpen} onClose={closeModal}>
            <ProductsPopUp />
          </PopUpModal>
        </div>
      </Layout>
    </>
  );
};

export default Products;
