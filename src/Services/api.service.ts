import axios, { AxiosError } from "axios";

const baseUrl = "https://test.shopazany.com/api/";

const callAPI = async (
  url: string,
  method: string,
  body: any,
  headers: any = {
    "Content-Type": "application/json",
  },
  base?: boolean
) => {
  try {
    const myUrl = base ? url : baseUrl + url;
    console.log(myUrl)
    const response = await axios({
      url: `${myUrl}`,
      method,
      headers,
      data: body,
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.status === 404) {
      window.location.pathname = "/404";
    }
    // if (axiosError.response && axiosError.response.status === 500) {
    //   window.location.pathname = "/500";
    // }
    if (axiosError.response && axiosError.response.status === 403) {
      window.location.pathname = "/403";
    }

    throw error;
  }
};

export default callAPI;
