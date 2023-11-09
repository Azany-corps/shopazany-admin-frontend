import { useEffect, ChangeEvent, useState, useReducer } from "react";
import Layout from "../../../components/Core/Layout";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Badge from "../../../components/Products/Badge";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PopUpModal from "../../../components/Core/PopUp";
import {
  deleteAttribute,
  getAttributes,
} from "../../../Services/attribbutes.service";

interface AttributeData {
  id: number;
  attribute_name: string;
  //   about: string;
  //   banner_url: string;
  created_at: string;
  updated_at: string;
  attribute_items: any[];
  category_attributes: any[];
}

interface IAttribute {
  attribute_name: string;
  attribute_items: string[];
}

interface IAction {
  type: 'update' | 'update_item' | 'add_item';
  payload: any;
}

export default function AttributeList() {

  const initialState: IAttribute = {
    attribute_name: '',
    attribute_items: []
  }

  const [attribute, dispatch] = useReducer((state: IAttribute, action: IAction) => {
    if (action.type === 'update') {
      console.log('payload: ', action.payload)
      return {
        ...state,
        [action.payload.key]: action.payload.value
      }
    }
    if (action.type === 'update_item') {
      console.log('payload_item: ', action.payload)
      // state.attribute_items.map((attribute_item, index) => {
      //   if (index === action.payload.key.index) {
      //     attribute_item = action.payload.value
      //   }
      // })

      console.log(state);
      return {
        ...state,
        [action.payload.key.key[0]]: action.payload.value
      }
    }
    if (action.type === 'add_item') {
      console.log('payload_item: ', action.payload)
      return {
        ...state,
        [action.payload.key.key[action.payload.key.index]]: [...state.attribute_items, action.payload.value]
      }
    }
    return { ...state, [action.type]: action.payload }
  }, initialState)

  useEffect(() => {
    getAttributes()
      .then((response: any) => {
        console.log(JSON.stringify(response.data.data.values));
        setAttributes(response.data.data.values);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [activeAttribute, setActiveAttribute] = useState<AttributeData>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attributes, setAttributes] = useState<AttributeData[]>([]);
  const [fields, setField] = useState<Array<any>>([1]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.currentTarget.name;
    const value = event.currentTarget.value

    const payload = { key, value }
    console.log('payload: ', payload)

    dispatch({ type: 'update', payload })
  }

  const handleAttributeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.currentTarget.name;
    const value = event.currentTarget.value

    const arr = key.split('__')

    const keyObj = {
      key: arr[0],
      index: parseInt(arr[1], 10)
    }
    const payload = { key: keyObj, value }

    dispatch({ type: 'update_item', payload })
  }

  const addAttributeItem = async (event: any) => {
    const key = event.currentTarget.name;
    const value = event.currentTarget.value

    const arr = key.split('__')

    const keyObj = {
      key: arr[0],
      index: arr[1]
    }
    const payload = { keyObj, value }

    dispatch({ type: 'update_item', payload })
  }

  const saveAttribute = async () => {
    console.log(attribute)
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const rows: GridRowsProp = attributes.map((attribute: any) => {
    return {
      id: attribute.id,
      attribute: attribute.attribute_name,
      items: attribute.items
        ? attribute.items?.length
        : 0,
      Products: Math.floor(Math.random() * 3020),
      created_at: attribute.created_at,
      Searches: Math.floor(Math.random() * 100),
    };
  });

  const columns: GridColDef[] = [
    { field: "attribute", headerName: "Attributes", width: 300 },
    { field: "items", headerName: "items", width: 200 },
    { field: "created_at", headerName: "Date Added", width: 200 },
    { field: "status", headerName: "STATUS", width: 200 },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   width: 200,
    //   renderCell: (params) => {
    //     return (
    //       <div className="flex justify-center items-center gap-3">
    //         <svg
    //           onClick={() => navigate(`./${params.row.id}`)}
    //           className="cursor-pointer"
    //           width="24"
    //           height="24"
    //           viewBox="0 0 24 24"
    //           fill="none"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path
    //             d="M15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12Z"
    //             stroke="black"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //           />
    //           <path
    //             d="M2.45703 12C3.73103 7.943 7.52203 5 11.999 5C16.477 5 20.267 7.943 21.541 12C20.267 16.057 16.477 19 11.999 19C7.52203 19 3.73103 16.057 2.45703 12Z"
    //             stroke="black"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //           />
    //         </svg>

    //         <svg
    //           onClick={() => {
    //             setActiveAttribute(
    //               attributes.find(
    //                 (attribute: any) => attribute?.id === params.row.id
    //               )
    //             );
    //             openModal();
    //           }}
    //           className="cursor-pointer"
    //           xmlns="http://www.w3.org/2000/svg"
    //           width="24"
    //           height="24"
    //           viewBox="0 0 24 24"
    //           fill="none"
    //         >
    //           <path
    //             d="M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7M10 11V17M14 11V17M15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7M4 7H20"
    //             stroke="black"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //           />
    //         </svg>
    //       </div>
    //     );
    //   },
    // },
  ];

  const removeField = (index: number) => {
    console.log(index)

    const newFields = [...fields];
    newFields.splice(index, 1);
    setField(newFields);

    // const newFields = fields.filter((field, newIndex) => index !== newIndex);
    // setField(newFields);
  }

  const badgeData = [
    {
      id: 1,
      orders: 356,
      link: "./#",
      image: (
        <Icon
          icon="entypo:bar-graph"
          color="#d65d5b"
          width={24}
          height={24}
        />
      ),
      title: "Attributes",
    },
    {
      id: 2,
      orders: 242,
      link: "./#",
      image: (
        <Icon
          icon="tabler:list-details"
          color="#d65d5b"
          width={24}
          height={24}
        />
      ),
      title: "Specifications",
    },
  ];

  const handleDeleteCategory = async (id: any) => {
    await deleteAttribute(id).then((response) => {
      const updatedAttribute = attributes.filter(
        (attribute: AttributeData) => attribute.id !== id
      );
      setAttributes(updatedAttribute);
    });

    closeModal();
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col gap-4 bg-[#F5F5F5]">
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <p className="text-[36px] font-bold">Product Attributes</p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <Badge badgeData={badgeData} />
          </div>
          <div className="flex justify-center gap-4 items-center w-[75%]">
            <input className="border w-[60%] border-[#B3B7BB] rounded-2xl placeholder:text-center placeholder:text-[#B3B7BB] placeholder:font-bold py-5" type="text" placeholder="Search" />
            <button onClick={() => setIsModalOpen(true)} className="py-5 w-[40%] bg-[#D65D5B] text-[#fff] text-center rounded-2xl font-bold">Create Attribute</button>
          </div>
          <div className="bg-[white]">
            <DataGrid
              rows={rows}
              columns={columns}
              onRowClick={(params) =>
                params.row.onClick && params.row.onClick()
              }
              className="cursor-pointer"
            />
          </div>
          {/* <PopUpModal isOpen={isModalOpen} onClose={closeModal}>
            <div className="flex flex-col gap-4 p-3">
              <div className="flex justify-between">
                <h1>Delete Product Attribute</h1>
              </div>
              <div className="flex p-3 gap-5 bg-[#F1F4FF] items-end">
                <div className="flex-1">
                  <p>{activeAttribute?.attribute_name}</p>
                  <small>Created on: {activeAttribute?.created_at}</small>
                </div>
                <div className="flex flex-col">
                  <p>
                    {activeAttribute
                      ? activeAttribute?.attribute_items?.length
                      : 0}
                  </p>
                  <small className="text-xs">items</small>
                </div>
                <div className="flex flex-col">
                  <p>102</p>
                  <small className="text-xs">Products</small>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button className="w-48 h-10 pt-2.5 pb-3 rounded-sm border text-[#E51B48] text-sm font-medium font-['Inter'] border-[#E51B48] justify-center items-center">
                  cancel
                </button>
                <button
                  className="w-48 h-10 pt-2.5 pb-3 rounded-sm border border-[#E51B48] text-brand-bg text-sm font-medium font-['Inter'] bg-[#E51B48] justify-center items-center"
                  onClick={() =>
                    handleDeleteCategory(
                      activeAttribute ? activeAttribute.id : ""
                    )
                  }
                >
                  confirm
                </button>
              </div>
            </div>
          </PopUpModal> */}
          <PopUpModal isOpen={isModalOpen} onClose={closeModal}>
            <div className="flex flex-col justify-between min-h-[500px] gap-3 py-4 px-4">
              {/* <form className="flex h-full flex-col justify-between" action=""> */}
              <div className="flex flex-col pt-14 gap-3 px-14">
                <div className="flex gap-1 w-full bg-[#efefef] p-4 rounded-lg pr-32">
                  <label className="font-bold" htmlFor="name">Attributes</label>
                  <input className="rounded-2xl placeholder:text-left px-3 bg-[transparent] placeholder:text-[#B3B7BB] placeholder:font-semibold" onChange={handleInputChange} name={"attribute_name"} value={attribute.attribute_name} placeholder="Enter Attribute Name" type="text" />
                </div>
                <div className="flex w-full">
                  <div className="flex flex-col justify-center  mt-6 items-center gap-2">
                    {
                      fields.map((attribute_item: any, index: number) => (
                        <div className="flex w-full justify-start items-center gap-2">
                          <input onChange={handleAttributeChange} className="border py-1 outline-none border-[#B3B7BB] rounded-2xl placeholder:text-left placeholder:text-[#B3B7BB] placeholder:text-[8.78px] placeholder:font-bold px-5" name={`attribute_items__${index}`} type="text" />
                          <div onClick={() => removeField(index)} className="rounded-full bg-#efefef] p-2">
                            <Icon icon="ic:round-delete" color="#d65d5b" width="15" height="15" />
                          </div>
                        </div>
                      ))
                    }
                    <button onClick={(e) => { e.preventDefault(); setField([...fields, 1]) }} className="text-[#279F51] font-bold bg-[transparent]">Add + </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={saveAttribute} className="py-5 w-[40%] bg-[#D65D5B] text-[#fff] text-center rounded-2xl font-bold">Save</button>
              </div>
              {/* </form> */}
            </div>
          </PopUpModal>
        </div>
      </Layout>
    </>
  );
}
