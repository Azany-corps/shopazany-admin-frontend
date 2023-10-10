import axios from "axios";
import { getBearerToken } from "./auth.service";
import QueryString from "qs";
interface AttributeItem {
  id: string | number;
  name: string;
}

const apiUrl = "https://test.shopazany.com/api/auth/admin/store/";

const sendRequest = async (method:string, endpoint:string, data = {}) => {
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

const getAttributes = () => {
  return sendRequest("get", "fetch_all_attributes");
};

const getAttributeById = (id:number | string) => {
  return sendRequest("get", `view_attribute/${id}`);
};

const updateAttributeById = (
  id: number | string,
  attribute_name: string,
  attribute_items: AttributeItem[]
) => {
  const data = {
    attribute_name,
    ...attribute_items.reduce((acc: any, item, index) => {
      acc[`attribute_item_id[${index}]`] = item.id;
      acc[`attribute_item[${index}]`] = item.name;
      return acc;
    }, {}),
  };

  return sendRequest("put", `update_attribute/${id}`, data);
};

const deleteAttribute = (id: number | string) => {
  return sendRequest("delete", `delete_attribute/${id}`);
};

export {
  getAttributes,
  deleteAttribute,
  getAttributeById,
  updateAttributeById,
};
