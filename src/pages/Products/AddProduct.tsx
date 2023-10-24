import React from 'react'
import { FormEvent, ChangeEvent, useEffect, useReducer, useState } from 'react';
import Layout from '../../components/Core/Layout';
import { Icon } from "@iconify/react";
import Input from '../../components/UI/Input';
import axios from "axios";
import { toast } from "react-toastify";
import Select from '../../components/UI/Select';
import { useNavigate } from "react-router-dom";
import { getBrands } from '../../Services/brands.service';
import { getAttributes } from '../../Services/attribbutes.service';
import callAPI from '../../Services/api.service';
import * as countryList from "../../newCountries";



interface IAttribute {
    name: string,
    id: number
}
interface IProduct {
    subCategory: string;
    brand: string;
    images: File[];
    productName: string;
    description: string;
    specification: string;
    attributes: IAttribute[];
    country: string;
    stock: boolean;
    discount: boolean;
    state: string;
    city: string;
    price: number;
    quantity: number
}



interface Country {
    name: string;
    id: string;
    currency: string;
}

interface State {
    name: string;
    id: string;
}

interface IAction {
    type: 'update' | 'image' | 'attribute' | 'updateToggle';
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
    const [attributes, setAttributes] = useState<any[]>([])

    const [countries, setCountries] = useState<any[]>([]);
    const [states, setStates] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [brands, setBrands] = useState<any[]>([])
    const [selectedAttribute, setSelectedAttributes] = useState<any[]>([])
    const [subCategories, setSubCategories] = useState<any[]>([])
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
        if (action.type === 'attribute') {
            console.log('myacy: ', action.payload)
            return {
                ...state,
                [action.payload.key]: [...state.attributes, action.payload.value]
            }
        }
        if (action.type === 'updateToggle') {
            console.log('togg: ', action.payload)
            return {
                ...state,
                [action.payload.key]: action.payload.value
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

    const handleAttributeChange = async (event: any) => {
        const key = event.currentTarget.name;
        const value = event.currentTarget.value
        const arr = value.split('__')
        const valueObj = {
            id: arr[0],
            name: arr[1]
        }
        console.log('value: ', valueObj)


        const payload = { key, value: valueObj }

        dispatch({ type: 'attribute', payload })
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const key = event.currentTarget.name;
        const value = event.currentTarget.value
        if (key === 'country') {
            const selectedCountry = countries.find(
                (country) => country?.name === value
            );
            getStatesInCountry(selectedCountry?.id);
        }
        if (key === 'state') {
            const selectedState = states.find(
                (state) => state.name === value
            );

            getCitiesInState(selectedState?.id);
        }
        if (key === 'city') {
            const selectedCity = cities.find((city) => city.name === value);
        }
        const payload = { key, value }
        console.log('payload: ', payload)

        dispatch({ type: 'update', payload })
    }

    const handleToggleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const key = event.currentTarget.name;
        const value = !product[key as 'stock' | 'discount']

        const payload = { key, value }
        console.log('payloadTT: ', payload)

        dispatch({ type: 'updateToggle', payload })
    }

    const addProduct = (e: any) => {
        e.preventDefault();
        console.log("product: ", product)
        console.log('ppp: ', product.attributes[0].id)
    }

    const getStatesInCountry = async (countryId: any) => {
        try {
            const response = await callAPI(
                `general/products/populate_states_by_country/${countryId}`,
                "GET",
                null
            );

            setStates(response?.data?.values);
        } catch (error) {
            console.log(error);
        }
    };

    const getCitiesInState = async (id: any) => {
        try {
            console.log({ id });
            const response = await callAPI(
                `general/products/populate_cities_by_state/${id}`,
                "GET",
                null
            );
            setCities(response?.data?.values);
        } catch (error) {
            console.log(error);
        }
    };

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
        const stock = product.stock ? 'inStock' : 'outOfStock'
        let data = new FormData();
        data.append("sub_category", "subcategory");
        data.append("product_name", product.productName);
        data.append("stock", stock);
        data.append("quantity", product.quantity.toString());
        data.append("country", product.country);
        data.append("state", product.state);
        data.append("city", product.city);
        data.append("currency", 'ngn')
        data.append("price", product.price.toString())
        data.append("brand_id", product.brand.toString())

        product.images.forEach((image, index) => {
            data.append(`image_1[${index}]`, image);
        });
        product.attributes.forEach((attribute, index) => {
            data.append(`attribute_id[${index}]`, attribute.id.toString());
        });

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://test.shopazany.com/api/auth/store/create_store_product",
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

    useEffect(() => {
        getAttributes().then((response) => {
            console.log('attribute: ', response.data.data.values);
            setAttributes(response.data.data.values)
            // setSelectedAttributes(response.data.data.values)
        });
        setCountries(countryList.countries);

        getBrands().then((response) => {
            console.log('attribute: ', response.data.data.values);
            setBrands(response.data.data.values)
        });
    }, []);


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
                                        name='stock'
                                        onChange={handleToggleChange}
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
                                            name='discount'
                                            checked={product.discount}
                                            onChange={handleToggleChange} />
                                    </div>
                                </div>
                                <div className="flex w-full flex-col gap-12">
                                    <Select name={'subCategory'} value={product.subCategory} onChange={handleInputChange} label={'product sub category'} optionText={'Select Sub Category?'} />
                                    <Select name={'brand'} value={product.brand} onChange={handleInputChange} label={'product brand'} optionText={'Select Product brand?'} options={brands} />
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

                                    <div className="flex flex-col gap-2 w-full">
                                        <label htmlFor='attributes' className='uppercase font-bold text-[#515151]'>product attribute</label>
                                        <div className="flex gap-3">
                                            {
                                                product?.attributes?.map((attribute, index) => (
                                                    <div
                                                        className="flex items-center p-1 px-2 rounded-md bg-brand-light-blue h-fit"
                                                        key={index}
                                                    >
                                                        <span className="mr-1 text-sm">
                                                            {attribute.name}
                                                        </span>
                                                        <span
                                                            className="p-1 cursor-pointer"
                                                        >
                                                            x
                                                        </span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <select onChange={handleAttributeChange} className='border bg-[#f5f5f5] w-full border-[#e2e2e2] py-3 px-4 gap-8 rounded-md' name='attributes'>
                                            <option disabled selected>Select Attribute?</option>
                                            {
                                                attributes?.map((option) => (
                                                    <option key={option.id} value={`${option.id}__${option.attribute_name}`}>
                                                        {option.attribute_name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className="flex flex-col gap-2 w-full">
                                        <label htmlFor="" className='uppercase font-bold text-[#515151]'>Location</label>
                                        <div className="flex xs:flex-col justify-between w-full gap-4">
                                            <div className="w-full relative flex flex-col items-start">
                                                <label className="font-normal text-[12px] text-gray-600">
                                                    COUNTRY
                                                </label>
                                                <select
                                                    name="country"
                                                    value={product?.country}
                                                    id=""
                                                    className="px-4 w-full py-3 rounded-md border border-[#e2e2e2] bg-[#F5F5F5]"
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="" disabled>
                                                        Choose country
                                                    </option>
                                                    {countries?.map((country: Country) => (
                                                        <option key={country.id} value={country?.name}>
                                                            {country?.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="w-full  flex flex-col relative items-start">
                                                <label className="font-normal text-[12px] text-gray-600">
                                                    STATE/ PROVINCE
                                                </label>

                                                <select
                                                    name="state"
                                                    id=""
                                                    value={product?.state}
                                                    className="px-4 w-full py-3 rounded-md border border-[#e2e2e2] bg-[#F5F5F5]"
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="" disabled>
                                                        Choose state/ province
                                                    </option>
                                                    {states?.map((state: State) => (
                                                        <option value={state?.name}>{state?.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="w-full  flex flex-col relative items-start">
                                                <label className="font-normal text-[12px] text-gray-600">
                                                    CITY
                                                </label>
                                                <select
                                                    name="city"
                                                    id=""
                                                    value={product?.city} className="px-4 w-full py-3 rounded-md border border-[#e2e2e2] bg-[#F5F5F5]"
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="" disabled>
                                                        Choose city
                                                    </option>
                                                    {cities?.map((city: any) => (
                                                        <option value={city?.name}>{city?.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <Input type='number' name={'price'} value={product.price} label={'price'} onChange={handleInputChange} />
                                    <Input type='number' disabled={!product.stock} name={'quantity'} value={product.quantity} label={'quantity'} onChange={handleInputChange} />
                                    <div className="flex flex-col gap-2">
                                        <button className='bg-[#E51B48] w-full py-3 px-4 rounded-md text-[#fff]' onClick={handleSubmit}>Add Product</button>
                                        <small>By clicking add product, you accept the Terms of Use, confirm that you will abide by the Safety Tips, and declare that this posting does not include any Prohibited Items</small>
                                    </div>
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