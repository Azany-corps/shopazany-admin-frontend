import { useEffect, useState } from "react";
import LayoutComp from "../../../components/Core/LayoutComp";
import Layout from "../../../components/Core/Layout";
import { Rating } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material";
import Badge from "../../../components/Products/Badge";
import { Icon } from "@iconify/react";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PopUpModal from "../../../components/Core/PopUp";
import { deleteCategory } from "../../../Services/categories.service";
import Select from "react-select";
import { Formik, useFormik } from "formik";
// import { deleteCategory } from "../../../services/categories.service";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

//Attribute list
import { getAttributes } from "../../../Services/attribbutes.service";

//select-react
import MultiSelect from "multiselect-react-dropdown";

interface Attribute {
  id: number;
  attribute_name: string;
  items: string[];
  status: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  count_category: number;
}

interface CategoryData {
  id: number;
  category: string;
  //about: string;
  //banner_url: string;
  created_at: string;
  status: any[];
  //updated_at: string;
  //sub_categories: any[];
  //category_attributes: any[];
}

interface Category {
  id: number;
  title: string;
  //parent_category_id?: number | null;
  parent_category_id: string | null;
  subcategories: Category[];
}

interface FormData {
  title: string;
  parent_category_id: string | null;
  business_type: string;
  description: string;
  banner: File | null;
  attribute_id: number[];
  status: string;
}

