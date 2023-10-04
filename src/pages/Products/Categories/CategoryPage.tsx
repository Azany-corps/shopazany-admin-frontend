import { Icon } from "@iconify/react";
import Badge from "../../../components/Products/Badge";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../../../components/Core/Layout";
import axios from "axios";

type Props = {};

export default function CategoryPage({}: Props) {
  const goBack = () => {
    window.history.back();
  };

  const fetchCategoryDetails = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://test.shopazany.com/api/auth/admin/store/view_store_category/5",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const { categoryId } = useParams();

  useEffect(() => {
    fetchCategoryDetails();
  }, [categoryId]);

  const badgeData = [
    {
      id: 1,
      orders: 242000,
      link: "./#",
      image: (
        <Icon icon="carbon:categories" color="#1b7cfc" width={36} height={36} />
      ),
      title: "Product Categories",
    },
    {
      id: 2,
      orders: 242000,
      link: "./sub-categories",
      image: (
        <Icon icon="carbon:categories" color="#1b7cfc" width={36} height={36} />
      ),
      title: "Product Sub-Categories",
    },
  ];

  return (
    <>
      <Layout>
        <div className="flex flex-col gap-4 bg-[#F5F5F5]">
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <p className="text-[36px] font-bold">Product Categories</p>
              <div
                className="flex gap-2 items-center text-[#1B7CFC] cursor-pointer"
                onClick={goBack}
              >
                <Icon icon="icon-park-outline:left" />
                <p>Back to Products</p>
              </div>
            </div>
            <Link
              to={"/products/categories/add-category"}
              className="border border-[#E51B48] bg-[#E51B48] text-[#fff] p-1 px-2 rounded-sm"
            >
              Add Categories
            </Link>
          </div>
          <div className="flex flex-row items-center gap-4">
            <Badge badgeData={badgeData} />
          </div>
          <div className="bg-[white]"></div>
        </div>
      </Layout>
    </>
  );
}
