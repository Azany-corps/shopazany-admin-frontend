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
import { toast } from "react-toastify";
import { fetchNestedCategories } from "../../../Services/categories.service";

import { NestedAccordion } from "../../../components/UI/NestedAccordion";
// import { deleteCategory } from "../../../services/categories.service";

interface CategoryData {
  id: number;
  category: string;
  about: string;
  banner_url: string;
  created_at: string;
  status: any;
  updated_at: string;
  sub_categories: any[];
  category_attributes: any[];
}

export default function CategoryList() {

  const [activeCategory, setActiveCategory] = useState<CategoryData>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);
  const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
  const [categories, setCategories] = useState<any>([]);
  const [nestedCategories, setNestedCategories] = useState<any>([])

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openParentModal = () => {
    setIsParentModalOpen(true);
  };

  const closeParentModal = () => {
    setIsParentModalOpen(false);
  };

  const handleCategorySelect = async (category: string, id: number) => {
    const categ = category.split('- ')
    console.log("Categs: ", categ[1], "id: ", id);
    closeParentModal()
    // setFormData({ ...formData, product_category: category });
    // closeCategoryModal();
  }

  const openDoneModal = () => {
    setIsDoneModalOpen(true);
    setTimeout(() => setIsDoneModalOpen(false), 800);
  };

  const closeDoneModal = () => {
    setTimeout(() => setIsDoneModalOpen(false), 3000);
    //setIsDoneModalOpen(false);
  };

  const navigate = useNavigate();

  const rows: GridRowsProp = categories.map((category: any) => {
    return {
      id: category.id,
      category: category.category,
      product_count: category.sub_categories.length,
      created_at: "12-03-2023",
      status: "",
      //created_at: category.created_at,
      //rating: Math.floor(Math.random() * 5),
      //Products: Math.floor(Math.random() * 3020),
      //Orders: Math.floor(Math.random() * 100),
      //Searches: Math.floor(Math.random() * 100),
      onClick: () => navigate(`./${category.id}`),
      //onClick: () => navigate("/products/categories/add-category"),
      // onDelete: null,
    };
  });

  const columns: GridColDef[] = [
    { field: "category", headerName: "Category", width: 300 },
    { field: "product_count", headerName: "Product Count", width: 300 },
    { field: "created_at", headerName: "Date Added", width: 300 },
    { field: "status", headerName: "Status", width: 300 },
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

  useEffect(() => {
    getCategories();
    getNestedCategories();
  }, []);

  const handleSubmit = async (e: any) => {
    let formData = new FormData();
    e.preventDefault();
    closeModal();
    openDoneModal();


    // try {
    //   let data = new FormData();
    //   data.append("category", formData.product_category);
    //   data.append("product_name", formData.product_name);
    //   data.append("stock", formData.stock);
    //   data.append("quantity", formData.stock_quantity);
    //   data.append("currency", formData.currency);
    //   data.append("price", formData.price);
    //   data.append("brand_id", formData.brand);
    //   data.append("description", formData.product_description);
    //   data.append("short_description", formData.short_description);
    //   data.append("weight", formData.weight);
    //   data.append("sales_price", formData.sale_price);
    //   data.append("start_date", formData.sale_start_date);
    //   data.append("end_date", formData.sale_end_date);

    //   formData?.product_attributes?.forEach((attribute, index) => {
    //     data.append(`attribute_text[${index}]`, attribute)
    //   });

    //   selectedImages?.forEach((image, index) => {
    //     data.append(`image_1[${index}]`, image)
    //   });

    //   const response = await callAPI("auth/store/create_store_product", "POST", data, {
    //     "Content-Type": "multipart/form-data",
    //   });
    //   console.log(response);

    //   if (response.status && response.status_code === 200) {
    //     toast.success("Product added successfully", {
    //       position: "top-center",
    //       autoClose: 3000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });
    //     navigate("/manufacturers-profile/product");
    //   } else {
    //     const errorMessage = response.data.data.errors[0];
    //     toast.error(errorMessage, {
    //       position: "top-center",
    //       autoClose: 3000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });
    //   }
    //   navigate("/manufacturers-profile/product");
    // } catch (err: any) {
    //   console.log(err);
    //   toast.error(err?.response?.data?.data?.errors?.[0], {
    //     position: "top-center",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
  };

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
        // console.log(JSON.stringify(response.data.data.values));
        setCategories(response.data.data.values);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getNestedCategories = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://test.shopazany.com/api/auth/admin/nested-category",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data.data.values));
        setNestedCategories(response.data.categories);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <LayoutComp title={<Link to="/products/categories">Categories</Link>}>
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

          <div className="flex flex-row w-full space-x-14">
            <div className="flex-center text-center rounded-[16px] border-[1px] border-[#B3B7BB] w-[240px] h-[41px] align-middle">
              <input
                type="text"
                className="text-center focus:outline-none border-none w-[90%] font-[500] text-xs text-[#B3B7BB] bg-[#FAFAFA;]"
                placeholder="Search"
              />
            </div>
            <button
              onClick={openModal}
              className="flex-center text-center rounded-[16px] border-[1px] bg-[#D65D5B] w-[140px] h-[41px] cursor-pointer"
            >
              <p className="font-[500] text-xs text-[#fff]">
                Create a category
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
              <div className="py-6 px-28">
                <form className="flex-center flex-col space-y-3" action="">
                  <div className="flex-center text-center rounded-[16px] border-[1px] border-[#B3B7BB] w-[372px] h-[54px] align-middle">
                    <input
                      type="text"
                      className="text-center focus:outline-none border-none w-[90%] font-[700] text-sm text-[#B3B7BB]"
                      placeholder="Title"
                    />
                  </div>
                  <div
                    className="flex-center text-center rounded-[16px] border-[1px] font-[700] text-sm text-[#B3B7BB] border-[#B3B7BB] w-[372px] h-[54px] align-middle"
                    onClick={openParentModal}
                  >
                    <span>Select Parent Category</span>
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
                      id="files"
                      type="file"
                      className="hidden text-center focus:outline-none border-none w-[90%] font-[700] text-sm text-[#B3B7BB]"
                    />
                    <label
                      htmlFor="files"
                      className="text-center focus:outline-none border-none w-[90%] font-[700] text-sm text-[#B3B7BB]"
                    >
                      Select file
                    </label>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="flex-center mt-3 text-center rounded-[16px] border-[1px] bg-[#000] w-[267px] h-[54px] cursor-pointer"
                  >
                    <p className="mt-1 font-[700] text-sm text-[#fff]">Add</p>
                  </button>
                </form>
              </div>
            </div>
          </PopUpModal>

          {/*Modal*/}
          <PopUpModal isOpen={isParentModalOpen} onClose={closeParentModal}>
            <div className="flex justify-center items-center w-[700px] relative h-[60vh] flex-col gap-4 p-3">
              <div className="flex-start flex w-full justify-between">
                <h1 className="font-[700] text-xs w-full text-left mt-3">Select parent category</h1>
              </div>
              <div className="flex flex-col w-full h-full overflow-y-scroll">
                <NestedAccordion categories={nestedCategories} handleCategorySelect={handleCategorySelect} />
              </div>
            </div>
          </PopUpModal>

          {/*Done Modal*/}
          <PopUpModal isOpen={isDoneModalOpen} onClose={() => { }}>
            <div className="w-[374px] h-[366.37px] flex-center flex-col gap-4 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="173"
                height="173"
                viewBox="0 0 173 173"
                fill="none"
              >
                <path
                  d="M173 86.5C173 134.273 134.273 173 86.5 173C38.7274 173 0 134.273 0 86.5C0 38.7274 38.7274 0 86.5 0C134.273 0 173 38.7274 173 86.5ZM8.08804 86.5C8.08804 129.806 43.1943 164.912 86.5 164.912C129.806 164.912 164.912 129.806 164.912 86.5C164.912 43.1943 129.806 8.08804 86.5 8.08804C43.1943 8.08804 8.08804 43.1943 8.08804 86.5Z"
                  fill="#00A91B"
                />
                <path
                  d="M128 57.9375L74.375 111.562L50 87.1875"
                  stroke="url(#paint0_linear_317_10120)"
                  stroke-width="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_317_10120"
                    x1="46"
                    y1="85"
                    x2="82.5"
                    y2="98.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#00A91B" />
                    <stop offset="1" stop-color="#00A91B" />
                  </linearGradient>
                </defs>
              </svg>
              <p>Operation successful</p>
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
