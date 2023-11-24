import axios from "axios";
// import { getBearerToken } from "./auth.service";
import { toast } from "react-toastify";
import { getBearerToken } from "./auth.service";

const fetchCategories = async () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    //url:"https://test.shopazany.com/api/auth/admin/nested-category"
    url: "test.shopazany.com/api/auth/admin/store/fetch_store_categories",
    headers: {
      Authorization: getBearerToken(),
      "Content-Type": "multipart/form-data",
    },
  };

  axios
    .request(config)
    .then((response) => {
      return { categories: response.data.data.values };
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteCategory = async (id: number | string) => {
  try {
    const config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `https://test.shopazany.com/api/auth/admin/store/delete_store_category/${id}`,
      headers: {
        Authorization: getBearerToken(),
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await axios.request(config);
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

    return response.data.data.values;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "An error occurred", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log(error);
    throw error; // Re-throw the error if needed
  }
};

export { fetchCategories, deleteCategory };
