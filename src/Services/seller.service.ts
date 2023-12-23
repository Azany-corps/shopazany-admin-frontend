import axios from "axios";
import { getBearerToken } from "./auth.service";
import QueryString from "qs";
import { toast } from "react-toastify";
import callAPI from './api.service';

const apiUrl = "https://test.shopazany.com/api/auth/admin/sellers/";

const sendRequest = async (method: string, endpoint: string, data = {}, err = false) => {
  console.log(err);
  const config = {
    method: method,
    maxBodyLength: Infinity,
    url: apiUrl + endpoint,
    headers: {
      Authorization: getBearerToken(),
    },
    data: method === "get" ? null : QueryString.stringify(data),
  };

  try {
    const response = await axios.request(config);

    if (method === 'put' || method === 'post' || method === 'delete') {
      toast.success(response?.data?.success, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    return response;
  } catch (error: any) {
    if (method === 'put' || method === 'post' || method === 'delete' || err === true) {
      if (error.response.data.status_code === 422) {
        toast.warning(error.response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(error.response.data.message || error.response.data.error, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }



    }
    console.error(error);
    throw error;
  }
};

const getSellerProducts = (id: string | undefined) => {
  return sendRequest("get", `products/all/${id}`);
};

const getSeller = (id: number | string | undefined) => {
  return sendRequest("get", `details/${id}`);
};

const getSellers = (id: string | undefined) => {
  return sendRequest("get", `details/${id}`);
};

const approveSeller = (id: string | undefined) => {
  return sendRequest("post", `approve/${id}`, {}, true);
};

const suspendSeller = (id: string | undefined) => {
  return sendRequest("post", `suspend/${id}`, {}, true);
};

const deleteAttribute = (id: number | string | undefined) => {
  return sendRequest("delete", `delete_attribute/${id}`);
};

export {
  getSeller,
  getSellers,
  getSellerProducts,
  approveSeller,
  suspendSeller
}
