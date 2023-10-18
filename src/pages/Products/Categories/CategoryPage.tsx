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

interface SubCategory {
  name: string;
  description: string;
  about?: string;
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


  const handleImageChange = async (e: any) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setImgUrl(reader.result);
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

    console.log('data: ', data.values)
    

    subCategoryData.forEach((subCategoryItem, index) => {
      data.append(`sub_category_id[${index}]`, (8 + index).toString())
      data.append(`sub_category[${index}]`, subCategoryItem.name);
      data.append(`sub_category_about[${index}]`, subCategoryItem.description);
    });
    selectedAttributes.forEach((attribute, index) => {
      data.append(`category_attr_id[${index}]`, (8 + index).toString())
      data.append(`attribute_id[${index}]`, attribute.id);
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://test.shopazany.com/api/auth/admin/store/update_store_category/" + categoryId,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        navigate("/products/categories");
      })
      .catch((error) => {
        toast.error(error?.response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(error);
      });
  };

  const handleSubCategoryChange = (
    index: number,
    fieldName: keyof SubCategory,
    value: string
  ) => {
    const updatedSubCategoryData = [...subCategoryData];
    updatedSubCategoryData[index][fieldName] = value;
    setSubCategoryData(updatedSubCategoryData);
  };
  // useEffect(() => {
  //   getAttributes().then((response) =>
  //     setAttributes(response.data.data.values)
  //   );
  // }, []);

