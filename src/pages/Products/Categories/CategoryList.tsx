import { useEffect, useState } from "react";
import Layout from "../../../components/Core/Layout";
import { Rating } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Badge from "../../../components/Products/Badge";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PopUpModal from "../../../components/Core/PopUp";
import { deleteCategory } from "../../../Services/categories.service";
// import { deleteCategory } from "../../../services/categories.service";

interface CategoryData {
  id: number;
  category: string;
  about: string;
  banner_url: string;
  created_at: string;
  updated_at: string;
  sub_categories: any[];
  category_attributes: any[];
}

export default function CategoryList() {
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://test.shopazany.com/api/auth/admin/store/fetch_store_categories",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data.data.values));
        setCategories(response.data.data.values);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [activeCategory, setActiveCategory] = useState<CategoryData>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const rows: GridRowsProp = categories.map((category: any) => {
    return {
      id: category.id,
      category: category.category,
      subCategories: category.sub_categories.length,
      rating: Math.floor(Math.random() * 5),
      Products: Math.floor(Math.random() * 3020),
      Orders: Math.floor(Math.random() * 100),
      Searches: Math.floor(Math.random() * 100),
      // onClick: () => navigate(`./${category.id}`),
      // onDelete: null,
    };
  });

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
        return (
          <div className="flex items-center justify-center gap-3">
            <svg
              onClick={() => navigate(`./${params.row.id}`)}
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
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.45703 12C3.73103 7.943 7.52203 5 11.999 5C16.477 5 20.267 7.943 21.541 12C20.267 16.057 16.477 19 11.999 19C7.52203 19 3.73103 16.057 2.45703 12Z"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <svg
              onClick={() => {
                setActiveCategory(
                  categories.find(
                    (category: CategoryData) => category.id === params.row.id
                  )
                );
                openModal();
              }}
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
                strokeLinecap="round"
                strokeLinejoin="round"
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
    {
      id: 2,
      orders: 242000,
      link: "./attributes",
      image: (
        <Icon icon="carbon:categories" color="#1b7cfc" width={36} height={36} />
      ),
      title: "Attributes",
    }
  ];

  const goBack = () => {
    window.history.back();
  };
  const handleDeleteCategory = async (id: any) => {
    console.log("id: ", id);
    const categoryList = await deleteCategory(id);
    setCategories(categoryList);
    closeModal();
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col gap-4 bg-[#F5F5F5]">
          <div className="flex items-center justify-between">
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
          <PopUpModal isOpen={isModalOpen} onClose={closeModal}>
            <div className="flex flex-col gap-4 p-3">
              <div className="flex justify-between">
                <h1>Delete Category</h1>
              </div>
              <div className="flex p-3 gap-5 bg-[#F1F4FF] items-end">
                <div className="flex-1">
                  <p>{activeCategory?.category}</p>
                  <small>Created on: {activeCategory?.created_at}</small>
                </div>
                <div className="flex flex-col">
                  <p>{activeCategory?.sub_categories.length}</p>
                  <small className="text-xs">Sub categories</small>
                </div>
                <div className="flex flex-col">
                  <p>102</p>
                  <small className="text-xs">Products</small>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button className="w-48 h-10 pt-2.5 pb-3 rounded-sm border text-[#E51B48] text-sm font-medium font-['Inter'] border-[#E51B48] justify-center items-center">
                  cancel
                </button>
                <button
                  className="w-48 h-10 pt-2.5 pb-3 rounded-sm border border-[#E51B48] text-brand-bg text-sm font-medium font-['Inter'] bg-[#E51B48] justify-center items-center"
                  onClick={() =>
                    handleDeleteCategory(
                      activeCategory ? activeCategory.id : ""
                    )
                  }
                >
                  confirm
                </button>
              </div>
            </div>
          </PopUpModal>
        </div>
      </Layout>
    </>
  );
}
