import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import callAPI from "../../Services/api.service";
import { useNavigate } from "react-router-dom";
import { FileWithPath } from "react-dropzone";
import { Icon } from "@iconify/react";
import { ModalSelect } from "../../components/Core/ModalSelect";

import { FormInput, FormSelect, FormTextArea } from "../../components/Inputs";

import AddImageComp from "../../components/Core/AddImageComp";
import TextColorizer from "./ColorText";
import { IProduct } from "./product.type";
import { fetchCategory } from "../../Services/categories.service";
import { fetchBrands } from "../../Services/brands.service";
import LayoutComp from "../../components/Core/LayoutComp";
import axios from "axios";

interface DiscountOption {
  quantity: string;
  percentage: string;
}
interface ColorizedText {
  id: string;
  text: string[];
}

interface Attribute {
  id: number;
  name: string;
  items: string[];
}

interface Category {
  id: number;
  title: string;
  business_type: string;
  parent_category_id?: string | null;
  subcategories: Category[];
}

interface Brand {
  id: number;
  name: string;
}

const AddProduct = () => {
  const navigate = useNavigate();

  const [selectedImages, setSelectedImages] = useState<FileWithPath[]>([]);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [parentColorizedTexts, setParentColorizedTexts] = useState<
    ColorizedText[]
  >([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isCategoryModal, setIsCategoryModal] = useState<boolean>(false);

  const getNestedCategories = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://test.shopazany.com/api/auth/admin/nested-category",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(response.data.categories);
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getNestedCategories();
  const initialFormData: IProduct = {
    product_name: "",
    product_category: "",
    stock: "",
    currency: "",
    price: "",
    brand: "",
    weight: "",
    short_description: "",
    product_description: "",
    certification: "",
    main_material: "",
    material_family: "",
    model: "",
    production_country: "",
    production_line: "",
    size: "",
    warranty_duration: "",
    warranty_type: "",
    note: "",
    color: "",
    ram_size: "",
    cpu_core: "",
    operating_system: "",
    screen_size: "",
    display_features: "",
    battery_size: "",
    product_attributes: [],
    sale_price: "",
    sale_start_date: "",
    sale_end_date: "",
    stock_quantity: "",
  };
  const [formData, setFormData] = useState<IProduct>(initialFormData);

  const handleColorizedTextsChange = (colorizedTexts: ColorizedText) => {
    // Access the colorizedTexts value in the parent component

    // Create a new array with updated colorizedTexts
    const newColorizedTexts: ColorizedText[] = parentColorizedTexts?.map(
      (parentT: ColorizedText) => {
        if (parentT.id === colorizedTexts.id) {
          // If IDs match, update the text property
          return {
            id: colorizedTexts.id,
            text: [...colorizedTexts.text],
          };
        } else {
          // Otherwise, keep the existing colorizedText
          return { ...parentT };
        }
      }
    );

    // Update the state with the new array
    setParentColorizedTexts(newColorizedTexts || []);
  };

  const handleStockStatusChange = (status: string) => {
    setFormData({ ...formData, stock: status });
  };

  const handleImageSelect = (images: FileWithPath[]) => {
    setSelectedImages(images);
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event?.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("formd: ", formData);

    setLoading(true);
    console.log("parent: ", parentColorizedTexts);

    try {
      let data = new FormData();
      data.append("category", formData.product_category);
      data.append("product_name", formData.product_name);
      data.append("stock", formData.stock);
      data.append("quantity", formData.stock_quantity);
      data.append("currency", formData.currency);
      data.append("price", formData.price);
      data.append("brand_id", formData.brand);
      data.append("description", formData.product_description);
      data.append("short_description", formData.short_description);
      data.append("weight", formData.weight);
      data.append("sales_price", formData.sale_price);
      data.append("start_date", formData.sale_start_date);
      data.append("end_date", formData.sale_end_date);

      parentColorizedTexts.forEach(
        (attribute: ColorizedText, index: number) => {
          data.append(`attribute_id[${index}]`, attribute.id);

          const texts = parentColorizedTexts[index].text.join(",");
          data.append(`attribute_value[${index}]`, texts);
        }
      );

      attributes.forEach((attribute: Attribute, index: number) => {
        data.append(`attribute_key[${index}]`, attribute.name);
      });

      selectedImages?.forEach((image, index) => {
        data.append(`image_1[${index}]`, image);
      });

      const response = await callAPI(
        "auth/store/create_store_product",
        "POST",
        data,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer + ${localStorage.getItem("token")}`,
        }
      );
      console.log(response);

      if (response.status && response.status_code === 200) {
        setLoading(false);
        setAttributes([]);
        setParentColorizedTexts([]);
        setFormData(initialFormData);

        toast.success("Product added successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/manufacturers-profile/product");
      } else {
        setLoading(false);
        const errorMessage = response.data.data.errors[0];
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      navigate("/manufacturers-profile/product");
    } catch (err: any) {
      console.log(err);
      setLoading(false);
      toast.error(err?.response?.data?.data?.errors?.[0], {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleCategorySelect = async (category: string, id: number) => {
    setFormData({ ...formData, product_category: category });
    fetchCategory(id)
      .then((res: any) => {
        const attributes: Attribute[] = res.category_attributes?.map(
          (attribute: any, index: number) => {
            return {
              id: attribute.attribute.id,
              name: attribute.attribute.attribute_name,
              items: [...attribute.attribute.items],
            };
          }
        );

        const attributeText: ColorizedText[] = res.category_attributes?.map(
          (attribute: any, index: number) => {
            return {
              id: attribute.attribute.id.toString(),
              text: [],
            };
          }
        );

        setParentColorizedTexts(attributeText);

        console.log("attr: ", attributes);

        setAttributes(attributes);
      })
      .catch((error) => {
        console.log(error);
      });
    closeCategoryModal();
  };

  const closeCategoryModal = () => {
    setIsCategoryModal(false);
  };

  const openCategoryModal = () => {
    setIsCategoryModal(true);
  };

  useEffect(() => {
    // fetchCategories()
    //   .then((res) => {
    //     // setCategories(res);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    getNestedCategories();

    fetchBrands()
      .then((res) => {
        setBrands(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="bg-[#F5F5F5] relative w-full h-full xs:overflow-x-hidden">
      <LayoutComp title="dashboard > add-product">
        {/* <TopHeader /> */}
        <div className="p-10 xs:p-4 w-[90%] xs:w-[94%] mx-auto mb-10 bg-white rounded-lg">
          <div className="pl-0 md:pl-40 w-full mx-auto">
            <div className="flex justify-between items-start"></div>
          </div>
          <div className="md:w-[70%] w-full mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="w-full mb-10">
                <FormInput
                  labelStyle="mb-[22px] text-base font-semibold uppercase"
                  type="text"
                  id="product_name"
                  name="Product name*"
                  value={formData?.product_name}
                  onChange={handleChange}
                  // error={Formik?.errors?.product_name as string}
                  // touched={Formik?.touched?.product_name as boolean}
                  // onBlur={Formik.handleBlur}
                />
              </div>
              <div className="w-full mb-10">
                <div className="flex flex-col gap-4 ">
                  <p className="block text-base general-font uppercase font-bold text-black">
                    Product Category*
                  </p>
                  <div
                    className="bg-[#F5F5F5] hover:cursor-pointer border general-font border-[#C1C1C1] text-[black] text-sm rounded-[10px] focus:ring-[#D65D5B] focus:border-[#D65D5B] block w-full py-5 pl-6"
                    onClick={openCategoryModal}
                  >
                    {formData.product_category
                      ? formData.product_category
                      : "Select Product category"}
                  </div>
                </div>
              </div>
              <div className="w-full mb-10 grid grid-cols-3 gap-x-[18.9px]">
                <div className="w-full col-span-2">
                  <FormSelect
                    name="Product brand*"
                    id="brand"
                    value={formData?.brand}
                    onChange={handleChange}
                    // onBlur={Formik.handleBlur}
                    // error={Formik?.errors?.brand as string}
                    // touched={Formik?.touched?.brand as boolean}
                    options={
                      brands
                        ? brands?.map((brand: Brand, index: number) => {
                            return {
                              label: brand.name,
                              value: brand.id.toString(),
                            };
                          })
                        : []
                    }
                    optionsLabel="Select brand"
                    labelStyle="font-semibold mb-[22px]"
                  />
                </div>
                <div className="w-full col-span-1">
                  <FormInput
                    labelStyle="capitalize mb-[22px] text-base font-semibold"
                    type="text"
                    id="weight"
                    name="Weight (kg)*"
                    value={formData?.weight}
                    onChange={handleChange}
                    // error={Formik?.errors?.weight as string}
                    // touched={Formik?.touched?.weight as boolean}
                    // onBlur={Formik.handleBlur}
                  />
                </div>
              </div>
              <div className="w-full mb-10">
                <p className="block mb-[22px] text-base font-semibold general-font uppercase text-black">
                  Description*
                </p>
                <div className="w-full my-5">
                  <FormTextArea
                    labelStyle="font-semibold"
                    placeholder="Input short description"
                    id="short_description"
                    name="short description"
                    value={formData?.short_description}
                    onChange={handleChange}
                    // error={Formik?.errors?.short_description as string}
                    // touched={Formik?.touched?.short_description as boolean}
                  />
                </div>
                <div className="w-full">
                  <FormTextArea
                    labelStyle="font-semibold"
                    placeholder="Input product description"
                    id="product_description"
                    name="product description"
                    value={formData?.product_description}
                    onChange={handleChange}
                    // error={Formik?.errors?.product_description as string}
                    // touched={Formik?.touched?.product_description as boolean}
                  />
                </div>
              </div>

              <div className="w-full mb-10">
                <p className="block mb-[22px] text-base font-semibold general-font uppercase text-black">
                  Images*
                </p>
                <div className="">
                  <AddImageComp onImageSelect={handleImageSelect} />
                </div>
              </div>
              <div className="w-full mb-10">
                <p className="block mb-[22px] text-base font-semibold general-font uppercase text-black">
                  Specifications*
                </p>
                <div className="flex flex-col gap-4">
                  {attributes.length !== 0 ? (
                    attributes?.map((attribute: Attribute, index: number) => (
                      <TextColorizer
                        key={index}
                        id={attribute.id.toString()}
                        attributeText={attribute.items}
                        name={attribute.name}
                        onColorizedTextsChange={handleColorizedTextsChange}
                      />
                    ))
                  ) : (
                    <p className="text-[#515151] text-lg">
                      Select Category to specifications
                    </p>
                  )}
                </div>
                {/* <div className="grid grid-cols-3 w-full gap-x-5 mb-5">
                <div className="w-full col-span-1">
                  <FormSelect
                    name="Certification"
                    id="certification"
                    value={formData?.certification}
                    onChange={handleChange}
                    // onBlur={Formik.handleBlur}
                    // error={Formik?.errors?.certification as string}
                    // touched={Formik?.touched?.certification as boolean}
                    options={[
                      { label: "Euro", value: "EUR" },
                      { label: "US Dollars", value: "USD" },
                    ]}
                    optionsLabel="Certifications"
                    labelStyle="block text-sm mb-2 font-normal general-font capitalize text-black"
                  />
                </div>
                <div className="w-full col-span-1">
                  <FormInput
                    labelStyle="capitalize mb-2 font-normal text-sm"
                    type="text"
                    id="main_material"
                    name="Main material"
                    value={formData?.main_material}
                    onChange={handleChange}
                    // error={Formik?.errors?.main_material as string}
                    // touched={Formik?.touched?.main_material as boolean}
                    // onBlur={Formik.handleBlur}
                    placeholder="Material of the product"
                  />
                </div>
                <div className="w-full col-span-1">
                  <FormInput
                    labelStyle="capitalize mb-2 font-normal text-sm"
                    type="text"
                    id="material_family"
                    name="Material family"
                    value={formData?.material_family}
                    onChange={handleChange}
                    // error={Formik?.errors?.material_family as string}
                    // touched={Formik?.touched?.material_family as boolean}
                    // onBlur={Formik.handleBlur}
                    placeholder="Material family of the product"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 w-full gap-x-5 mb-5">
                <div className="w-full col-span-1">
                  <FormInput
                    name="Model"
                    id="model"
                    value={formData?.model}
                    onChange={handleChange}
                    // onBlur={Formik.handleBlur}
                    // error={Formik?.errors?.model as string}
                    // touched={Formik?.touched?.model as boolean}
                    type="text"
                    labelStyle="block text-sm mb-2 font-normal general-font capitalize text-black"
                    placeholder="Model ID or Manufacturer part Number"
                  />
                </div>
                <div className="w-full col-span-1">
                  <FormInput
                    labelStyle="capitalize mb-2 font-normal text-sm"
                    type="text"
                    id="production_country"
                    name="Production country"
                    value={formData?.production_country}
                    onChange={handleChange}
                    // error={Formik?.errors?.production_country as string}
                    // touched={Formik?.touched?.production_country as boolean}
                    // onBlur={Formik.handleBlur}
                    placeholder="Material of the product"
                  />
                </div>
                <div className="w-full col-span-1">
                  <FormInput
                    labelStyle="capitalize mb-2 font-normal text-sm"
                    type="text"
                    id="production_line"
                    name="Production line"
                    value={formData?.production_line}
                    onChange={handleChange}
                    // error={Formik?.errors?.production_line as string}
                    // touched={Formik?.touched?.production_line as boolean}
                    // onBlur={Formik.handleBlur}
                    placeholder="Production line"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 w-full gap-x-5 mb-5">
                <div className="w-full col-span-1">
                  <FormInput
                    name="Size (L x X x H cm)"
                    id="size"
                    value={formData?.size}
                    onChange={handleChange}
                    // onBlur={Formik.handleBlur}
                    // error={Formik?.errors?.size as string}
                    // touched={Formik?.touched?.size as boolean}
                    placeholder="Input size"
                    type="text"
                    labelStyle="block text-sm mb-2 font-normal general-font text-black"
                  />
                </div>
                <div className="w-full col-span-1">
                  <FormSelect
                    name="Warranty Duration"
                    id="warranty_duration"
                    value={formData?.warranty_duration}
                    onChange={handleChange}
                    // onBlur={Formik.handleBlur}
                    // error={Formik?.errors?.warranty_duration as string}
                    // touched={Formik?.touched?.warranty_duration as boolean}
                    options={[
                      { label: "Euro", value: "EUR" },
                      { label: "US Dollars", value: "USD" },
                    ]}
                    optionsLabel="Warranty duration of product"
                    labelStyle="block text-sm mb-2 font-normal general-font capitalize text-black"
                  />
                </div>
                <div className="w-full col-span-1">
                  <FormSelect
                    name="Warranty type"
                    id="warranty_type"
                    value={formData?.warranty_type}
                    onChange={handleChange}
                    // onBlur={Formik.handleBlur}
                    // error={Formik?.errors?.warranty_type as string}
                    // touched={Formik?.touched?.warranty_type as boolean}
                    options={[
                      { label: "Euro", value: "EUR" },
                      { label: "US Dollars", value: "USD" },
                    ]}
                    optionsLabel="Warranty type of product"
                    labelStyle="block text-sm mb-2 font-normal general-font capitalize text-black"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 w-full gap-x-5 mb-5">
                <div className="w-full col-span-2">
                  <FormInput
                    name="note"
                    id="note"
                    value={formData?.note}
                    onChange={handleChange}
                    // onBlur={Formik.handleBlur}
                    // error={Formik?.errors?.note as string}
                    // touched={Formik?.touched?.note as boolean}
                    placeholder="Note/Comment"
                    type="text"
                    labelStyle="block text-sm mb-2 font-normal general-font text-black"
                  />
                </div>

                <div className="w-full col-span-1">
                  <FormInput
                    name="color"
                    id="color"
                    value={formData?.color}
                    onChange={handleChange}
                    // onBlur={Formik.handleBlur}
                    // error={Formik?.errors?.color as string}
                    // touched={Formik?.touched?.color as boolean}
                    placeholder="Input color"
                    type="text"
                    labelStyle="block text-sm mb-2 font-normal general-font text-black"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 w-full gap-x-5 mb-5">
                <div className="w-full col-span-1">
                  <FormInput
                    name="RAM Size (GB)"
                    id="ram_size"
                    value={formData?.ram_size}
                    onChange={handleChange}
                    // onBlur={Formik.handleBlur}
                    // error={Formik?.errors?.ram_size as string}
                    // touched={Formik?.touched?.ram_size as boolean}
                    placeholder="RAM Size (GB)"
                    type="text"
                    labelStyle="block text-sm mb-2 font-normal general-font text-black"
                  />
                </div>

                <div className="w-full col-span-1">
                  <FormInput
                    name="CPU Cores"
                    id="cpu_core"
                    value={formData?.cpu_core}
                    onChange={handleChange}
                    // onBlur={Formik.handleBlur}
                    // error={Formik?.errors?.cpu_core as string}
                    // touched={Formik?.touched?.cpu_core as boolean}
                    placeholder="CPU Cores"
                    type="text"
                    labelStyle="block text-sm mb-2 font-normal general-font text-black"
                  />
                </div>

                <div className="w-full col-span-1">
                  <FormInput
                    name="Operating System"
                    id="operating_system"
                    value={formData?.operating_system}
                    onChange={handleChange}
                    // onBlur={Formik.handleBlur}
                    // error={Formik?.errors?.operating_system as string}
                    // touched={Formik?.touched?.operating_system as boolean}
                    placeholder="Operating System"
                    type="text"
                    labelStyle="block text-sm mb-2 font-normal general-font text-black"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 w-full gap-x-5 mb-5">
                <div className="w-full col-span-1">
                  <FormInput
                    name="Screen Size"
                    id="screen_size"
                    value={formData?.screen_size}
                    onChange={handleChange}
                    // onBlur={Formik.handleBlur}
                    // error={Formik?.errors?.screen_size as string}
                    // touched={Formik?.touched?.screen_size as boolean}
                    placeholder="Screen Size"
                    type="text"
                    labelStyle="block text-sm mb-2 font-normal general-font text-black"
                  />
                </div>

                <div className="w-full col-span-1">
                  <FormInput
                    name="Display Features"
                    id="display_features"
                    value={formData?.display_features}
                    onChange={handleChange}
                    // onBlur={Formik.handleBlur}
                    // error={Formik?.errors?.display_features as string}
                    // touched={Formik?.touched?.display_features as boolean}
                    placeholder="Display Features"
                    type="text"
                    labelStyle="block text-sm mb-2 font-normal general-font text-black"
                  />
                </div>

                <div className="w-full col-span-1">
                  <FormInput
                    name="Battery Size"
                    id="battery_size"
                    value={formData?.battery_size}
                    onChange={handleChange}
                    // onBlur={Formik.handleBlur}
                    // error={Formik?.errors?.battery_size as string}
                    // touched={Formik?.touched?.battery_size as boolean}
                    placeholder="Battery Size"
                    type="text"
                    labelStyle="block text-sm mb-2 font-normal general-font text-black"
                  />
                </div>
              </div> */}
              </div>
              {/* <div className="flex flex-col gap-3 w-full mb-10">
              <TextColorizer
                attributeText={["lorem", "ipsum", "jeje", "glow", "wine"]}
                name="exampleName"
                onColorizedTextsChange={handleColorizedTextsChange}
              />
              <FormInput
                name=""
                id="product_attributes"
                value={formData?.product_attributes}
                onChange={handleChange}
                // onBlur={Formik.handleBlur}
                // error={Formik?.errors?.product_attributes as string}
                // touched={Formik?.touched?.product_attributes as boolean}
                placeholder=""
                type="text"
                labelStyle="block text-sm mb-2 font-normal general-font text-black uppercase"
              />
              <p className="text-[#515151] w-2/3 text-sm"><span className="text-black">Related Attributes: </span> Color,  Size,  Branding,  Depth,  Logo,  Color,  Size,  Branding,  Depth,  Logo,  Color,  Size,  Branding,  Depth,  Logo,</p>
            </div> */}
              <div className="w-full col-span-2 mb-10">
                <FormSelect
                  name="Currency*"
                  id="currency"
                  value={formData?.currency}
                  onChange={handleChange}
                  // onBlur={Formik.handleBlur}
                  // error={Formik?.errors?.brand as string}
                  // touched={Formik?.touched?.brand as boolean}
                  options={[
                    { label: "Euro", value: "EUR" },
                    { label: "Naira", value: "NGN" },
                    { label: "US Dollars", value: "USD" },
                  ]}
                  optionsLabel="Select Currency"
                  labelStyle="font-semibold mb-[22px]"
                />
              </div>
              <div className="w-full mb-10">
                <p className="block mb-[22px] font-bold text-base general-font uppercase text-black">
                  Price*
                </p>
                <div className="w-full mb-5">
                  <FormInput
                    name={`Global Price (${formData.currency})`}
                    id="price"
                    value={formData?.price}
                    onChange={handleChange}
                    // onBlur={Formik.handleBlur}
                    // error={Formik?.errors?.price as string}
                    // touched={Formik?.touched?.price as boolean}
                    placeholder=""
                    type="text"
                    labelStyle="block text-sm mb-2 font-normal general-font text-black capitalize"
                  />
                </div>
                <div className="w-full grid grid-cols-3 gap-x-5">
                  <div className="w-full col-span-1">
                    <FormInput
                      name={`Sale Price (${formData.currency})`}
                      id="sale_price"
                      value={formData?.sale_price}
                      onChange={handleChange}
                      // onBlur={Formik.handleBlur}
                      // error={Formik?.errors?.sale_price as string}
                      // touched={Formik?.touched?.sale_price as boolean}
                      placeholder="Input product description"
                      type="text"
                      labelStyle="block text-sm mb-2 font-normal general-font text-black capitalize"
                    />
                  </div>
                  <div className="w-full col-span-1">
                    <FormInput
                      name="Sale Start Date"
                      id="sale_start_date"
                      value={formData?.sale_start_date}
                      onChange={handleChange}
                      // onBlur={Formik.handleBlur}
                      // error={Formik?.errors?.sale_start_date as string}
                      // touched={Formik?.touched?.sale_start_date as boolean}
                      placeholder="Select date"
                      type="date"
                      labelStyle="block text-sm mb-2 font-normal general-font text-black capitalize"
                    />
                  </div>
                  <div className="w-full col-span-1">
                    <FormInput
                      name="Sale End Date"
                      id="sale_end_date"
                      value={formData?.sale_end_date}
                      onChange={handleChange}
                      // error={Formik?.errors?.sale_end_date as string}
                      // touched={Formik?.touched?.sale_end_date as boolean}
                      placeholder="Select date"
                      type="date"
                      labelStyle="block text-sm mb-2 font-normal general-font text-black capitalize"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full mb-[70px]">
                <p className="block font-bold mb-[22px] text-base general-font uppercase text-black">
                  Stock Management*
                </p>
                <div className="w-full mb-5">
                  <FormInput
                    name="Stock quantity"
                    id="stock_quantity"
                    value={formData?.stock_quantity}
                    onChange={handleChange}
                    // onBlur={Formik.handleBlur}
                    // error={Formik?.errors?.stock_quantity as string}
                    // touched={Formik?.touched?.stock_quantity as boolean}
                    placeholder="Select stock quantity"
                    type="text"
                    labelStyle="block text-sm mb-2 font-normal general-font text-black capitalize"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full focus:outline-none text-white bg-[#E51B48] hover:bg-[#E51B48] focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-5 "
              >
                {loading ? "loading..." : "Add Product"}
              </button>
              <div className="max-w-[808px]">
                <p className=" text-sm font-normal general-font text-[#515151]">
                  By clicking add product, you accept the Terms of Use, confirm
                  that you will abide by the Safety Tips, and declare that this
                  posting does not include any Prohibited Items
                </p>
              </div>
            </form>
          </div>
        </div>

        {isCategoryModal && (
          <div className="flex justify-end z-40 fixed top-0 w-full h-screen bg-black/50  backdrop-blur-[1px]">
            <div onClick={closeCategoryModal} className="w-1/2 h-full"></div>
            <div className="flex justify-start items-center flex-col h-full bg-white w-1/2">
              <div className="flex px-8 w-full py-4 bg-[#221E22] justify-between items-center">
                <p className="font-bold text-lg  text-white">Select Category</p>
                <span
                  className="hover:cursor-pointer"
                  onClick={closeCategoryModal}
                >
                  <Icon
                    icon="ic:outline-cancel"
                    color="white"
                    width="24"
                    height="24"
                  />
                </span>
              </div>
              <div className="flex w-full bg-[#44444C] text-white text-sm px-8 py-2 font-bold">
                Electronics `{">"}` TVs `{">"}` Smart TVs
              </div>
              <div className="flex flex-col w-full overflow-y-scroll">
                <ModalSelect
                  categories={categories}
                  handleCategorySelect={handleCategorySelect}
                />
              </div>
            </div>
          </div>
        )}
      </LayoutComp>
    </div>
  );
};

export default AddProduct;