  const handleAttributeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    attribute: any
  ) => {
    const checked = event.target.checked;
    const attributeId = attribute.id;
    if (checked) {
      setSelectedAttributes((prevSelectedAttributes) => [
        ...prevSelectedAttributes,
        attribute,
      ]);
    } else {
      setSelectedAttributes((prevSelectedAttributes) =>
        prevSelectedAttributes.filter((attr) => attr.id !== attributeId)
      );
    }
  };



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
            </div>
          </div>
          <div className="flex flex-row items-center gap-4 mb-5">
            <Badge badgeData={badgeData} />
          </div>
          <div className="bg-[white] flex flex-col gap-5 flex-1">
            <div className="flex flex-col justify-between gap-4 item-center top-table">
              <div className="flex">
                <p className="flex flex-1 text-black text-xl font-semibold font-['Inter']">
                  Categories Details
                </p>
                <button
                  onClick={(event: any) => handleSubmit(event)}
                  className="border border-[#E51B48] bg-[#E51B48] text-[#fff] p-1 px-2 rounded-sm"
                >
                  Update Categories
                </button>
              </div>
              <form>
                <div className="flex gap-6">
                  <div className="flex flex-col gap-4 w-[90%] lgm:w-[60%]">
                    <div className="flex flex-row items-end gap-4">
                      <div className="flex flex-col flex-1">
                        <label htmlFor="image">Category Image</label>
                        <div
                          className="rounded-lg w-full h-[200px] bg-cover bg-center"
                          style={{ backgroundImage: `url(${imgUrl})` }}
                        ></div>
                      </div>
                      <label htmlFor="logo" className="rounded-full cursor-pointer ">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          name="logo"
                          id="logo"
                          required={true}
                          onChange={(e) => handleImageChange(e)}
                        />
                        <div className="flex justify-center ">
                          <div className="border border-[#505050] bg-[#505050] text-[#fff] p-1 px-2 rounded-sm">
                            change
                          </div>
                        </div>
                      </label>
                    </div>
                    <div className="flex flex-col gap-4 p-3 shadow-md">
                      <div className="flex flex-col gap-1 form-group">
                        <label htmlFor="category">Category</label>
                        <input
                          className="p-3 border border-[#51515183] rounded-md"
                          type="text"
                          placeholder="Enter category name"
                          value={category}
                          required={true}
                          onChange={(e) => setCategory(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-1 form-group">
                        <label htmlFor="category-description">
                          Category Description
                        </label>
                        <textarea
                          className="p-3 border border-[#51515183] rounded-md"
                          rows={6}
                          required={true}
                          placeholder="Enter category description"
                          value={categoryDescription}
                          onChange={(e) => setCategoryDescription(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <p className="text-[32px] font-semibold">
                        Add Sub Category (optional)
                      </p>
                      {subCategoryData.length > 0 ? (
                        subCategoryData.map((item, index) => (
                          <div key={index} className="p-3 rounded-md shadow-md">
                            <div className="flex flex-col gap-1 form-group">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm  font-medium font-['Inter']">
                                    {index + 1}
                                  </p>
                                  <label htmlFor={`sub-category-name-${index}`}>
                                    Sub-category Name
                                  </label>
                                </div>
                                <p
                                  className="text-base font-medium font-['Inter'] text-[#E51B48] cursor-pointer"
                                  onClick={() => deleteSubCategoryData(index)}
                                >
                                  Remove
                                </p>
                              </div>
                              <input
                                required
                                id={`sub-category-name-${index}`}
                                className="p-3 border border-[#51515183] rounded-md"
                                type="text"
                                placeholder="Enter sub-category name"
                                value={item.name}
                                onChange={(e) =>
                                  handleSubCategoryChange(
                                    index,
                                    "name",
                                    e.target.value
                                  )
                                }
                              />
                            </div>

                            <div className="flex flex-col gap-1 form-group">
                              <label htmlFor={`sub-category-description-${index}`}>
                                Sub-category Description
                              </label>
                              <textarea
                                id={`sub-category-description-${index}`}
                                className="p-3 border border-[#51515183] rounded-md"
                                rows={6}
                                required
                                placeholder="Enter sub-category description"
                                value={item.about}
                                onChange={(e) =>
                                  handleSubCategoryChange(
                                    index,
                                    "description",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="w-full text-center my-6 text-[#8E8E8E] text-2xl font-normal font-['Inter']">
                          Sub Categories will
                          <br /> appear here
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        className="border border-[#E51B48] bg-[#E51B48] text-[#fff] p-3 px-4 rounded-sm"
                        onClick={handleAddSubCategories}
                      >
                        Add Sub Categories
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 gap-4">
                    <p className="text-[32px] font-semibold">Add Product Attribute</p>
                    <div className="relative flex flex-wrap w-full gap-1 p-2 overflow-scroll bg-white border rounded-lg h-44 border-stone-300">
                      {selectedAttributes?.length > 0 ? (
                        selectedAttributes.map((selectedAttribute, index) => (
                          <div
                            className="flex items-center p-1 rounded-md bg-brand-light-blue h-fit"
                            key={index}
                          >
                            <span className="mr-1 text-sm">
                              {selectedAttribute.attribute_name}
                            </span>
                            <span
                              className="p-1 cursor-pointer"
                              onClick={() => {
                                const updatedItems = selectedAttributes.filter(
                                  (attribute: any, i: number) =>
                                    attribute.id !== selectedAttribute.id
                                );
                                setSelectedAttributes(updatedItems);
                              }}
                            >
                              x
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="items-center justify-center flex-1 w-full h-full">
                          <p className="text-center text-neutral-400 text-base font-normal font-['Inter']">
                            {"Attributes will appear here"}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 p-3 rounded-md shadow-md">
                      <div className="flex flex-col gap-1 form-group ">
                        <label htmlFor="attributeList"> Product Attributes</label>
                        <input
                          type="search"
                          name="attributeList"
                          className="p-3 border border-[#51515183] rounded-md"
                          id="attributeList"
                        />
                      </div>
                      <div className="flex flex-col items-start flex-1 gap-2">
                        {attributes &&
                          attributes.map((attribute: any) => (
                            <div
                              className="flex items-center gap-2"
                              key={attribute.id}
                            >
                              <Checkbox
                                value={attribute.id}
                                // checked={selectedAttributes.includes(
                                //   (selectedAttribute:any) =>
                                //     selectedAttribute.id === attribute.id
                                // )}
                                onChange={(event) =>
                                  handleAttributeChange(event, {
                                    id: attribute.id,
                                    attribute_name: attribute.attribute_name,
                                  })
                                }
                              />
                              <span>{attribute.attribute_name}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
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
