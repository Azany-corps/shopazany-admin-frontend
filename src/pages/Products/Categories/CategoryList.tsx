import { useEffect, useState } from "react";
import LayoutComp from "../../../components/Core/LayoutComp";
import Layout from "../../../components/Core/Layout";
import { Rating } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Badge from "../../../components/Products/Badge";
import { Icon } from "@iconify/react";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PopUpModal from "../../../components/Core/PopUp";
import { deleteCategory } from "../../../Services/categories.service";
// import { deleteCategory } from "../../../services/categories.service";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

//switch
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";

import { MdArrowForwardIos } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

//Accordion
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

//Attribute list
import { getAttributes } from "../../../Services/attribbutes.service";

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

interface ParentCategoryData {
  id: number;
  title: string;
  parent_category_id: number;
  //subcategories: any[];
  //subcategories: any[];
  subcategories: [
    {
      id: number;
      title: string;
      parent_category_id: number;
      subcategories: any[];
    }
  ];
}

interface AttributeData {
  id: number | string;
  attribute_name: string;
  //   about: string;
  //   banner_url: string;
  created_at: string;
  updated_at: string;
  attribute_items: any[];
  category_attributes: any[];
}

interface SubCategory {
  name: string;
  description: string;
}

interface Category {
  id: number;
  title: string;
  parent_category_id?: number | null;
  subcategories?: Category[];
}

interface CategoryListProps {
  categories: Category[];
}

