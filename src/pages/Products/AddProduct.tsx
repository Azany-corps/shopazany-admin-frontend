import React from 'react'
import { FormEvent, ChangeEvent, useEffect, useReducer, useState } from 'react';
import Layout from '../../components/Core/Layout';
import { Icon } from "@iconify/react";
import Input from '../../components/UI/Input';
import axios from "axios";
import { toast } from "react-toastify";
import Select from '../../components/UI/Select';
import { useNavigate } from "react-router-dom";


interface IProduct {
    subCategory: string;
    brand: string;
    images: File[];
    productName: string;
    description: string;
    specification: string;
    attributes: string[];
    country: string;
    stock: boolean;
    discount: boolean;
    state: string;
    city: string;
    price: number;
    quantity: number
}

interface IAction {
    type: 'update' | 'image';
    payload: any;
}

const AddProduct = () => {

    const initialState: IProduct = {
        subCategory: '',
        brand: '',
        images: [],
        productName: '',
        description: '',
        specification: '',
        attributes: [],
        country: '',
        state: '',
        city: '',
        stock: false,
        discount: false,
        price: 0,
        quantity: 0
    }

    const navigate = useNavigate();
    // const [imgUrl, setImgUrl] = useState<any>(
    //     "https://img.freepik.com/free-photo/bunch-black-friday-gifts-golden-shopping-cart-with-copy-space_23-2148667040.jpg?w=1480&t=st=1695914954~exp=1695915554~hmac=dd699f3b1464daf0ef8135b0142b87174f8af4d359170d2efc997d8ec908c2e3"
    // );
    const [previewUrls, setPreviewUrls] = useState<any[]>([])
    const [product, dispatch] = useReducer((state: IProduct, action: IAction) => {
        if (action.type === 'update') {
            console.log('myacy: ', action.payload)
            return {
                ...state,
                [action.payload.key]: action.payload.value
            }
        }
        if (action.type === 'image') {
            console.log('urls: ', previewUrls)
            return {
                ...state,
                [action.payload.key]: [...state.images, action.payload.value]
            }
        }
        return { ...state, [action.type]: action.payload }
    }, initialState)

    const goBack = () => {
        window.history.back();
    };

    const handleImageChange = async (event: any) => {
        event.preventDefault();
        let reader = new FileReader();
        let value = event?.target?.files[0];
        let key = event.currentTarget.name
        const payload = { key, value }
        console.log("hello: ", payload)

        reader.onloadend = () => {
            setPreviewUrls([...previewUrls, reader.result])
            dispatch({ type: 'image', payload })
        };

        reader.readAsDataURL(value);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const key = event.currentTarget.name;
        const value = event.currentTarget.value
        const payload = { key, value }

        dispatch({ type: 'update', payload })
    }

    const addProduct = (e: any) => {
        e.preventDefault();
        console.log("product: ", product)
    }

    const handleSubmit = (event: any) => {
        event?.preventDefault();
        // if (
        //     product.productName.trim() === "" ||
        //     product.description.trim() === "" ||
        //     product.specification.trim() === "" ||
        //     product.brand.trim() === "" ||
        //     product.productName.trim() === "" ||
        //     product.description.trim() === "" ||
        //     product.productName.trim() === "" ||
        //     product.description.trim() === "" ||
        //     product.images.length === 0 ||
        //     product.subCategory.trim() === ''

        // ) {
        //     // Show a toast error message for validation failure
        //     toast.error("Please fill in all required fields.", {
        //         position: "top-center",
        //         autoClose: 3000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //     });
        //     return;
        // }
        let data = new FormData();
        data.append("sub_category", product.subCategory);
        data.append("product_name", product.productName);
        data.append("stock", product.stock.toString());
        data.append("quantity", product.quantity.toString());
        data.append("country", product.country);
        data.append("state", product.state);
        data.append("city", product.city);
        data.append("currency", 'ngn')
        data.append("price", product.price.toString())

        product.images.forEach((image, index) => {
            data.append(`image_1[${index}]`, image);
        });
        product.attributes.forEach((attribute, index) => {
            data.append(`attribute[${index}]`, attribute);
        });

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://test.shopazany.com/api/auth/admin/store/create_store_category",
            headers: {
                "Content-Type": "multipart/form-data",
                authorization: "Bearer " + localStorage.getItem("token"),
            },
            data: data,
        };

        axios
            .request(config)
            .then((response) => {
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
                navigate("/products");
            })
            .catch((error) => {
                toast.error(error?.response.data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                console.log(error);
            });
    };
    return (
        <>
            <Layout>
                <form className="flex flex-col gap-4 bg-[#F5F5F5]">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-3">
                            <p className="text-[36px] font-bold">Add Product</p>
                            <div
                                className="flex gap-2 items-center text-[#1B7CFC] cursor-pointer"
                                onClick={goBack}
                            >
                                <Icon icon="icon-park-outline:left" />
                                <p>Back to Products</p>
                            </div>
                        </div>
                        <div className="flex flex-col w-full bg-[#fff] py-4 px-20 rounded-md gap-4 justify-center items-center">
                            <div className="flex img w-full bg-brand-red h-32 rounded-md"></div>
                            <div className="flex justify-end w-full">
                                <div className="flex justify-between px-4 bg-[#FF809C] w-36 rounded-full">
                                    <p className='font-medium text-[#fff] py-1'>In Stock</p>
                                    <input
                                        className=""
                                        type="checkbox"
                                        role="switch"
                                        name='stock'
                                        onChange={handleInputChange}
                                        checked={product.stock} />
                                </div>
                            </div>
                            <div className="flex w-full gap-12">
                                <div className="flex w-2/5 justify-start items-start">
                                    <div className="flex w-full bg-[#f5f5f5] border border-[#e2e2e2] justify-between py-3 px-4 gap-8 rounded-md">
                                        <p className='font-medium py-1'>DISCOUNT</p>
                                        <input
                                            className=""
                                            type="checkbox"
                                            role="switch"
                                            name='discount'
                                            checked={product.discount}
                                            onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="flex w-full flex-col gap-12">
                                    <Select name={'subCategory'} value={product.subCategory} onChange={handleInputChange} label={'product sub category'} optionText={'Select Sub Category?'} />
                                    <Select name={'brand'} value={product.brand} onChange={handleInputChange} label={'product brand'} optionText={'Select Product brand?'} />
                                    <div className="flex flex-col gap-2 w-full">
                                        <label htmlFor="images" className='uppercase font-bold  text-[#515151]'>Images</label>
                                        <div className="flex gap-4">
                                            {
                                                product.images.map((image, index) => (
                                                    <div className="flex h-28 w-28 justify-center bg-[#f5f5f5] rounded-md items-center ">
                                                        <img className='h-full object-cover' src={previewUrls[index]} alt="" />
                                                    </div>
                                                ))
                                            }
                                            <div className="flex h-28 w-28 justify-center bg-[#f5f5f5] rounded-md items-center ">
                                                <label htmlFor="images">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden hover:cursor-pointer"
                                                        name="images"
                                                        id="images"
                                                        required={true}
                                                        onChange={(e) => handleImageChange(e)}
                                                    />
                                                    <Icon className='scale-[2]' icon="icons8:plus" />
                                                </label>
                                            </div>
                                        </div>
                                        <p>First picture is the title picture. Grab & drag photos to change the order</p>
                                        <p className='text-[#515151]'>Supported formats are .jpg, .png</p>
                                    </div>
                                    <Input name={'productName'} value={product.productName} label={'Product Name'} onChange={handleInputChange} />
                                    <Input name={'description'} value={product.description} label={'description'} onChange={handleInputChange} />
                                    <Input name={'specification'} value={product.specification} label={'specification'} onChange={handleInputChange} />
                                    {/* <Input name={'attribute'} value={product.attribute} label={'attribute'} onChange={handleInputChange} /> */}

                                    {/* <div className="flex flex-col gap-2 w-full">
                                        <label htmlFor="" className='uppercase font-bold text-[#515151]'>Product Attributes</label>
                                        <input type='text' className='border bg-[#f5f5f5] w-full border-[#e2e2e2] py-3 px-4 gap-8 rounded-md' name="" id="" />
                                    </div> */}
                                    <div className="flex flex-col gap-2 w-full">
                                        <label htmlFor="" className='uppercase font-bold text-[#515151]'>Location</label>
                                        <div className="flex gap-4 w-full">
                                            <div className="flex flex-col gap-2 w-full">
                                                <label className='font-extralight' htmlFor="">COUNTRY</label>
                                                <select className='border  bg-[#f5f5f5] w-full border-[#e2e2e2] py-3 px-4 gap-8 rounded-md' name="" id="">
                                                    <option className='text-sm font-extralight' disabled selected>Select Country</option>
                                                </select>
                                            </div>
                                            <div className="flex flex-col gap-2 w-full">
                                                <label className='font-extralight' htmlFor="">STATE</label>
                                                <select className='border  bg-[#f5f5f5] w-full border-[#e2e2e2] py-3 px-4 gap-8 rounded-md' name="" id="">
                                                    <option className='text-sm font-extralight' disabled selected>Select State</option>
                                                </select>
                                            </div>
                                            <div className="flex flex-col gap-2 w-full">
                                                <label className='font-extralight' htmlFor="">CITY</label>
                                                <select className='border  bg-[#f5f5f5] w-full border-[#e2e2e2] py-3 px-4 gap-8 rounded-md' name="" id="">
                                                    <option className='text-sm font-extralight' disabled selected>Select City</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <Input name={'price'} value={product.price} label={'price'} onChange={handleInputChange} />
                                    <button className='bg-[#E51B48] w-full py-3 px-4 rounded-md text-[#fff]' onClick={addProduct}>Add Product</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Layout>
        </>
    )
}

export default AddProduct