import axios from "axios";
import { getBearerToken } from "./auth.service";

const fetchCategories = ()=>{
   
let config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "test.shopazany.com/api/auth/admin/store/fetch_store_categories",
  headers: {
    Authorization: getBearerToken(),
    "Content-Type": "multipart/form-data",
  },
};

axios.request(config)
.then((response) => {
  return {categories: response.data.data.values,}
})
.catch((error) => {
  console.log(error);
});

}
export {fetchCategories}