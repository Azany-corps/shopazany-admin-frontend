import { Icon } from "@iconify/react";
import Badge from "../../../components/Products/Badge";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../components/Core/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import PopUpModal from "../../../components/Core/PopUp";
import { Checkbox } from "@mui/material";
import { deleteCategory } from "../../../Services/categories.service";
import { getAttributes } from "../../../Services/attribbutes.service";


interface SubCategory {
  name: string;
  description: string;
  about: string;
  id: string;
}

export default function CategoryPage() {
  const goBack = () => {
    window.history.back();
  };
  const [categoryDetails, setCategoryDetails] = useState<any>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] = useState(false);
  const [subCategory, setSubCategory] = useState("");

  const [attributes, setAttributes] = useState([]);
  const [category, setCategory] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [subCategoryData, setSubCategoryData] = useState<SubCategory[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<any[]>([]);
  const [imgUrl, setImgUrl] = useState<any>(
    "https://img.freepik.com/free-photo/bunch-black-friday-gifts-golden-shopping-cart-with-copy-space_23-2148667040.jpg?w=1480&t=st=1695914954~exp=1695915554~hmac=dd699f3b1464daf0ef8135b0142b87174f8af4d359170d2efc997d8ec908c2e3"
  );
  const [imgFile, setImgFile] = useState<any>("");

  const fetchCategoryDetails = async (id: any) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url:
        "https://test.shopazany.com/api/auth/admin/store/view_store_category/" +
        id,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    await axios
      .request(config)
      .then((response) => {
        console.log((response.data.data.values));
        setCategoryDetails(response.data.data.values[0]);
        setImgUrl(response.data.data.values[0].banner_url)
        setCategory(response.data.data.values[0].category)
        setCategoryDescription(response.data.data.values[0].about)
        setSubCategoryData(response.data.data.values[0].sub_categories)
        setSelectedAttributes(response.data.data.values[0].category_attributes)

      })
      .catch((error) => {
        console.log(error);
      });
  };
  const { categoryId } = useParams();

  useEffect(() => {
    fetchCategoryDetails(categoryId);
  }, [categoryId]);

  const badgeData = [
    {
      id: 1,
      orders: categoryDetails?.sub_categories.length || 0,
      link: "./#",
      image: (
        <Icon icon="carbon:categories" color="#1b7cfc" width={36} height={36} />
      ),
      title: "Sub-Categories",
    },
    {
      id: 2,
      orders: 242000,
      link: "./#",
      image: (
        <Icon
          icon="streamline:shopping-bag-hand-bag-1-shopping-bag-purse-goods-item-products"
          color="#1b7cfc"
          width={36}
          height={36}
        />
      ),
      title: "Products",
    },
    {
      id: 2,
      orders: 242000,
      link: "./#",
      image: (
        <Icon icon="carbon:search" color="#1b7cfc" width={36} height={36} />
      ),
      title: "No. of searches",
    },
    {
      id: 2,
      orders: 242000,
      link: "./sub-categories",
      image: (
        <Icon
          icon="akar-icons:shipping-box-02"
          color="#1b7cfc"
          width={36}
          height={36}
        />
      ),
      title: "Orders",
    },
  ];
  const rows: GridRowsProp = [
    {
      id: 1,
      "#": 1,
      product: "Men Leather Loafers",
      price: "$74.95",
      rating: 4,
      location: "Ikeja, Lagos",
      sold: Math.floor(Math.random() * 100),
      sales: Math.floor(Math.random() * 100),
      Returns: Math.floor(Math.random() * 50),
    },
    {
      id: 2,
      "#": 2,
      product: "Women's Sneakers",
      price: "$59.99",
      rating: Math.floor(Math.random() * 5) + 1,
      location: "Abuja, Nigeria",
      sold: Math.floor(Math.random() * 100),
      sales: Math.floor(Math.random() * 100),
      Returns: Math.floor(Math.random() * 50),
    },
    {
      id: 3,
      "#": 3,
      product: "Kids Backpack",
      price: "$29.99",
      rating: Math.floor(Math.random() * 5) + 1,
      location: "Lagos, Nigeria",
      sold: Math.floor(Math.random() * 100),
      sales: Math.floor(Math.random() * 100),
      Returns: Math.floor(Math.random() * 50),
    },
    {
      id: 4,
      "#": 4,
      product: "Women's Dress",
      price: "$49.95",
      rating: Math.floor(Math.random() * 5) + 1,
      location: "Abuja, Nigeria",
      sold: Math.floor(Math.random() * 100),
      sales: Math.floor(Math.random() * 100),
      Returns: Math.floor(Math.random() * 50),
    },
    {
      id: 5,
      "#": 5,
      product: "Men's Watch",
      price: "$99.99",
      rating: Math.floor(Math.random() * 5) + 1,
      location: "Lagos, Nigeria",
      sold: Math.floor(Math.random() * 100),
      sales: Math.floor(Math.random() * 100),
      Returns: Math.floor(Math.random() * 50),
    },
    {
      id: 6,
      "#": 6,
      product: "Women's Handbag",
      price: "$39.95",
      rating: Math.floor(Math.random() * 5) + 1,
      location: "Abuja, Nigeria",
      sold: Math.floor(Math.random() * 100),
      sales: Math.floor(Math.random() * 100),
      Returns: Math.floor(Math.random() * 50),
    },
    {
      id: 7,
      "#": 7,
      product: "Men's T-Shirt",
      price: "$24.99",
      rating: Math.floor(Math.random() * 5) + 1,
      location: "Lagos, Nigeria",
      sold: Math.floor(Math.random() * 100),
      sales: Math.floor(Math.random() * 100),
      Returns: Math.floor(Math.random() * 50),
    },
    {
      id: 8,
      "#": 8,
      product: "Women's Sandals",
      price: "$44.95",
      rating: Math.floor(Math.random() * 5) + 1,
      location: "Abuja, Nigeria",
      sold: Math.floor(Math.random() * 100),
      sales: Math.floor(Math.random() * 100),
      Returns: Math.floor(Math.random() * 50),
    },
    {
      id: 9,
      "#": 9,
      product: "Kids Toy",
      price: "$19.99",
      rating: Math.floor(Math.random() * 5) + 1,
      location: "Lagos, Nigeria",
      sold: Math.floor(Math.random() * 100),
      sales: Math.floor(Math.random() * 100),
      Returns: Math.floor(Math.random() * 50),
    },
  ];

  const columns: GridColDef[] = [
    { field: "#", headerName: "#", width: 30 },
    { field: "product", headerName: "Product name", width: 200 },
    { field: "subcategory", headerName: "Product subcategory", width: 200 },
    { field: "id", headerName: "Order iD", width: 200 },
    { field: "price", headerName: "Price", width: 120 },
    { field: "sold", headerName: "Sold", width: 120 },
    { field: "sales", headerName: "Sales", width: 120 },
  ];
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openSubcategoryModal = () => {
    setIsSubcategoryModalOpen(true);
  };

  const closeSubcategoryModal = () => {
    setIsSubcategoryModalOpen(false);
  };
  const navigate = useNavigate();
  const handleDeleteCategory = async (id: any) => {
    await deleteCategory(id);
    navigate("/");
    closeModal();
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col gap-4 bg-[#F5F5F5]">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <p className="text-[36px] font-bold">
                {categoryDetails?.category}
              </p>
              <div
                className="flex gap-2 items-center text-[#1B7CFC] cursor-pointer"
                onClick={goBack}
              >
                <Icon icon="icon-park-outline:left" />
                <p>Back to products categories</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={openModal}
                className="border border-[#E51B48] bg-[#fff] text-[#E51B48] p-1 px-2 rounded-sm"
              >
                Delete Category
              </button>
              <button
                onClick={openSubcategoryModal}
                className="border border-[#E51B48] bg-[#E51B48] text-[#fff] p-1 px-2 rounded-sm"
              >
                Add Sub-category
              </button>
              <button
                onClick={() => navigate(`./edit`)}
                className="border border-[#E51B48] bg-[#E51B48] text-[#fff] p-1 px-2 rounded-sm"
              >
                Edit Category
              </button>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4 mb-5">
            <Badge badgeData={badgeData} />
          </div>
          <div className="bg-[white] flex flex-col gap-5 flex-1">
            <div className="flex items-center justify-between top-table">
              <p className="flex flex-1 text-black text-xl font-semibold font-['Inter']">
                Top products
              </p>
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
          </div>
          <div className="flex flex-col gap-4 p-3 smm:w-2/3 ">
            <PopUpModal isOpen={isModalOpen} onClose={closeModal}>
              <div className="flex flex-col gap-4 p-3">
                <div className="flex justify-between">
                  <h1>Delete Category</h1>
                </div>
                <div className="flex p-3 gap-5 bg-[#F1F4FF] items-end">
                  <div className="flex-1">
                    <p>{categoryDetails?.category}</p>
                    <small>Created on: {categoryDetails?.created_at}</small>
                  </div>
                  <div className="flex flex-col">
                    <p>{categoryDetails?.sub_categories.length}</p>
                    <small className="text-xs">Sub categories</small>
                  </div>
                  <div className="flex flex-col">
                    <p>102</p>
                    <small className="text-xs">Products</small>
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <button className="w-48 h-10 pt-2.5 pb-3 rounded-sm border text-[#E51B48] text-sm font-medium font-['Inter'] border-[#E51B48] justify-center items-center" onClick={closeModal}>
                    cancel
                  </button>
                  <button
                    className="w-48 h-10 pt-2.5 pb-3 rounded-sm border border-[#E51B48] text-brand-bg text-sm font-medium font-['Inter'] bg-[#E51B48] justify-center items-center"
                    onClick={() => handleDeleteCategory(categoryDetails.id)}
                  >
                    confirm
                  </button>
                </div>
              </div>
            </PopUpModal>
            <PopUpModal
              isOpen={isSubcategoryModalOpen}
              onClose={closeSubcategoryModal}
            >
              <div className="flex flex-col gap-4 p-3">
                <div className="">
                  <h1>Add Sub-Category</h1>
                  <small>Create a new sub-category</small>
                </div>

                <div className="flex p-3 flex-col gap-3 bg-[#F1F4FF]">
                  <div className="flex flex-col flex-1 gap-1">
                    <label htmlFor="CategoryName" className="text-sm">
                      Category Name
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={categoryDetails?.category}
                      className="p-3 border border-[#51515183] rounded-md"
                    />
                  </div>
                  <div className="flex flex-col flex-1 gap-1">
                    <label htmlFor="CategoryName" className="text-sm">
                      Sub-category
                    </label>
                    <input
                      type="text"
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                      className="p-3 border border-[#51515183] rounded-md"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <button className="w-48 h-10 pt-2.5 pb-3 rounded-sm border text-[#E51B48] text-sm font-medium font-['Inter'] border-[#E51B48] justify-center items-center" onClick={closeSubcategoryModal}>
                    Cancel
                  </button>
                  <button
                    className="w-48 h-10 pt-2.5 pb-3 rounded-sm border border-[#E51B48] text-brand-bg text-sm font-medium font-['Inter'] bg-[#E51B48] justify-center items-center"
                    onClick={() => handleDeleteCategory(categoryDetails.id)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </PopUpModal>
          </div>
        </div>
      </Layout>
    </>
  );
}
