import axios from "axios";
import { getBearerToken } from "./auth.service";
import QueryString from "qs";
import { toast } from "react-toastify";
import callAPI from './api.service';


interface AttributeItem {
  id: string | number;
  name: string;
}

const apiUrl = "https://test.shopazany.com/api/auth/admin/store/";

const sendRequest = async (method: string, endpoint: string, data = {}) => {
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
      toast.success(response?.data?.message, {
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
    if (method === 'put' || method === 'post' || method === 'delete') {
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
      }
    }
    console.error(error);
    throw error;
  }
};

const getAttributes = () => {
  return sendRequest("get", "fetch_all_attributes");
};

const getAttributeById = (id: number | string) => {
  return sendRequest("get", `view_attribute/${id}`);
};

const createAttribute = (
  attribute_name: string,
  attribute_items: string[],
  status: string
) => {
  const data = {
    attribute_name,
    ...attribute_items.reduce((acc: any, item, index) => {
      acc[`attribute_item[${index}]`] = item;
      return acc;
    }, {}),
    status
  };

  return sendRequest("post", `create_attribute`, data);
};


const updateAttributeById = (
  id: string | number,
  attribute_name: string,
  attribute_items: string[],
  status: string
) => {
  const data = {
    attribute_name,
    ...attribute_items.reduce((acc: any, item, index) => {
      acc[`attribute_item[${index}]`] = item;
      return acc;
    }, {}),
    status
  };

  return sendRequest("put", `update_attribute/${id}`, data);
};

const deleteAttribute = (id: number | string) => {
  return sendRequest("delete", `delete_attribute/${id}`);
};

export {
  createAttribute,
  getAttributes,
  deleteAttribute,
  getAttributeById,
  updateAttributeById,
};
