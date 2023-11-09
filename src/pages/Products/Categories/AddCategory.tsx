import { useEffect, useState } from "react";
import Layout from "../../../components/Core/Layout";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Checkbox } from "@mui/material";
import { getAttributes } from "../../../Services/attribbutes.service";
import LayoutComp from "../../../components/Core/LayoutComp";

//switch
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";


//edit modal


interface SubCategory {
  name: string;
  description: string;
}

export default function AddCategory() {
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

  const goBack = () => {
    window.history.back();
  };
  const [attributes, setAttributes] = useState([]);
  const [category, setCategory] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [subCategoryData, setSubCategoryData] = useState<SubCategory[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<any[]>([]);
  const [imgUrl, setImgUrl] = useState<any>(
    "https://img.freepik.com/free-photo/bunch-black-friday-gifts-golden-shopping-cart-with-copy-space_23-2148667040.jpg?w=1480&t=st=1695914954~exp=1695915554~hmac=dd699f3b1464daf0ef8135b0142b87174f8af4d359170d2efc997d8ec908c2e3"
  );
  const [imgFile, setImgFile] = useState<any>("");
  const navigate = useNavigate();
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

    subCategoryData.forEach((subCategoryItem, index) => {
      data.append(`sub_category[${index}]`, subCategoryItem.name);
      data.append(`sub_category_about[${index}]`, subCategoryItem.description);
    });

    console.log("attr: ", selectedAttributes);
    selectedAttributes.forEach((attribute, index) => {
      data.append(`attribute_id[${index}]`, attribute.id);
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://test.shopazany.com/api/auth/admin/store/create_store_category",
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

  return (
    <>
      <LayoutComp>
        <section className="rounded-lg bg-[#fff] py-3">
          <div className="flex-end mr-4">
            <button className="p-2 rounded-[9px] bg-[#D0D0D059] flex flex-row space-x-2">
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
              <img src="/images/cat_pic.svg" alt="image" />
            </div>
            <p className="font-[400] text-lg text-[#B3B7BB]">Category name</p>
            <p className="font-[700] text-lg text-[#231F20]">Electronics</p>
            <div className="flex-row space-x-5 flex-center">
              <div className="flex-center bg-[#231F20] w-[150px] h-[43px] rounded-[30px] text-[#fff] text-sm">
                <div className="px-10 flex flex-center space-x-5 flex-row">
                  <p className="ml-3">Delist</p>
                  <div className="flex-end">
                    <FormControlLabel
                      control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                      label=""
                      onChange={()=>{}}
                    />
                  </div>
                </div>
              </div>
              <button className="bg-[#D65D5B] w-[150px] h-[43px] rounded-[30px] text-[#fff] text-sm">
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
                  02-11-2023
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
                <p className="text-base font-[700] w-[120px] text-center">07</p>
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
              This is the description accompanied by this current category at
              this very point, bla bla bla bla bla bla bla bla bla bla bla bla
              bla bla bla
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
        </section>
      </LayoutComp>
      {/*<Layout>
        <form className="flex flex-col gap-4 bg-[#F5F5F5]">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <p className="text-[36px] font-bold">Add New Category</p>
              <div
                className="flex gap-2 items-center text-[#1B7CFC] cursor-pointer"
                onClick={goBack}
              >
                <Icon icon="icon-park-outline:left" />
                <p>Back to Products</p>
              </div>
            </div>
            <button
              onClick={(event: any) => handleSubmit(event)}
              className="border border-[#E51B48] bg-[#E51B48] text-[#fff] p-1 px-2 rounded-sm"
            >
              Add Categories
            </button>
          </div>
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
                          value={item.description}
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
      </Layout>*/}
    </>
  );
}
