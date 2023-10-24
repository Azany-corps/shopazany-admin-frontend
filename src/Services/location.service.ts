import axios from "axios";
import { getBearerToken } from "./auth.service";
import QueryString from "qs";
interface LocationItem {
  id: string | number;
  name: string;
}

const apiUrl = "https://test.shopazany.com/api/auth/admin/brand/";

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
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getBrands = () => {
  return sendRequest("get", "fetch_all_brands");
};

const getBrandById = (id: number | string) => {
  return sendRequest("get", `view_brand/${id}`);
};

const updateBrandById = (
  id: number | string,
  name: string
) => {
  const data = {
    name,
  };

  return sendRequest("put", `update_brand/${id}`, data);
};

const deleteBrand = (id: number | string) => {
  return sendRequest("delete", `delete_brand/${id}`);
};

export {
  getBrands,
  deleteBrand,
  getBrandById,
  updateBrandById,
};
