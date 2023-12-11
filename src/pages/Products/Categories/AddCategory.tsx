import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getAttributes } from "../../../Services/attribbutes.service";
import LayoutComp from "../../../components/Core/LayoutComp";

import { deleteCategory } from "../../../Services/categories.service";

import PopUpModal from "../../../components/Core/PopUp";

//select-react
import MultiSelect from "multiselect-react-dropdown";

interface SubCategory {
  name: string;
  description: string;
}

interface FormData {
  title: string;
  //parent_category_id: string | null;
  description: string;
  banner: File | null;
  //attribute_id: number[];
  status: string;
}

interface DeleteButtonProps {
  categoryId: number | string; // Assuming categoryId is a string, update the type accordingly
}

export default function AddCategory() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const data = [
    {
      image: "/images/tel.png",
      title: "Televisions",
    },
    {
      image: "/images/tel.png",
      title: "Camera",
    },
    {
      image: "/images/tel.png",
      title: "Home Theater",
    },
    {
      image: "/images/tel.png",
      title: "Eletric Iron",
    },
  ];

  const [categoryDetails, setCategoryDetails] = useState<any>(undefined);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    banner: null,
    status: "",
  });

  const [checkboxStatus, setCheckboxStatus] = useState<boolean>(false);

  const fetchCategoryDetails = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url:
        "https://test.shopazany.com/api/auth/admin/show-category/" + categoryId,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data.category);
        setCategoryDetails(response.data.category);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const { categoryId } = useParams();

  useEffect(() => {
    fetchCategoryDetails();
  }, [categoryId]);

  useEffect(() => {
    if (categoryDetails) {
      setFormData({
        title: categoryDetails.title || "",
        description: categoryDetails.description || "",
        banner: categoryDetails.image || null,
        status: categoryDetails.status.toLowerCase() || "",
      });
    }
  }, [categoryDetails]);

  useEffect(() => {
    if (
      categoryDetails?.status &&
      categoryDetails.status.toLowerCase() === "active"
    ) {
      setCheckboxStatus(true);
    }
  }, [categoryDetails]);

  const goBack = () => {
    window.history.back();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);

  const [attributes, setAttributes] = useState([]);
  const [category, setCategory] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [subCategoryData, setSubCategoryData] = useState<SubCategory[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<any[]>([]);

  const [imgFile, setImgFile] = useState<any>("");
  const navigate = useNavigate();
  const handleImageChange = async (e: any) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setImgFile(file);
    };

    reader.readAsDataURL(file);
  };

  const deleteSubCategoryData = (index: number) => {
    const updatedSubCategoryData = subCategoryData.filter(
      (_, i) => i !== index
    );
    setSubCategoryData(updatedSubCategoryData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formDataObject = new FormData();

      // Append pre-filled values from categoryDetails
      //formDataObject.append("title", categoryDetails?.title || "");
      //formDataObject.append("description", categoryDetails?.description || "");
      //formDataObject.append("status", categoryDetails?.status || "");

      // Append edited or new values from the form
      formDataObject.append("title", formData.title || "");
      formDataObject.append("description", formData.description || "");
      formDataObject.append("status", formData.status || "");

      // Append file field
      formDataObject.append("banner", formData.banner || ""); // Handle null case


      await axios.put(
        `https://test.shopazany.com/auth/admin/update_category/${categoryId}`,
        formDataObject,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(
        `Form submitted successfully!\nResponse: ${JSON.stringify(
          formData,
          null,
          2
        )}`
      );

      closeModal();
      openDoneModal();
    } catch (error) {
      // Handle any network or other errors
      console.error("Error:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  const handleCheckboxChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = e.target.checked;
    setCheckboxStatus(isChecked);

    try {
      const formDataObject = new FormData();

      // Append pre-filled values from categoryDetails
      formDataObject.append("title", categoryDetails?.title || "");
      formDataObject.append("description", categoryDetails?.description || "");

      // Append checkbox status
      formDataObject.append("status", isChecked ? "active" : "inactive");

      // Append file field
      formDataObject.append("banner", categoryDetails?.image || ""); // Handle null case

      // Perform any other necessary actions
      const response = await fetch(
        `https://test.shopazany.com/auth/admin/update_category/${categoryId}`,
        {
          method: "UPDATE",
          body: formDataObject,
        }
      );

      alert(
        `Checkbox Form submitted successfully!\nResponse: ${JSON.stringify(
          Object.fromEntries(formDataObject.entries()),
          null,
          2
        )}`
      );

      window.location.reload();
    } catch (error) {
      // Handle any network or other errors
      console.error("Error:", error);
      alert("Error submitting checkbox form. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      // Construct the API URL with the categoryId
      const apiUrl = `https://test.shopazany.com/auth/admin/delete_category/${categoryId}`;

      // Make a DELETE request to delete the category
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "multipart/form-data",
          // You can add additional headers if needed
        },
        // You can include a request body if required by your API
        // body: JSON.stringify({}),
      });

      if (response.ok) {
        // The category was successfully deleted
        console.log("Category deleted successfully");
        console.log(response);
        alert("Form submitted successfully!\nResponse");
        navigate("/");
        // Add any additional logic you need after successful deletion
      } else {
        // Handle errors, display an error message, etc.
        console.error("Error deleting category. Status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred during the delete request:", error);
    }
  };

  const handleDeleteCategory = async (id: any) => {
    await deleteCategory(id);
    openDoneModal();
    navigate("/products/categories");
  };

  //Edit Modal
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

  return (
    <>
      <LayoutComp
        title={
          <div>
            <Link to="/products/categories">Categories</Link>
            <span>&lt;</span>
            <Link to=""> {categoryDetails?.title}</Link>
          </div>
        }
      >
        <section className="rounded-lg bg-[#fff] py-3">
          <div className="flex-end mr-4">
            <button
              onClick={openModal}
              className="p-2 rounded-[9px] bg-[#D0D0D059] flex flex-row space-x-2"
            >
              <p className="font-[700] text-base">Edit</p>
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <path
                    d="M3.63464 21.615V25.2981C3.63464 25.6373 3.90118 25.9039 4.24041 25.9039H7.92349C8.08099 25.9039 8.23849 25.8433 8.34753 25.7221L21.5775 12.5042L17.0343 7.96097L3.81637 21.1789C3.69522 21.3 3.63464 21.4454 3.63464 21.615ZM25.091 8.99078C25.2033 8.87869 25.2924 8.74556 25.3532 8.599C25.414 8.45243 25.4453 8.29532 25.4453 8.13664C25.4453 7.97797 25.414 7.82085 25.3532 7.67429C25.2924 7.52773 25.2033 7.39459 25.091 7.28251L22.256 4.44751C22.1439 4.33519 22.0108 4.24609 21.8642 4.18529C21.7176 4.12449 21.5605 4.0932 21.4019 4.0932C21.2432 4.0932 21.0861 4.12449 20.9395 4.18529C20.7929 4.24609 20.6598 4.33519 20.5477 4.44751L18.3306 6.66462L22.8739 11.2079L25.091 8.99078Z"
                    fill="#279F51"
                  />
                </svg>
              </div>
            </button>
          </div>
          <div className="flex-center flex-col space-y-2">
            <div className="flex justify-center text-center">
              <img
                src="/images/cat_pic.svg"
                /*categoryDetails?.image*/ alt="image"
              />
            </div>
            <p className="font-[400] text-lg text-[#B3B7BB]">Category name</p>
            <p className="font-[700] text-lg text-[#231F20]">
              {categoryDetails?.title}
            </p>
            <div className="flex-row space-x-5 flex-center">
              <div className="flex-center bg-[#231F20] w-[150px] h-[43px] rounded-[30px] text-[#fff] text-sm">
                <div className="px-10 flex flex-center space-x-5 flex-row">
                  <p className="ml-3">Delist</p>
                  <div className="flex-end">
                    <label className="switch">
                      <input
                        type="checkbox"
                        name="status"
                        checked={checkboxStatus}
                        onChange={handleCheckboxChange}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>
              <button
                //onClick={() => handleDeleteCategory(categoryDetails?.id)}
                onClick={handleDelete}
                className="bg-[#D65D5B] w-[150px] h-[43px] rounded-[30px] text-[#fff] text-sm"
              >
                Delete
              </button>
            </div>

            <div className="flex flex-row space-x-36">
              <div className="flex flex-col flex-center">
                <div className="rounded-[50%] bg-[#D0D0D059] w-[49px] h-[49px] flex-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                  >
                    <path
                      d="M17.5 7V14.5C17.5001 15.1347 17.2588 15.7457 16.825 16.209C16.3912 16.6724 15.7974 16.9534 15.164 16.995L15 17H6C5.36528 17.0001 4.75429 16.7588 4.29095 16.325C3.82762 15.8912 3.54664 15.2974 3.505 14.664L3.5 14.5V7H17.5ZM12.016 8.234C11.486 8.234 11.063 8.376 10.751 8.66C10.438 8.944 10.282 9.328 10.282 9.812C10.282 10.092 10.353 10.339 10.495 10.557C10.637 10.774 10.83 10.945 11.075 11.07C10.783 11.2 10.557 11.387 10.395 11.629C10.2335 11.8717 10.1491 12.1575 10.153 12.449C10.153 12.947 10.323 13.342 10.663 13.637C11.003 13.931 11.455 14.078 12.02 14.078C12.583 14.078 13.033 13.932 13.372 13.638C13.71 13.346 13.88 12.949 13.88 12.449C13.88 12.147 13.8 11.876 13.64 11.637C13.4686 11.3878 13.231 11.1914 12.954 11.07C13.1914 10.954 13.3936 10.7769 13.54 10.557C13.683 10.339 13.755 10.091 13.755 9.812C13.755 9.328 13.598 8.944 13.285 8.66C12.973 8.376 12.55 8.234 12.016 8.234ZM8.996 8.293H8.875L6.656 9.109V9.91L8.051 9.434V14H8.996V8.293ZM12.012 11.461C12.289 11.461 12.51 11.547 12.678 11.721C12.846 11.894 12.93 12.121 12.93 12.402C12.93 12.692 12.85 12.917 12.69 13.078C12.53 13.24 12.307 13.32 12.02 13.32C11.734 13.32 11.51 13.237 11.347 13.07C11.184 12.904 11.102 12.681 11.102 12.402C11.102 12.118 11.185 11.891 11.35 11.719C11.516 11.547 11.736 11.461 12.012 11.461ZM12.016 8.996C12.1242 8.9912 12.2321 9.0102 12.3322 9.05167C12.4322 9.09314 12.5219 9.15606 12.595 9.236C12.738 9.396 12.809 9.6 12.809 9.848C12.809 10.108 12.739 10.315 12.597 10.468C12.455 10.622 12.262 10.699 12.02 10.699C11.778 10.699 11.586 10.622 11.444 10.469C11.302 10.315 11.231 10.109 11.231 9.848C11.231 9.585 11.301 9.377 11.442 9.225C11.582 9.072 11.774 8.996 12.016 8.996ZM15 3C15.6347 2.9999 16.2457 3.24123 16.709 3.67504C17.1724 4.10885 17.4534 4.70265 17.495 5.336L17.5 5.5V6H3.5V5.5C3.4999 4.86528 3.74123 4.25429 4.17504 3.79095C4.60885 3.32762 5.20265 3.04664 5.836 3.005L6 3H15Z"
                      fill="#DD7876"
                    />
                  </svg>
                </div>
                <p className="text-[#B3B7BB] text-sm">Date added</p>
                <p className="text-base font-[700] w-[120px] text-center">
                  {categoryDetails?.created_at.slice(0, 10)}
                </p>
              </div>
              <div className="flex flex-col flex-center">
                <div className="rounded-[50%] bg-[#D0D0D059] w-[49px] h-[49px] flex-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                  >
                    <path
                      d="M10.7628 2.43042V5.49179C10.7628 5.91447 11.1055 6.25713 11.5282 6.25713H14.5895"
                      stroke="#0F60FF"
                      stroke-width="1.46111"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.0589 16.2066H5.40544C4.56007 16.2066 3.87476 15.5213 3.87476 14.6759V3.9611C3.87476 3.11573 4.56007 2.43042 5.40544 2.43042H10.7628L14.5895 6.25713V14.6759C14.5895 15.5213 13.9042 16.2066 13.0589 16.2066Z"
                      stroke="#0F60FF"
                      stroke-width="1.46111"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.93591 7.02244H7.70125"
                      stroke="#0F60FF"
                      stroke-width="1.46111"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.93591 10.0838H11.528"
                      stroke="#0F60FF"
                      stroke-width="1.46111"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.93591 13.1452H11.528"
                      stroke="#0F60FF"
                      stroke-width="1.46111"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-[#B3B7BB] text-sm">Sub categories</p>
                <p className="text-base font-[700] w-[120px] text-center">
                  {categoryDetails?.subcategories.length}
                </p>
              </div>
              <div className="flex flex-col flex-center">
                <div className="rounded-[50%] bg-[#D0D0D059] w-[49px] h-[49px] flex-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                  >
                    <path
                      d="M17.5 7V14.5C17.5001 15.1347 17.2588 15.7457 16.825 16.209C16.3912 16.6724 15.7974 16.9534 15.164 16.995L15 17H6C5.36528 17.0001 4.75429 16.7588 4.29095 16.325C3.82762 15.8912 3.54664 15.2974 3.505 14.664L3.5 14.5V7H17.5ZM12.016 8.234C11.486 8.234 11.063 8.376 10.751 8.66C10.438 8.944 10.282 9.328 10.282 9.812C10.282 10.092 10.353 10.339 10.495 10.557C10.637 10.774 10.83 10.945 11.075 11.07C10.783 11.2 10.557 11.387 10.395 11.629C10.2335 11.8717 10.1491 12.1575 10.153 12.449C10.153 12.947 10.323 13.342 10.663 13.637C11.003 13.931 11.455 14.078 12.02 14.078C12.583 14.078 13.033 13.932 13.372 13.638C13.71 13.346 13.88 12.949 13.88 12.449C13.88 12.147 13.8 11.876 13.64 11.637C13.4686 11.3878 13.231 11.1914 12.954 11.07C13.1914 10.954 13.3936 10.7769 13.54 10.557C13.683 10.339 13.755 10.091 13.755 9.812C13.755 9.328 13.598 8.944 13.285 8.66C12.973 8.376 12.55 8.234 12.016 8.234ZM8.996 8.293H8.875L6.656 9.109V9.91L8.051 9.434V14H8.996V8.293ZM12.012 11.461C12.289 11.461 12.51 11.547 12.678 11.721C12.846 11.894 12.93 12.121 12.93 12.402C12.93 12.692 12.85 12.917 12.69 13.078C12.53 13.24 12.307 13.32 12.02 13.32C11.734 13.32 11.51 13.237 11.347 13.07C11.184 12.904 11.102 12.681 11.102 12.402C11.102 12.118 11.185 11.891 11.35 11.719C11.516 11.547 11.736 11.461 12.012 11.461ZM12.016 8.996C12.1242 8.9912 12.2321 9.0102 12.3322 9.05167C12.4322 9.09314 12.5219 9.15606 12.595 9.236C12.738 9.396 12.809 9.6 12.809 9.848C12.809 10.108 12.739 10.315 12.597 10.468C12.455 10.622 12.262 10.699 12.02 10.699C11.778 10.699 11.586 10.622 11.444 10.469C11.302 10.315 11.231 10.109 11.231 9.848C11.231 9.585 11.301 9.377 11.442 9.225C11.582 9.072 11.774 8.996 12.016 8.996ZM15 3C15.6347 2.9999 16.2457 3.24123 16.709 3.67504C17.1724 4.10885 17.4534 4.70265 17.495 5.336L17.5 5.5V6H3.5V5.5C3.4999 4.86528 3.74123 4.25429 4.17504 3.79095C4.60885 3.32762 5.20265 3.04664 5.836 3.005L6 3H15Z"
                      fill="#DD7876"
                    />
                  </svg>
                </div>
                <p className="text-[#B3B7BB] text-sm">Attributes</p>
                <p className="text-base font-[700] w-[120px] text-center">06</p>
              </div>
            </div>

            <p className="font-[700]">Description</p>
            <p className="text-[#B3B7BB] text-xs w-[300px] text-center">
              {categoryDetails?.description}
            </p>

            <div className="px-8 w-full flex flex-col space-y-3">
              {data.map((each, index) => (
                <div className="flex flex-row p-4 bg-[#D0D0D059] rounded-[17px;] items-center">
                  <div>
                    <img src={each.image} alt="" />
                  </div>
                  <p className="font-[700] text-base ml-4 mr-auto">
                    {each.title}
                  </p>
                  <div className="flex-center rounded-full bg-[#F7DFDE] w-[39px] h-[39px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M4.72606 14.2661C4.72606 15.0734 5.38654 15.7338 6.1938 15.7338H12.0648C12.872 15.7338 13.5325 15.0734 13.5325 14.2661V5.45965H4.72606V14.2661ZM14.2664 3.25804H11.6978L10.964 2.52417H7.29461L6.56074 3.25804H3.99219V4.72578H14.2664V3.25804Z"
                        fill="#D65D5B"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/*Modal*/}

          <PopUpModal isOpen={isModalOpen} onClose={closeModal}>
            <form
              onSubmit={handleSubmit}
              className="w-[550px] h-[500px] pt-14 flex flex-col gap-1 p-3"
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

                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="no-scrollbar px-3 py-2 border shadow-sm border-slate-300 placeholder-slate-400 focus:border-sky-500 focus:ring-sky-500 block rounded-[16px] sm:text-sm focus:ring-1 text-center focus:outline-none font-[500] text-xs text-[#B3B7BB] w-[372px] h-[80px] align-middle"
                />

                <div className="flex-center text-center rounded-[16px] border-[1px] border-[#B3B7BB] w-[372px] h-[40px] align-middle">
                  <input
                    className="text-center focus:outline-none border-none w-[90%] font-[700] text-sm text-[#B3B7BB]"
                    type="file"
                    accept="image/*"
                    name="banner"
                    //onChange={handleFileChange}
                  />
                </div>
                {/*Select attributes*/}

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
        </section>
      </LayoutComp>
    </>
  );
}