export default function CategoryList() {
  useEffect(() => {
    getCategories();
    getNestedCategories();
    getAttributes()
      .then((response: any) => {
        console.log(JSON.stringify(response.data.data.values));
        setAttributes(response.data.data.values);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 36,
    height: 20,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#000",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#D65D5B" : "#D65D5B",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #000",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 17,
      height: 17,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  const getCategories = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      //url: "https://test.shopazany.com/api/auth/admin/nested-category",
      url: "https://test.shopazany.com/api/auth/admin/store/fetch_store_categories",
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
        //console.log(response)
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

  const [selectedParentCategories, setSelectedParentCategories] = useState<number[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<number[]>([]);

  const [activeCategory, setActiveCategory] = useState<CategoryData>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
  const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false);
  const [isParentCategoryModalOpen, setIsParentCategoryModalOpen] =
    useState(false);
  const [categories, setCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState<any[]>([]);
  //const [parentCategories, setParentCategories] =
  useState<ParentCategoryData[]>();

  //attribute
  const [attributes, setAttributes] = useState<AttributeData[]>([]);

  const [subCategoryShow, setSubCategoryShow] = useState(false);
  const [subSubCategoryShow, setSubSubCategoryShow] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDoneModal = () => {
    setIsDoneModalOpen(true);
    setTimeout(() => setIsDoneModalOpen(false), 800);
  };

  const closeDoneModal = () => {
    setTimeout(() => setIsDoneModalOpen(false), 3000);
    //setIsDoneModalOpen(false);
  };

  const openAttributeModal = () => {
    setIsAttributeModalOpen(true);
  };

  const closeAttributeModal = () => {
    setIsAttributeModalOpen(false);
  };

  const openParentCategoryModal = () => {
    setSelectedParentCategory(null);
    setIsParentCategoryModalOpen(true);
  };

  const closeParentCategoryModal = () => {
    setIsParentCategoryModalOpen(false);
  };

  const navigate = useNavigate();

  const rows: GridRowsProp = categories.map((category: any) => {
    return {
      id: category.id,
      category: category.category,
      product_count: category.sub_categories.length,
      created_at: "12-03-2023",
      //status: "Active",
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
    { field: "product_count", headerName: "Product Count", width: 250 },
    { field: "created_at", headerName: "Date Added", width: 300 },
    {
      field: "status",
      headerName: "Status",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="flex justify-center items-center rounded-[9px] bg-[#1EB56429] w-[60px] h-[21px]">
            <p className="text-[#279F51] text-xs font-[600]">active</p>
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

  const [selectedAttributes, setSelectedAttributes] = useState<any[]>([]);
  const selectAttributeValue = selectedAttributes.join(", ");

  const [category, setCategory] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [subCategoryData, setSubCategoryData] = useState<SubCategory[]>([]);
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
  const handleAddSubCategories = () => {
    const updatedSubCategoryData = [...subCategoryData];
    updatedSubCategoryData.push({ name: "", description: "" });
    setSubCategoryData(updatedSubCategoryData);
  };
  const deleteSubCategoryData = (index: number) => {
    const updatedSubCategoryData = subCategoryData.filter(
      (_, i) => i !== index
    );
    setSubCategoryData(updatedSubCategoryData);
  };

  const handleAttributeSelection = (selectedAttribute: any) => {
    setSelectedAttributes((prevSelectedAttributes) => {
      const attributeIndex = prevSelectedAttributes.findIndex(
        (attr) => attr.id === selectedAttribute.id
      );

      if (attributeIndex !== -1) {
        // Attribute is already selected, remove it
        const updatedAttributes = [...prevSelectedAttributes];
        updatedAttributes.splice(attributeIndex, 1);
        return updatedAttributes;
      } else {
        // Attribute is not selected, add it
        return [...prevSelectedAttributes, selectedAttribute];
      }
    });
  };

  const handleParentCategoryClick = (parentCategoryId: number) => {
    setSelectedParentCategories((prevSelected) =>
      prevSelected.includes(parentCategoryId)
        ? prevSelected.filter((id) => id !== parentCategoryId)
        : [...prevSelected, parentCategoryId]
    );
  };

  const isParentCategorySelected = (parentCategoryId: number) =>
    selectedParentCategories.includes(parentCategoryId);

  const handleSubcategoryClick = (subcategoryId: any) => {
    // Implement logic for handling subcategory click
    // For example, you can update the state to track selected subcategories
  };

  const isSubcategorySelected = (subcategoryId: number) => {
    // Implement logic to check if a subcategory is selected
    // For example, you can check against the state where you store selected subcategories
    return selectedSubcategories.includes(subcategoryId);
  };

  const handleSubmit = (event: any) => {
    event?.preventDefault();
    if (
      category.trim() === "" ||
      categoryDescription.trim() === "" ||
      imgFile === "" ||
      subCategoryData.some((item) => item.name.trim() === "")
    ) {
      // Show a toast error message for validation failure
      toast.error("Please fill in all required fields.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    let data = new FormData();
    data.append("category", category);
    data.append("about", categoryDescription);
    data.append("banner", imgFile);

    subCategoryData.forEach((subCategoryItem, index) => {
      data.append(`sub_category[${index}]`, subCategoryItem.name);
      data.append(`sub_category_about[${index}]`, subCategoryItem.description);
    });

    console.log("attr: ", selectedAttributes);
    selectedAttributes.forEach((attribute, index) => {
      data.append(`attribute_id[${index}]`, attribute.id);
    });

    console.log(data);
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
            <form className="w-[550px] flex flex-col gap-4 p-3">
              <div className="flex-start flex justify-between">
                <h1 className="font-[700] text-xs mt-3 pl-3">
                  Create Category
                </h1>
              </div>
              <div className="flex-center flex-col space-y-3">
                <input
                  type="text"
                  className="px-3 py-2 border shadow-sm border-slate-300 placeholder-slate-400 focus:border-sky-500 focus:ring-sky-500 block rounded-[16px] sm:text-sm focus:ring-1 text-center focus:outline-none font-[500] text-xs text-[#B3B7BB] w-[372px] h-[54px] align-middle"
                  placeholder="Title"
                  value={category}
                  //required={true}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    openParentCategoryModal();
                  }}
                  className="px-3 py-2 border shadow-sm border-slate-300 placeholder-slate-400 focus:border-sky-500 focus:ring-sky-500 block rounded-[16px] sm:text-sm focus:ring-1 text-center focus:outline-none font-[500] text-xs text-[#B3B7BB] w-[372px] h-[54px] align-middle"
                >
                  <p>Select Parent Category</p>
                </button>
                <input
                  type="text"
                  className="px-3 py-2 border shadow-sm border-slate-300 placeholder-slate-400 focus:border-sky-500 focus:ring-sky-500 block rounded-[16px] sm:text-sm focus:ring-1 text-center focus:outline-none font-[500] text-xs text-[#B3B7BB] w-[372px] h-[54px] align-middle"
                  placeholder="Description"
                  //required={true}
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                />
                <div>
                  <button
                    value={selectAttributeValue}
                    onClick={(e) => {
                      e.preventDefault();
                      openAttributeModal();
                    }}
                    className="px-3 py-2 border shadow-sm border-slate-300 placeholder-slate-400 focus:border-sky-500 focus:ring-sky-500 block rounded-[16px] sm:text-sm focus:ring-1 text-center focus:outline-none font-[500] text-xs text-[#B3B7BB] w-[372px] h-[54px] align-middle"
                  >
                    <p>Select Attribute</p>
                  </button>
                  <PopUpModal
                    isOpen={isAttributeModalOpen}
                    onClose={closeAttributeModal}
                  >
                    <div className="w-[374px] h-[366.37px] flex flex-center flex-col gap-1 p-3 ">
                      {attributes?.map((each, index) => (
                        <div
                          key={index}
                          className="w-[350px] h-[34px] bg-[#D0D0D059] justify-start align-middle flex flex-row"
                        >
                          <Checkbox
                            onClick={() => {
                              handleAttributeSelection(each.attribute_name);
                              console.log(selectedAttributes);
                            }}
                            color="default"
                            value={each.attribute_name}
                          />
                          <p className="-ml-10 w-full flex-center font-[500] text-sm">
                            {each.attribute_name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </PopUpModal>
                </div>
                <div className="flex-center text-center rounded-[16px] border-[1px] border-[#B3B7BB] w-[372px] h-[54px] align-middle">
                  <input
                    alt="img"
                    type="file"
                    className="hidden text-center focus:outline-none border-none w-[90%] font-[700] text-sm text-[#B3B7BB]"
                    accept="image/*"
                    //name="logo"
                    //id="logo"
                    //required={true}
                    //onChange={(e) => handleImageChange(e)}
                  />
                  <label
                    htmlFor="files"
                    className="text-center focus:outline-none border-none w-[90%] font-[700] text-sm text-[#B3B7BB]"
                  >
                    Select file
                  </label>
                </div>
                <div className="flex flex-row space-x-2 align-middle justify-center text-center">
                  <p className="p-2 font-[700] text-sm">Status</p>
                  <div>
                    <FormControlLabel
                      control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                      label=""
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <button
                  onClick={(event: any) => {
                    closeModal();
                    openDoneModal();
                    handleSubmit(event);
                  }}
                  className="flex-center text-center rounded-[16px] border-[1px] bg-[#D65D5B] w-[267px] h-[54px] cursor-pointer"
                >
                  <p className="mt-1 font-[700] text-sm text-[#fff]">Done</p>
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
          <PopUpModal
            isOpen={isParentCategoryModalOpen}
            onClose={closeParentCategoryModal}
          >
            <div className="w-[500px] h-[450px] pt-14 flex flex-col gap-1 p-3">
              {parentCategories?.map((category) => (
                <div
                  key={category.id}
                  className={`flex flex-col bg-[#D0D0D059] p-4 rounded-md mb-2 w-[452px] cursor-pointer`}
                >
                  <div
                    className="flex items-center"
                    onClick={() => handleParentCategoryClick(category.id)}
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-indigo-600"
                      checked={isParentCategorySelected(category.id)}
                      readOnly
                    />
                    <span className="ml-2 text-gray-800">{category.title}</span>
                    {category.subcategories.length > 0 && (
                      <MdArrowForwardIos
                        className={`ml-auto text-blue-500 ${
                          isParentCategorySelected(category.id)
                            ? "transform rotate-90"
                            : ""
                        }`}
                      />
                    )}
                  </div>
                  {isParentCategorySelected(category.id) && (
                    <div className="ml-6">
                      {/* Display Subcategories under the selected parent category */}
                      {category.subcategories?.map((subcategory:any) => (
                        <div
                          key={subcategory.id}
                          className={`flex flex-col bg-[#D0D0D059] p-4 rounded-md mb-2 cursor-pointer`}
                        >
                          <div
                            className="flex items-center"
                            onClick={() =>
                              handleSubcategoryClick(subcategory.id)
                            }
                          >
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-indigo-600"
                              // Handle subcategory selection logic if needed
                            />
                            <span className="ml-2 text-gray-800">
                              {subcategory.title}
                            </span>
                            {subcategory.subcategories.length > 0 && (
                              <MdArrowForwardIos
                                className={`ml-auto text-blue-500 ${
                                  isSubcategorySelected(subcategory.id)
                                    ? "transform rotate-90"
                                    : ""
                                }`}
                              />
                            )}
                          </div>
                          {isSubcategorySelected(subcategory.id) && (
                            <div className="ml-6">
                              {/* Display nested subcategories under the selected subcategory */}
                              {subcategory.subcategories.map(
                                (nestedSubcategory: any) => (
                                  <div
                                    key={nestedSubcategory.id}
                                    className="flex items-center bg-[#D0D0D059] p-4 rounded-md mb-2 cursor-pointer"
                                  >
                                    <div className="flex items-center">
                                      <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-indigo-600"
                                        // Handle nested subcategory selection logic if needed
                                      />
                                      <span className="ml-2 text-gray-800">
                                        {nestedSubcategory.title}
                                      </span>
                                    </div>
                                    {/* Add an icon or indicator for nested subcategories if needed */}
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </PopUpModal>
        </section>
      </LayoutComp>
    </>
  );
}
