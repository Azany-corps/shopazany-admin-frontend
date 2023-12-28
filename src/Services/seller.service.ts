import axios from "axios";
import { getBearerToken } from "./auth.service";
import QueryString from "qs";
import { toast } from "react-toastify";
import callAPI from './api.service';

const apiUrl = "https://test.shopazany.com/api/auth/admin/sellers/";

const sendRequest = async (method: string, endpoint: string, baseurl?: string, data = {}, err = false) => {
  console.log(err);
  const config = {
    method: method,
    maxBodyLength: Infinity,
    url: baseurl || apiUrl + endpoint,
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

const getSellerPendingProducts = (id: string | undefined) => {
  return sendRequest("get", `products/pending/${id}`);
};

const getSellerActiveProducts = (id: string | undefined) => {
  return sendRequest("get", `products/active/${id}`);
};

const getSellerBlockedProducts = (id: string | undefined) => {
  return sendRequest("get", `products/blocked/${id}`);
};

const getSellerRejectedProducts = (id: string | undefined) => {
  return sendRequest("get", `products/rejected/${id}`);
};

const getSeller = (id: number | string | undefined) => {
  return sendRequest("get", `details/${id}`);
};

const getSellers = () => {
  return sendRequest("get", '', `https://test.shopazany.com/api/auth/admin/all-sellers`);
};

const getPendingSellers = () => {
  return sendRequest("get", `pending`);
};

const getActiveSellers = () => {
  return sendRequest("get", `active`);
};

const getBlockedSellers = () => {
  return sendRequest("get", `blocked`);
};

const getSuspendedSellers = () => {
  return sendRequest("get", `suspended`);
};

const getDeletedSellers = () => {
  return sendRequest("get", `deleted`);
};

const searchSellers = (search: string) => {
  return sendRequest("put", `all-users/search?query=${search}`);
};

const getSellersCount = () => {
  return sendRequest("get", `total`);
};

const getSellersCount7Days = () => {
  return sendRequest("get", `new-last-7-days`);
};

const getApprovedSellersCount = () => {
  return sendRequest("get", `approved`);
};

const getUnApprovedSellersCount = () => {
  return sendRequest("get", `unapproved`);
};

const approveSeller = (id: string | undefined) => {
  return sendRequest("post", `approve/${id}`, '', {}, true);
};

const suspendSeller = (id: string | undefined) => {
  return sendRequest("post", `suspend/${id}`, '', {}, true);
};

const deleteAttribute = (id: number | string | undefined) => {
  return sendRequest("delete", `delete_attribute/${id}`);
};

export {
  getSeller,
  getSellers,
  getSellerProducts,
  approveSeller,
  suspendSeller,
  getApprovedSellersCount,
  getUnApprovedSellersCount,
  getSellersCount,
  getSellersCount7Days,
  getSellerActiveProducts,
  getSellerBlockedProducts,
  getSellerPendingProducts,
  getSellerRejectedProducts,
  getActiveSellers,
  getBlockedSellers,
  getDeletedSellers,
  getPendingSellers,
  getSuspendedSellers,
  searchSellers
}
