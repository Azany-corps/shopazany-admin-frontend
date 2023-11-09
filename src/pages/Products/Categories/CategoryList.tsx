import { useEffect, useState } from "react";
import LayoutComp from "../../../components/Core/LayoutComp";
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
      created_at: "12-03-2023",
      status: "",
      //created_at: category.created_at,
      //rating: Math.floor(Math.random() * 5),
      //Products: Math.floor(Math.random() * 3020),
      //Orders: Math.floor(Math.random() * 100),
      //Searches: Math.floor(Math.random() * 100),
      //onClick: () => navigate(`./${category.id}`),
      onClick: () => navigate("/products/categories/add-category"),
      // onDelete: null,
    };
  });

  const columns: GridColDef[] = [
    { field: "category", headerName: "Category", width: 300 },
    { field: "subCategories", headerName: "Sub-Categories", width: 300 },
    { field: "created_at", headerName: "Date Added", width: 300 },
    { field: "Status", headerName: "Status", width: 300 },
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
    },
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
      <LayoutComp>
        <section className="space-y-4">
          <div className="flex flex-row bg-[#fff] w-[261px] h-[97px] justify-left text-left p-[20px] rounded-[17px] space-x-6">
            <div className="p-[15px] flex justify-center text-center bg-[#F4F7FE] w-[56px] h-[56px] rounded-full">
              <img src="/images/caticon.svg" />
            </div>
            <div className="p-[5px]">
              <p className="text-[#A3AED0] text-sm">Categories</p>
              <p className="font-[700] text-xl">350</p>
            </div>
          </div>

          <div className="flex flex-row w-full space-x-20">
            <div className="flex-center text-center rounded-[16px] border-[1px] border-[#B3B7BB] w-[372px] h-[54px] align-middle">
              <p className="font-[700] text-sm text-[#B3B7BB]">Search</p>
            </div>
            <button
              onClick={openModal}
              className="flex-center text-center rounded-[16px] border-[1px] bg-[#D65D5B] w-[267px] h-[54px] cursor-pointer"
            >
              <p className="font-[700] text-sm text-[#fff]">
                Create a category
              </p>
            </button>
            <button 
              onClick={openModal}
              className="flex-center text-center rounded-[16px] border-[1px] bg-[#D65D5B] w-[267px] h-[54px] cursor-pointer">
              <p className="font-[700] text-sm text-[#fff]">
                Create sub category
              </p>
            </button>
          </div>

          {/*Table*/}
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

          {/*Modal*/}
          <PopUpModal isOpen={isModalOpen} onClose={closeModal}>
            <div className="flex flex-col gap-4 p-3">
              <div className="flex-start flex justify-between">
                <h1 className="font-[700] text-xs mt-3">Create Category</h1>
              </div>
              <div className="flex-center flex-col space-y-3">
                <div className="flex-center text-center rounded-[16px] border-[1px] border-[#B3B7BB] w-[372px] h-[54px] align-middle">
                  <input
                    type="text"
                    className="text-center focus:outline-none border-none w-[90%] font-[700] text-sm text-[#B3B7BB]"
                    placeholder="Title"
                  />
                </div>
                <div className="flex-center text-center rounded-[16px] border-[1px] border-[#B3B7BB] w-[372px] h-[54px] align-middle">
                  <input
                    type="text"
                    className="text-center focus:outline-none border-none w-[90%] font-[700] text-sm text-[#B3B7BB]"
                    placeholder="Description"
                  />
                </div>
                <div className="flex-center text-center rounded-[16px] border-[1px] border-[#B3B7BB] w-[372px] h-[54px] align-middle">
                  <input
                    type="text"
                    className="text-center focus:outline-none border-none w-[90%] font-[700] text-sm text-[#B3B7BB]"
                    placeholder="Select attribute"
                  />
                </div>
                <div className="flex-center text-center rounded-[16px] border-[1px] border-[#B3B7BB] w-[372px] h-[54px] align-middle">
                  <input
                    type="file"
                    className="text-center focus:outline-none border-none w-[90%] font-[700] text-sm text-[#B3B7BB]"
                  />
                </div>
                <button className="flex-center text-center rounded-[16px] border-[1px] bg-[#D65D5B] w-[267px] h-[54px] cursor-pointer">
                  <p className="mt-1 font-[700] text-sm text-[#fff]">
                    Done
                  </p>
                </button>
              </div>

            </div>
          </PopUpModal>
        </section>
      </LayoutComp>
      {/*<Layout>
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
                </Layout>*/}
    </>
  );
}
