import React, { useState } from "react";
import Layout from "../../../components/Core/Layout";
import { Rating } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Badge from "../../../components/Products/Badge";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

type Props = {};

export default function CategoryList({}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const rows: GridRowsProp = [
    {
      id: 1,
      category: "Men Leather Loafers",
      subCategories: Math.floor(Math.random() * 300),
      rating: 4,
      Products: Math.floor(Math.random() * 3020),
      Orders: Math.floor(Math.random() * 100),
      Searches: Math.floor(Math.random() * 100),
      actions: Math.floor(Math.random() * 50),
      onClick: () => openModal(),
    },
    {
      id: 2,
      category: "Women's Sneakers",
      subCategories: Math.floor(Math.random() * 300),
      rating: Math.floor(Math.random() * 5) + 1,
      Products: Math.floor(Math.random() * 100),
      Orders: Math.floor(Math.random() * 100),
      Searches: Math.floor(Math.random() * 100),
      actions: Math.floor(Math.random() * 50),
      onClick: () => openModal(),
    },
    {
      id: 3,
      category: "Kids Backpack",
      subCategories: Math.floor(Math.random() * 300),
      rating: Math.floor(Math.random() * 5) + 1,
      Products: Math.floor(Math.random() * 100),
      Orders: Math.floor(Math.random() * 100),
      Searches: Math.floor(Math.random() * 100),
      actions: Math.floor(Math.random() * 50),
      onClick: () => openModal(),
    },
    {
      id: 4,
      category: "Women's Dress",
      subCategories: Math.floor(Math.random() * 300),
      rating: Math.floor(Math.random() * 5) + 1,
      Products: Math.floor(Math.random() * 100),
      Orders: Math.floor(Math.random() * 100),
      Searches: Math.floor(Math.random() * 100),
      actions: Math.floor(Math.random() * 50),
      onClick: () => openModal(),
    },
    {
      id: 5,
      category: "Men's Watch",
      subCategories: Math.floor(Math.random() * 300),
      rating: Math.floor(Math.random() * 5) + 1,
      Products: Math.floor(Math.random() * 100),
      Orders: Math.floor(Math.random() * 100),
      Searches: Math.floor(Math.random() * 100),
      actions: Math.floor(Math.random() * 50),
      onClick: () => openModal(),
    },
    {
      id: 6,
      category: "Women's Handbag",
      subCategories: Math.floor(Math.random() * 300),
      rating: Math.floor(Math.random() * 5) + 1,
      Products: Math.floor(Math.random() * 100),
      Orders: Math.floor(Math.random() * 100),
      Searches: Math.floor(Math.random() * 100),
      actions: Math.floor(Math.random() * 50),
      onClick: () => openModal(),
    },
    {
      id: 7,
      category: "Men's T-Shirt",
      subCategories: Math.floor(Math.random() * 300),
      rating: Math.floor(Math.random() * 5) + 1,
      Products: Math.floor(Math.random() * 100),
      Orders: Math.floor(Math.random() * 100),
      Searches: Math.floor(Math.random() * 100),
      actions: Math.floor(Math.random() * 50),
      onClick: () => openModal(),
    },
    {
      id: 8,
      category: "Women's Sandals",
      subCategories: Math.floor(Math.random() * 300),
      rating: Math.floor(Math.random() * 5) + 1,
      Products: Math.floor(Math.random() * 100),
      Orders: Math.floor(Math.random() * 100),
      Searches: Math.floor(Math.random() * 100),
      actions: Math.floor(Math.random() * 50),
      onClick: () => openModal(),
    },
    {
      id: 9,
      category: "Kids Toy",
      subCategories: Math.floor(Math.random() * 300),
      rating: Math.floor(Math.random() * 5) + 1,
      Products: Math.floor(Math.random() * 100),
      Orders: Math.floor(Math.random() * 100),
      Searches: Math.floor(Math.random() * 100),
      actions: Math.floor(Math.random() * 50),
      onClick: () => openModal(),
    },
  ];

  const columns: GridColDef[] = [
    { field: "category", headerName: "Category", width: 200 },
    { field: "subCategories", headerName: "Sub-Categories", width: 120 },
    {
      field: "rating",
      headerName: "Rating",
      width: 200,
      renderCell: (params) => {
        const value = params.value || 0;
        return (
          <Rating
            name={`rating-${params.row.id}`}
            value={value}
            precision={0.5}
            readOnly
          />
        );
      },
    },
    { field: "Products", headerName: "Products", width: 200 },
    { field: "Orders", headerName: "Orders", width: 120 },
    { field: "Searches", headerName: "No. of Searches", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        const value = params.value || 0;
        return (
          <div className="flex justify-center items-center gap-3">
            <svg
              className="cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12Z"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.45703 12C3.73103 7.943 7.52203 5 11.999 5C16.477 5 20.267 7.943 21.541 12C20.267 16.057 16.477 19 11.999 19C7.52203 19 3.73103 16.057 2.45703 12Z"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <svg
              className="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7M10 11V17M14 11V17M15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7M4 7H20"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        );
      },
    },
  ];

  const badgeData = [
    {
      id: 1,
      orders: 242000,
      link: "./#",
      image: (
        <Icon icon="carbon:categories" color="#1b7cfc" width={36} height={36} />
      ),
      title: "Product Categories",
    },
    {
      id: 2,
      orders: 242000,
      link: "./sub-categories",
      image: (
        <Icon icon="carbon:categories" color="#1b7cfc" width={36} height={36} />
      ),
      title: "Product Sub-Categories",
    },
  ];

const goBack = () => {

  window.history.back();
};

  return (
    <>
      <Layout>
        <div className="flex flex-col gap-4 bg-[#F5F5F5]">
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <p className="text-[36px] font-bold">Product Categories</p>
              <div
                className="flex gap-2 items-center text-[#1B7CFC] cursor-pointer"
                onClick={goBack}
              >
                <Icon icon="icon-park-outline:left" />
                <p>Back to Products</p>
              </div>
            </div>
            <Link
              to={"/products/categories/add-category"}
              className="border border-[#E51B48] bg-[#E51B48] text-[#fff] p-1 px-2 rounded-sm"
            >
              Add Categories
            </Link>
          </div>
          <div className="flex flex-row items-center gap-4">
            <Badge badgeData={badgeData} />
          </div>
          <div className="bg-[white]">
            <DataGrid
              rows={rows}
              columns={columns}
              onRowClick={(params) =>
                params.row.onClick && params.row.onClick()
              }
              className="cursor-pointer"
            />
          </div>
          {/* <PopUpModal isOpen={isModalOpen} onClose={closeModal}>
            <ProductsPopUp />
          </PopUpModal> */}
        </div>
      </Layout>
    </>
  );
}
