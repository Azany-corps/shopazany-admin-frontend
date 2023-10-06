import { useEffect, useState } from "react";
import Layout from "../../../components/Core/Layout";
import { Icon } from "@iconify/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

interface SubCategory {
  name: string;
  about: string;
  
}

export default function EditCategory() {
  const goBack = () => {
    window.history.back();
  };

  const [category, setCategory] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [subCategoryData, setSubCategoryData] = useState<any[]>([]);
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
   const fetchCategoryDetails = () => {
     let config = {
       method: "get",
       maxBodyLength: Infinity,
       url: "https://test.shopazany.com/api/auth/admin/store/view_store_category/5",
       headers: {
         authorization: `Bearer ${localStorage.getItem("token")}`,
       },
     };

     axios
       .request(config)
       .then((response) => {
         console.log(JSON.stringify(response.data));
         setSubCategoryData(response.data.data.values[0])
         setCategory(response.data.data.values[0].category);
         setCategoryDescription(response.data.data.values[0].about);
         setSubCategoryData(response.data.data.values[0].sub_categories);
         setImgUrl(response.data.data.values[0].banner_url)
       })
       .catch((error) => {
         console.log(error);
       });
   };
   const { categoryId } = useParams();

   useEffect(() => {
     fetchCategoryDetails();
   }, [categoryId]);
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

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://test.shopazany.com/api/auth/admin/store/create_store_category",
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: "Bearer " + JSON.parse(localStorage.getItem("token")!),
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
  useEffect(() => {
    console.log(subCategoryData);
  }, [subCategoryData]);

  return (
    <>
      <Layout>
        <form className="flex flex-col gap-4 bg-[#F5F5F5]">
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <p className="text-[36px] font-bold">Edit Category</p>
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
              Update Category
            </button>
          </div>
          <div className="flex-1 flex flex-col gap-4 w-[90%] lgm:w-[65%]">
            <div className="flex flex-row gap-4 items-end">
              <div className="flex flex-col">
                <label htmlFor="image">Category Image</label>
                <div
                  className="rounded-lg w-[700px] h-[200px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${imgUrl})` }}
                ></div>
              </div>
              <label htmlFor="logo" className="cursor-pointer rounded-full ">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  name="logo"
                  id="logo"
                  required={true}
                  
                  onChange={(e) => handleImageChange(e)}
                />
                <div className="flex justify-center  ">
                  <div className="border border-[#505050] bg-[#505050] text-[#fff] p-1 px-2 rounded-sm">
                    change
                  </div>
                </div>
              </label>
            </div>
            <div className="flex flex-col gap-4 shadow-md p-3">
              <div className="form-group flex flex-col gap-1">
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
              <div className="form-group flex flex-col gap-1">
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
                  <div key={index} className="shadow-md p-3 rounded-md">
                    <div className="form-group flex flex-col gap-1">
                      <div className="flex justify-between items-center">
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
                          handleSubCategoryChange(index, "name", e.target.value)
                        }
                      />
                    </div>

                    <div className="form-group flex flex-col gap-1">
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
                            "about",
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
            <div className="flex justify-center items-center">
              <button
                className="border border-[#E51B48] bg-[#E51B48] text-[#fff] p-3 px-4 rounded-sm"
                onClick={handleAddSubCategories}
              >
                Add Sub Categories
              </button>
            </div>
          </div>
        </form>
      </Layout>
    </>
  );
}