export default function CategoryList() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    parent_category_id: "" || null,
    business_type: "",
    description: "",
    banner: null,
    attribute_id: [],
    status: "inactive",
  });

  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});

  const [displaySub, setDisplaySub] = useState(false);
  const [displaySubSub, setDisplaySubSub] = useState(false);
  const [displaySubSubSub, setDisplaySubSubSub] = useState(false);
  const [displaySubSubSubSub, setDisplaySubSubSubSub] = useState(false);
  const [displaySubSubSubSubSub, setDisplaySubSubSubSubSub] = useState(false);

  const [subCat, setSubCat] = useState<Category | undefined>(undefined);
  const [subSubCat, setSubSubCat] = useState<Category | undefined>(undefined);
  const [subSubSubCat, setSubSubSubCat] = useState<Category | undefined>(
    undefined
  );
  const [subSubSubSubCat, setSubSubSubSubCat] = useState<Category | undefined>(
    undefined
  );
  const [subSubSubSubSubCat, setSubSubSubSubSubCat] = useState<
    Category | undefined
  >(undefined);

  // Find the selected parent category
  const findSubCategoryById = (
    categoryId: number,
    categories: Category[]
  ): Category | undefined => {
    for (const category of categories) {
      if (category.id === categoryId) {
        return category; // Found the category at the current level
      }
      // Check subcategories recursively
      const foundSubcategory = findSubCategoryById(
        categoryId,
        category.subcategories
      );
      if (foundSubcategory) {
        return foundSubcategory; // Found the category in the subcategories
      }
    }
    // Category with the specified ID not found
    return undefined;
  };

  //level 1
  const handleParentCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategoryId = parseInt(e.target.value, 10);

    console.log(formData);
    setFormData((prevData) => ({
      ...prevData,
      parent_category_id: selectedCategoryId.toString(),
    }));
    console.log(formData);
    setSubCat(findSubCategoryById(selectedCategoryId, parentCategories));
  };

  //level 2
  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = parseInt(e.target.value, 10);

    setFormData((prevData) => ({
      ...prevData,
      parent_category_id: selectedCategoryId.toString(),
    }));
    console.log(formData);

    setSubSubCat(
      findSubCategoryById(selectedCategoryId, parentCategories) as
        | Category
        | undefined
    );
  };

  //level 3
  const handleSubSubCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategoryId = parseInt(e.target.value, 10);

    setFormData((prevData) => ({
      ...prevData,
      parent_category_id: selectedCategoryId.toString(),
    }));
    console.log(formData);
    setSubSubSubCat(findSubCategoryById(selectedCategoryId, parentCategories));
  };

  //level 4
  const handleSubSubSubCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategoryId = parseInt(e.target.value, 10);

    setFormData((prevData) => ({
      ...prevData,
      parent_category_id: selectedCategoryId.toString(),
    }));
    console.log(formData);

    setSubSubSubSubCat(
      findSubCategoryById(selectedCategoryId, parentCategories)
    );
  };

  //level 5
  const handleSubSubSubSubCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategoryId = parseInt(e.target.value, 10);

    setFormData((prevData) => ({
      ...prevData,
      parent_category_id: selectedCategoryId.toString(),
    }));
    console.log(formData);

    setSubSubSubSubSubCat(
      findSubCategoryById(selectedCategoryId, parentCategories)
    );
  };

  //level 6
  const handleSubSubSubSubSubCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategoryId = parseInt(e.target.value, 10);

    setFormData((prevData) => ({
      ...prevData,
      parent_category_id: selectedCategoryId.toString(),
    }));
    console.log(formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target || null;

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

  //handle attributes multiselect
  const handleSelectAttribute = (selectedList: any, selectedItem: any) => {
    if (selectedItem) {
      const selectedIdsList = selectedList.map((item: Attribute) => item.id);
      setSelectedIds(selectedIdsList);
    }
  };

  const handleRemoveAttribute = (selectedList: any, removedItem: any) => {
    if (removedItem) {
      const updatedIdsList = selectedList
        .map((item: Attribute) => item.id)
        .filter((id: number) => id !== removedItem.id);
      setSelectedIds(updatedIdsList);
    }
  };

  const [parentCategories, setParentCategories] = useState<any[]>([]);

  const isFile = (value: any): value is File => value instanceof File;

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};

    // Validate title
    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }

    // Validate description
    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }

    // Validate attribute_id
    // Validate attribute_id
    if (selectedIds.length === 0) {
      //errors.attribute_id = "Please select at least one attribute";
    } else {
      delete errors.attribute_id; // Clear the error if there are selected attributes
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const formDataObject = new FormData();

        // Append text fields
        formDataObject.append("title", formData.title);
        formDataObject.append("description", formData.description);
        formDataObject.append("business_type", formData.business_type);
        formDataObject.append(
          "parent_category_id",
          formData.parent_category_id || ""
        );
        formDataObject.append("status", formData.status);

        // Append file field
        formDataObject.append("banner", formData.banner || ""); // Handle null case

        // Append attribute_ids as an array of strings
        formData.attribute_id.forEach((attributeId) => {
          formDataObject.append("attribute_id", String(attributeId));
        });

        const response = await fetch(
          "https://test.shopazany.com/api/auth/admin/create_category",
          {
            method: "POST",
            body: formDataObject,
          }
        );
        //console.log(response);
        //alert(
          //`Form submitted successfully!\nResponse: ${JSON.stringify(
            //Object.fromEntries(formDataObject.entries()),
            //null,
            //2
          //)}`
        //);
        closeModal();
        openDoneModal();
      } catch (error) {
        // Handle any network or other errors
        console.error("Error:", error);
        console.log(error);
        //alert("Error submitting form. Please try again.");
      }
    }
  };

  //attribute
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [selectedAttribute, setSelectedAttribute] = useState([]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      attribute_id: selectedIds,
    }));
    getCategories();
    getNestedCategories();
    getAttributes()
      .then((response: any) => {
        console.log(JSON.stringify(response.data.data.values));
        //const attribute = response.data.data.values
        setAttributes(response.data.data.values);
        //console.log(attribute)
      })
      .catch((error) => {
        console.log(error);
      });
    if (
      subCat &&
      Array.isArray(subCat.subcategories) &&
      subCat.subcategories.length > 0
    ) {
      setDisplaySub(true);
    } else {
      setDisplaySub(false);
    }
    if (
      subSubCat &&
      Array.isArray(subSubCat.subcategories) &&
      subSubCat.subcategories.length > 0
    ) {
      setDisplaySubSub(true);
    } else {
      setDisplaySubSub(false);
    }
    if (
      subSubSubCat &&
      Array.isArray(subSubSubCat.subcategories) &&
      subSubSubCat.subcategories.length > 0
    ) {
      setDisplaySubSubSub(true);
    } else {
      setDisplaySubSubSub(false);
    }
    if (
      subSubSubSubCat &&
      Array.isArray(subSubSubSubCat.subcategories) &&
      subSubSubSubCat.subcategories.length > 0
    ) {
      setDisplaySubSubSubSub(true);
    } else {
      setDisplaySubSubSubSub(false);
    }
    if (
      subSubSubSubSubCat &&
      Array.isArray(subSubSubSubSubCat.subcategories) &&
      subSubSubSubSubCat.subcategories.length > 0
    ) {
      setDisplaySubSubSubSubSub(true);
    } else {
      setDisplaySubSubSubSubSub(false);
    }
  }, [
    subCat,
    subSubCat,
    subSubSubCat,
    subSubSubSubCat,
    subSubSubSubSubCat,
    selectedIds,
  ]);

  const getCategories = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://test.shopazany.com/api/auth/admin/fetch_all_categories",
      //url: "https://test.shopazany.com/api/auth/admin/store/fetch_store_categories",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        //console.log(JSON.stringify(response.data.categories));
        //setCategories(response.data.categories);
        setCategories(response.data.data.values);
        console.log(response.data.data.values);
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
        console.log(JSON.stringify(response.data.categories));
        setParentCategories(response.data.categories);
        //console.log(response)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [selectedParentCategory, setSelectedParentCategory] =
    useState<Category | null>(null);

  const [selectedParentCategories, setSelectedParentCategories] = useState<
    number[]
  >([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<number[]>(
    []
  );

  const [activeCategory, setActiveCategory] = useState<CategoryData>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
  const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false);
  const [isParentCategoryModalOpen, setIsParentCategoryModalOpen] =
    useState(false);
  const [categories, setCategories] = useState([]);

  //const [parentCategories, setParentCategories] =useState<ParentCategoryData[]>();

  const [subCategoryShow, setSubCategoryShow] = useState(false);
  const [subSubCategoryShow, setSubSubCategoryShow] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  const openDoneModal = () => {
    setIsDoneModalOpen(true);
    setTimeout(() => setIsDoneModalOpen(false), 800);
  };

  const closeDoneModal = () => {
    setTimeout(() => setIsDoneModalOpen(false), 3000);
    //setIsDoneModalOpen(false);
  };

  const openParentCategoryModal = () => {
    setSelectedParentCategory(null);
    setIsParentCategoryModalOpen(true);
  };

  const closeParentCategoryModal = () => {
    setIsParentCategoryModalOpen(false);
  };

  const navigate = useNavigate();

  const customTheme = createTheme();

  const columns: GridColDef[] = [
    { field: "category", headerName: "Category", width: 400 },
    { field: "created_at", headerName: "Date Added", width: 350 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <ThemeProvider theme={customTheme}>
          <div
            className={`flex justify-center items-center rounded-[9px] bg-${
              params.value === "active" ? "green" : "red"
            } w-[60px] h-[21px]`}
          >
            <p
              className={`text-${
                params.value === "active" ? "green" : "red"
              } text-xs font-[600]`}
            >
              {params.value}
            </p>
          </div>
        </ThemeProvider>
      ),
    },
  ];

  const rows: GridRowsProp = categories.map((category: any) => {
    return {
      id: category.id,
      category: category.title,
      created_at: category.created_at.slice(0, 10),
      status: category.status.toLowerCase(),
      onClick: () => navigate(`./${category.id}`),
      // onDelete: null,
    };
  });

  const goBack = () => {
    window.history.back();
  };
  //const handleDeleteCategory = async (id: any) => {
  //console.log("id: ", id);
  //const categoryList = await deleteCategory(id);
  //setCategories(categoryList);
  //closeModal();
  //};

  const [category, setCategory] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  //const [subCategoryData, setSubCategoryData] = useState<SubCategory[]>([]);
  //const [selectedAttributes, setSelectedAttributes] = useState<any[]>([]);
  const [imgFile, setImgFile] = useState<any>("");
  const handleImageChange = async (e: any) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      //setImgUrl(reader.result);
      setImgFile(file);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <LayoutComp title={<Link to="/products/categories">Categories</Link>}>
        <section className="space-y-4">
          <div className="flex flex-row space-x-6 mb-6">
            <div className="flex flex-row bg-[#fff] w-[240px] h-[80px] justify-left text-left p-[15px]  rounded-[17px] space-x-2 align-middle">
              <div className="p-[10px] flex justify-center text-center bg-[#F4F7FE] w-[45px] h-[45px] rounded-full">
                <img src="/images/caticon.svg" />
              </div>
              <div className="p-[5px]">
                <p className="text-[#A3AED0] text-xs">Total Categories</p>
                <p className="font-[700] text-xl">350</p>
              </div>
            </div>

            <div className="flex flex-row bg-[#fff] w-[240px] h-[80px] justify-left text-left p-[15px]  rounded-[17px] space-x-2 align-middle">
              <div className="p-[10px] flex justify-center text-center bg-[#F4F7FE] w-[45px] h-[45px] rounded-full">
                <img src="/images/caticon.svg" />
              </div>
              <div className="p-[5px]">
                <p className="text-[#A3AED0] text-xs">
                  Best Selling Categories
                </p>
                <p className="font-[700] text-xl">350</p>
              </div>
            </div>

            <div className="flex flex-row bg-[#fff] w-[240px] h-[80px] justify-left text-left p-[15px]  rounded-[17px] space-x-2 align-middle">
              <div className="p-[10px] flex justify-center text-center bg-[#F4F7FE] w-[45px] h-[45px] rounded-full">
                <img src="/images/caticon.svg" />
              </div>
              <div className="p-[5px]">
                <p className="text-[#A3AED0] text-xs">
                  Total published category
                </p>
                <p className="font-[700] text-xl">350</p>
              </div>
            </div>

            <div className="flex flex-row bg-[#fff] w-[240px] h-[80px] justify-left text-left p-[15px]  rounded-[17px] space-x-2 align-middle">
              <div className="p-[10px] flex justify-center text-center bg-[#F4F7FE] w-[45px] h-[45px] rounded-full">
                <img src="/images/caticon.svg" />
              </div>
              <div className="p-[5px]">
                <p className="text-[#A3AED0] text-xs">Total Drafted Category</p>
                <p className="font-[700] text-xl">350</p>
              </div>
            </div>
          </div>
          <button
            onClick={openModal}
            className="flex-center text-center rounded-[16px] border-[1px] bg-[#D65D5B] w-[180px] h-[41px] cursor-pointer"
          >
            <p className="font-[500] text-sm text-[#fff]">
              Create a category{" "}
              <span>
                <AddIcon />
              </span>
            </p>
          </button>
          <div className="flex flex-row w-full space-x-10">
            <div className="flex flex-row space-x-2">
              <input
                type="text"
                className="px-3 py-2 border shadow-sm border-slate-300 placeholder-slate-400 focus:border-sky-500 focus:ring-sky-500 block rounded-[16px] sm:text-sm focus:ring-1 text-center focus:outline-none font-[500] text-xs text-[#B3B7BB] bg-[#FAFAFA] w-[240px] h-[41px] align-middle"
                placeholder="Search"
              />
              <button
                onClick={() => {}}
                className="flex-center text-center rounded-[16px] border-[1px] bg-[#D65D5B] w-[80px] h-[41px] cursor-pointer"
              >
                <p className="font-[500] text-xs text-[#fff]">Search</p>
              </button>
            </div>

            {/*Filter*/}
            <div className="flex flex-row space-x-2">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="font-[500] text-sm text-[#B3B7BB] bg-[#FAFAFA] rounded-[16px] w-[240px] h-[41px] inline-flex justify-center gap-x-1.5 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Status
                    <ChevronDownIcon
                      className="-mr-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={`${
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700 "
                            } block px-4 py-2 text-sm`}
                          >
                            Active
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={`${
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700 "
                            } block px-4 py-2 text-sm`}
                          >
                            Inactive
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <button
                onClick={() => {}}
                className="flex-center text-center rounded-[16px] border-[1px] bg-[#D65D5B] w-[80px] h-[41px] cursor-pointer"
              >
                <p className="font-[500] text-xs text-[#fff]">Filter</p>
              </button>
            </div>
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
            <form
              onSubmit={handleSubmit}
              className="w-[550px] h-[580px] pt-14 flex flex-col gap-1 p-3"
            >
              <div className="flex-start flex justify-between">
                <h1 className="font-[700] text-xs mb-3 pl-3">
                  Create Category
                </h1>
              </div>
              <div className="flex-center flex-col space-y-3">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="px-3 py-2 border shadow-sm border-slate-300 placeholder-slate-400 focus:border-sky-500 focus:ring-sky-500 block rounded-[16px] sm:text-sm focus:ring-1 text-center focus:outline-none font-[500] text-xs text-[#B3B7BB] w-[372px] h-[40px] align-middle"
                />
                {formErrors.title && (
                  <span style={{ color: "red" }}>{formErrors.title}</span>
                )}

                <select
                  name="parent_category_id"
                  value={
                    formData.parent_category_id !== null
                      ? formData.parent_category_id
                      : ""
                  }
                  onChange={handleParentCategoryChange}
                  className="px-3 py-2 border shadow-sm border-slate-300 placeholder-slate-400 focus:border-sky-500 focus:ring-sky-500 block rounded-[16px] sm:text-sm focus:ring-1 text-center focus:outline-none font-[500] text-xs text-[#B3B7BB] w-[372px] h-[40px] align-middle"
                >
                  <option value={0}>Select a category</option>
                  {parentCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>

                {subCat && displaySub && (
                  <div>
                    <select
                      name="parent_category_id"
                      value={
                        formData.parent_category_id !== null
                          ? formData.parent_category_id
                          : ""
                      }
                      onChange={handleSubCategoryChange}
                      className="px-3 py-2 border shadow-sm border-slate-300 placeholder-slate-400 focus:border-sky-500 focus:ring-sky-500 block rounded-[16px] sm:text-sm focus:ring-1 text-center focus:outline-none font-[500] text-xs text-[#B3B7BB] w-[372px] h-[40px] align-middle"
                    >
                      <option value={0}>Select a Sub category</option>
                      {subCat.subcategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {subSubCat && displaySubSub && (
                  <div>
                    <select
                      name="parent_category_id"
                      value={
                        formData.parent_category_id !== null
                          ? formData.parent_category_id
                          : ""
                      }
                      onChange={handleSubSubCategoryChange}
                      className="px-3 py-2 border shadow-sm border-slate-300 placeholder-slate-400 focus:border-sky-500 focus:ring-sky-500 block rounded-[16px] sm:text-sm focus:ring-1 text-center focus:outline-none font-[500] text-xs text-[#B3B7BB] w-[372px] h-[40px] align-middle"
                    >
                      <option value={0}>Select a Sub Sub category</option>
                      {subSubCat.subcategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {subSubSubCat && displaySubSubSub && (
                  <div>
                    <select
                      name="parent_category_id"
                      value={
                        formData.parent_category_id !== null
                          ? formData.parent_category_id
                          : ""
                      }
                      onChange={handleSubSubSubCategoryChange}
                      className="px-3 py-2 border shadow-sm border-slate-300 placeholder-slate-400 focus:border-sky-500 focus:ring-sky-500 block rounded-[16px] sm:text-sm focus:ring-1 text-center focus:outline-none font-[500] text-xs text-[#B3B7BB] w-[372px] h-[40px] align-middle"
                    >
                      <option value={0}>Select a Sub Sub Sub category</option>
                      {subSubSubCat.subcategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {subSubSubSubCat && displaySubSubSubSub && (
                  <div>
                    <select
                      name="parent_category_id"
                      value={
                        formData.parent_category_id !== null
                          ? formData.parent_category_id
                          : ""
                      }
                      onChange={handleSubSubSubSubCategoryChange}
                      className="px-3 py-2 border shadow-sm border-slate-300 placeholder-slate-400 focus:border-sky-500 focus:ring-sky-500 block rounded-[16px] sm:text-sm focus:ring-1 text-center focus:outline-none font-[500] text-xs text-[#B3B7BB] w-[372px] h-[40px] align-middle"
                    >
                      <option value={0}>Select a Sub Sub Sub category</option>
                      {subSubSubSubCat.subcategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {subSubSubSubSubCat && displaySubSubSubSubSub && (
                  <div>
                    <select
                      name="parent_category_id"
                      value={
                        formData.parent_category_id !== null
                          ? formData.parent_category_id
                          : ""
                      }
                      onChange={handleSubSubSubSubSubCategoryChange}
                      className="px-3 py-2 border shadow-sm border-slate-300 placeholder-slate-400 focus:border-sky-500 focus:ring-sky-500 block rounded-[16px] sm:text-sm focus:ring-1 text-center focus:outline-none font-[500] text-xs text-[#B3B7BB] w-[372px] h-[40px] align-middle"
                    >
                      <option value={0}>Select a Sub Sub Sub category</option>
                      {subSubSubSubSubCat.subcategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="no-scrollbar px-3 py-2 border shadow-sm border-slate-300 placeholder-slate-400 focus:border-sky-500 focus:ring-sky-500 block rounded-[16px] sm:text-sm focus:ring-1 text-center focus:outline-none font-[500] text-xs text-[#B3B7BB] w-[372px] h-[80px] align-middle"
                />
                {formErrors.description && (
                  <span style={{ color: "red" }}>{formErrors.description}</span>
                )}

                <select
                  name="business_type"
                  value={formData.business_type}
                  onChange={handleInputChange}
                  className="px-3 py-2 border shadow-sm border-slate-300 placeholder-slate-400 focus:border-sky-500 focus:ring-sky-500 block rounded-[16px] sm:text-sm focus:ring-1 text-center focus:outline-none font-[500] text-xs text-[#B3B7BB] w-[372px] h-[40px] align-middle"
                >
                  <option>Select a business type</option>
                  <option value="merchant">Merchant</option>
                  <option value="manufacturer">Manufacturer</option>
                  <option value="seller">Seller</option>
                </select>

                <div className="flex-center text-center rounded-[16px] border-[1px] border-[#B3B7BB] w-[372px] h-[40px] align-middle">
                  <input
                    className="text-center focus:outline-none border-none w-[90%] font-[700] text-sm text-[#B3B7BB]"
                    type="file"
                    accept="image/*"
                    name="banner"
                    onChange={handleFileChange}
                  />
                </div>
                {/*Select attributes*/}
                <MultiSelect
                  options={attributes}
                  selectedValues={selectedIds.map((id) =>
                    attributes.find((item) => item.id === id)
                  )}
                  onSelect={handleSelectAttribute}
                  onRemove={handleRemoveAttribute}
                  displayValue="attribute_name"
                  showCheckbox={true}
                  placeholder="                    Select Attributes"
                  style={{
                    chips: {
                      background: "#D65D5B",
                    },
                    multiselectContainer: {
                      color: "#B3B7BB",
                      width: "372px",
                    },
                    searchBox: {
                      //width: "500px",
                      //height: "10px",
                      //border: "2px",
                      //"border-bottom": "red",
                      //border: 'none',
                      "border-radius": "16px",
                    },
                  }}
                />
                {formErrors.attribute_id && (
                  <span style={{ color: "red" }}>
                    {formErrors.attribute_id}
                  </span>
                )}

                <div className="mt-10 flex flex-row space-x-2 align-middle justify-center text-center">
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
                  type="submit"
                  className="flex-center text-center rounded-[16px] border-[1px] bg-[#D65D5B] w-[267px] h-[54px] cursor-pointer"
                >
                  <p className="mt-1 mb-2 font-[700] text-sm text-[#fff]">
                    Done
                  </p>
                </button>
              </div>
            </form>
          </PopUpModal>
          {/*Done Modal*/}
          <PopUpModal isOpen={isDoneModalOpen} onClose={() => {}}>
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
          {/*Attribute Modal*/}
          {/*Parent Category Modal*/}
        </section>
      </LayoutComp>
    </>
  );
}
