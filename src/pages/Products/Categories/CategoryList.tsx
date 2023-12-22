import { useEffect, useState } from "react";
import LayoutComp from "../../../components/Core/LayoutComp";
import Layout from "../../../components/Core/Layout";
import { Rating } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Badge from "../../../components/Products/Badge";
import { Icon } from "@iconify/react";
import TextColorizer from "./ColorText";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PopUpModal from "../../../components/Core/PopUp";
import { deleteCategory } from "../../../Services/categories.service";
import { toast } from "react-toastify";
import { fetchNestedCategories } from "../../../Services/categories.service";
import { getAttributes } from "../../../Services/attribbutes.service";


import { NestedAccordion } from "../../../components/UI/NestedAccordion";

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
interface ColorizedText {
  id: string;
  text: string[];
}
interface FormData {
  title: string;
  parent_category_id: number | null;
  parent_category: string;
  description: string;
  banner: File | null;
  attribute_id: number[];
  status: string;
}
interface Attribute {
  id: number;
  name: string;
}

export default function CategoryList() {

  const initialFormData: FormData = {
    title: "",
    parent_category_id: 0,
    parent_category: "",
    description: "",
    banner: null,
    attribute_id: [],
    status: "",
  }

  const [activeCategory, setActiveCategory] = useState<CategoryData>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);
  const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
  const [categories, setCategories] = useState<any>([]);
  const [nestedCategories, setNestedCategories] = useState<any>([]);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [selectedAttribute, setSelectedAttribute] = useState([]);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [parentColorizedTexts, setParentColorizedTexts] = useState<
    ColorizedText[]
  >([]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
            ? "active"
            : "inactive"
          : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({
      ...formData,
      banner: file,
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setFormData({ ...initialFormData })
    setIsModalOpen(false);
  };

  const openParentModal = () => {
    setIsParentModalOpen(true);
  };

  const closeParentModal = () => {
    setIsParentModalOpen(false);
  };

  const handleCategorySelect = async (category: string, id: number) => {
    if (category.includes('--')) {
      const categ = category.split('- ')
      console.log("Categs: ", categ[1], "id: ", id);
      setFormData({ ...formData, parent_category: categ[1], parent_category_id: id });
      closeParentModal()
    } else {
      setFormData({ ...formData, parent_category: category, parent_category_id: id });
      closeParentModal()
    }

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
    getAttributes()
      .then((response: any) => {
        const attributes: Attribute[] = response?.data?.data?.values?.map(
          (attribute: any, index: number) => {
            return {
              id: attribute.id,
              name: attribute.attribute_name,
            };
          }
        );
        console.log(attributes);

        //const attribute = response.data.data.values
        setAttributes(attributes);
        //console.log(attribute)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("form: ", formData);
    try {
      const formDataObject = new FormData();

      // Append text fields
      formDataObject.append("title", formData.title);
      formDataObject.append(
        "parent_category_id",
        formData.parent_category_id !== 0
          ? String(formData.parent_category_id)
          : "null"
      );
      formDataObject.append("description", formData.description);
      formDataObject.append("status", formData.status);

      // Append file field
      formDataObject.append("banner", formData.banner || ""); // Handle null case

      // Append attribute_ids as an array of strings
      formData.attribute_id.forEach((attributeId, index) => {
        formDataObject.append(`attribute_id[${index}]`, String(attributeId));
      });

      const response = await fetch(
        "https://test.shopazany.com/api/auth/admin/create_category",
        {
          method: "POST",
          body: formDataObject,
        }
      );

      if (response.ok) {
        // Request was successful
        const responseData = await response.json();
        openDoneModal();
        closeModal();
      } else {
        // Request failed
        const errorText = await response.json(); // Get the response text
        console.error("Error submitting form:", errorText);
        closeModal();
        toast.error(errorText.message || "An error occurred", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

    } catch (error) {
      // Handle any network or other errors
      console.error("Error:", error);
      closeModal();
      console.log(error);
      toast.error("An error occurred", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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

  const handleAttributesChange = (attributes: Attribute[]) => {
    console.log(attributes);

    const newAttributeId = attributes.map((attribute, index) => attribute.id)

    setFormData({
      ...formData,
      attribute_id: [...newAttributeId]
    })
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
              <div className="flex justify-between flex-start">
                <h1 className="font-[700] text-xs mt-3">Create Category</h1>
              </div>
              <div className="py-6 w-full px-28 max-h-[70vh] overflow-y-scroll no-scrollbar">
                <form className="flex-col space-y-3 flex-center" action="">
                  <div className="flex-center text-center rounded-[16px] border-[1px] border-[#B3B7BB] w-[372px] h-[54px] align-middle">
                    <input
                      type="text"
                      name="title"
                      className="text-center focus:outline-none border-none w-[90%] font-[700] text-sm text-[#B3B7BB]"
                      placeholder="Title"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div
                    className="flex-center text-center hover:cursor-pointer rounded-[16px] border-[1px] font-[700] text-sm text-[#B3B7BB] border-[#B3B7BB] w-[372px] h-[54px] align-middle"
                    onClick={openParentModal}
                  >
                    {
                      formData.parent_category ? (
                        <span>{formData.parent_category}</span>
                      ) : (
                        <span>Select Parent Category</span>
                      )
                    }
                  </div>
                  <div className="flex-center text-center rounded-[16px] border-[1px] border-[#B3B7BB] w-[372px] h-[54px] align-middle">
                    <input
                      type="text"
                      name="description"
                      className="text-center focus:outline-none border-none w-[90%] font-[700] text-sm text-[#B3B7BB]"
                      placeholder="Description"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col w-full gap-4">
                    <TextColorizer
                      attributes={attributes}
                      onAttributesChange={handleAttributesChange}
                    />
                  </div>
                  <div className="flex-center text-center hover:cursor-pointer rounded-[16px] border-[1px] border-[#B3B7BB] w-[372px] h-[54px] align-middle">
                    <input
                      className="text-center focus:outline-none border-none w-[90%] font-[700] text-sm text-[#B3B7BB]"
                      type="file"
                      accept="image/*"
                      name="banner"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="flex flex-row justify-center space-x-2 text-center align-middle">
                    <p className=" font-[700] text-sm">Status</p>
                    <div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          name="status"
                          checked={formData.status === "active"} // Convert to boolean
                          onChange={handleInputChange}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                  <br />
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
              <div className="flex justify-between w-full flex-start">
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
