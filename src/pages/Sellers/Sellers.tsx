import React from "react";
import Layout from "../../components/Core/Layout";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const rows: GridRowsProp = [
  {
    id: 1,
    username: "Samsung",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    datejoined: "2021-09-01",
    status: "active",
    account: "Manufacturer",
    products: 8,
    orders: Math.floor(Math.random() * 100),
    reviews: Math.floor(Math.random() * 50),
  },
  {
    id: 2,
    username: "Apple",
    img: "https://randomwordgenerator.com/img/picture-generator/sebastiaan-stam-XbZkCaminOY-unsplash.jpg",
    datejoined: "2023-09-07",
    account: "Merchant",
    status: "passive",
    products: 12,
    orders: Math.floor(Math.random() * 100),
    reviews: Math.floor(Math.random() * 50),
  },
  {
    id: 3,
    username: "Chimeze LTD",
    img: "https://randomwordgenerator.com/img/picture-generator/55e9dc4a4851ae14f1dc8460962e33791c3ad6e04e50744172287ad29e44c4_640.jpg",
    datejoined: "2022-02-01",
    account: "Farmer",
    status: "pending",
    products: 5,
    orders: Math.floor(Math.random() * 100),
    reviews: Math.floor(Math.random() * 50),
  },
  {
    id: 4,
    username: "Mashmood LTD",
    img: "https://randomwordgenerator.com/img/picture-generator/54e6d5404a55b10ff3d8992cc12c30771037dbf85257714d702672d69548_640.jpg",
    datejoined: "2021-09-01",
    account: "Merchant",
    status: "active",
    products: 10,
    orders: Math.floor(Math.random() * 100),
    reviews: Math.floor(Math.random() * 50),
  },
  {
    id: 5,
    username: "Hisense",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    datejoined: "2021-09-01",
    account: "Manufacturer",
    status: "passive",
    products: 3,
    orders: Math.floor(Math.random() * 100),
    reviews: Math.floor(Math.random() * 50),
  },
  {
    id: 6,
    username: "Toshiba",
    img: "https://randomwordgenerator.com/img/picture-generator/53e4d246495bad14f1dc8460962e33791c3ad6e04e507440722d72d5954ac1_640.jpg",
    datejoined: "2023-08-05",
    account: "Farmer",
    status: "active",
    products: 7,
    orders: Math.floor(Math.random() * 100),
    reviews: Math.floor(Math.random() * 50),
  },
  {
    id: 7,
    username: "LG",
    img: "https://randomwordgenerator.com/img/picture-generator/53e3d7464e53a414f1dc8460962e33791c3ad6e04e507440762a7cd19049cd_640.jpg",
    datejoined: "2020-08-05",
    account: "Merchant",
    status: "passive",
    products: 6,
    orders: Math.floor(Math.random() * 100),
    reviews: Math.floor(Math.random() * 50),
  },
  {
    id: 8,
    username: "Sony",
    img: "https://randomwordgenerator.com/img/picture-generator/57e2d1464d56a414f1dc8460962e33791c3ad6e04e50744172287cd19649c5_640.jpg",
    datejoined: "2021-04-05",
    account: "Manufacturer",
    status: "active",
    products: 9,
    orders: Math.floor(Math.random() * 100),
    reviews: Math.floor(Math.random() * 50),
  },
  {
    id: 9,
    username: "Panasonic",
    img: "https://randomwordgenerator.com/img/picture-generator/55e0d3414a51a814f1dc8460962e33791c3ad6e04e507440702d79d3944ecd_640.jpg",
    datejoined: "2023-08-05",
    account: "Farmer",
    status: "pending",
    products: 4,
    orders: Math.floor(Math.random() * 100),
    reviews: Math.floor(Math.random() * 50),
  },
  {
    id: 10,
    username: "Roxie",
    img: "https://images.unsplash.com/photo-1672709842636-1dd09e63c0f4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3Mzk2MDUzMg&ixlib=rb-4.0.3&q=80&w=300",
    datejoined: "2021-08-05",
    account: "Manufacturer",
    status: "active",
    products: 6,
    orders: Math.floor(Math.random() * 100),
    reviews: Math.floor(Math.random() * 50),
  },
];

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "company",
    headerName: "Logo",
    renderCell: (params) => {
      return (
        <div className="">
          <img className="rounded-full w-8 h-8" src={params.row.img} alt="avatar" />
        </div>
      );
    },
    width: 150,
  },
  { field: "username", headerName: "Seller Name", width: 200 },
  { field: "datejoined", headerName: "Date Joined", width: 200 },

  {
    field: "account",
    headerName: "Account",
    width: 200,
  },
  {
    field: "products",
    headerName: "Products",
  },
  {
    field: "orders",
    headerName: "Orders",
  },
  {
    field: "reviews",
    headerName: "Reviews",
  },
];
const Sellers = () => {
  const navigate = useNavigate();

  const handleRowClick = (params: any) => {
    // const sellerId = params.row.id;
    navigate("/sellers/seller");
  };
  return (
    <>
      <Layout>
        <div className="flex flex-col gap-4 bg-[#F5F5F5]">
          <p className="text-[36px] font-bold">Sellers</p>
          <div className="bg-[white]">
            <DataGrid rows={rows} columns={columns} onRowClick={handleRowClick} className="cursor-pointer"/>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Sellers;
