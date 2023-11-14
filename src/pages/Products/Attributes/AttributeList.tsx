import { useEffect, ChangeEvent, useState, useReducer } from "react";
import LayoutComp from "../../../components/Core/LayoutComp";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import Badge from "../../../components/Products/Badge";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PopUpModal from "../../../components/Core/PopUp";
import {
  deleteAttribute,
  getAttributes,
  createAttribute,
  getAttributeById,
  updateAttributeById,
  getAttributeByStatus
} from "../../../Services/attribbutes.service";

interface AttributeData {
  id: number | string;
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
  attribute_items: Array<string>;
}

type IAction = | {
  type: 'update' | 'update_item' | 'remove_item' | 'fetch' | 'reset' | 'add_item';
  payload?: any;
}

export default function AttributeList() {
  const [activeAttributeId, setActiveAttributeId] = useState<number | string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [submit, setSubmit] = useState<boolean>(false)
  const [attributes, setAttributes] = useState<AttributeData[]>([]);

  const initialState: IAttribute = {
    attribute_name: '',
    attribute_items: ['']
  }

  const [attribute, dispatch] = useReducer((state: IAttribute, action: IAction) => {
    if (action.type === 'update') {
      return {
        ...state,
        [action.payload.key]: action.payload.value
      }
    }
    if (action.type === 'update_item') {
      const newAttributeState = [...state.attribute_items]
      newAttributeState[action.payload.key.index] = action.payload.value;

      return {
        ...state,
        [action.payload.key.key]: newAttributeState
      }
    }
    if (action.type === 'remove_item') {
      const newAttributeState = [...state.attribute_items]
      newAttributeState.splice(action.payload.value, 1);

      return {
        ...state,
        [action.payload.key]: newAttributeState
      }
    }
    if (action.type === 'add_item') {
      return {
        ...state,
        attribute_items: [...state.attribute_items, '']
      }
    }
    if (action.type === 'reset') {
      return {
        ...initialState
      }
    }
    if (action.type === 'fetch') {
      console.log('act: ', action.payload)
      return {
        ...state,
        attribute_name: action.payload.attribute_name,
        attribute_items: [...action.payload.items]
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
  }, [submit]);

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
    dispatch({ type: 'add_item' })
  }

  const saveAttribute = async () => {
    console.log(attribute)
    const attribute_name = attribute.attribute_name;
    const attribute_items = [...attribute.attribute_items]
    const status = 'Active'

    await createAttribute(attribute_name, attribute_items, status)
      .then((response: any) => {
        setSubmit(!submit);
        dispatch({ type: 'reset' });
        closeModal()
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const updateAttribute = async () => {
    console.log(attribute)
    const attribute_name = attribute.attribute_name;
    const attribute_items = [...attribute.attribute_items]
    const status = 'Active'
    const id = activeAttributeId

    await updateAttributeById(id, attribute_name, attribute_items, status)
      .then((response: any) => {
        setSubmit(!submit);
        dispatch({ type: 'reset' });
        setIsUpdateModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const delAttribute = async () => {
    const id = activeAttributeId
    await deleteAttribute(id).then((response) => {
      setSubmit(!submit);
      dispatch({ type: 'reset' });
      setIsUpdateModalOpen(false);
    })
      .catch((error) => {
        console.log(error);
      });
  }

  const getAttributesByStatus = async (status: string) => {
    await getAttributeByStatus(status).then((response) => {
      setAttributes(response.data.data.values);
    })
      .catch((error) => {
        console.log(error);
      });
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    dispatch({ type: 'reset' });
    setIsModalOpen(false);
  };

  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };


  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openUpdateModal = async (id: number) => {
    console.log('id: ', id)
    setActiveAttributeId(id)

    await getAttributeById(id)
      .then((response: any) => {
        console.log('data: ', response.data.data.values);
        const payload = {
          ...response.data.data.values[0]
        }
        dispatch({ type: 'fetch', payload })
      })
      .catch((error) => {
        console.log(error);
      });
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    dispatch({ type: 'reset' });
    setIsUpdateModalOpen(false);
  };

  const navigate = useNavigate();

  const rows: GridRowsProp = attributes.map((attribute: any) => {
    return {
      id: attribute.id,
      attribute: attribute.attribute_name,
      items: attribute.items
        ? attribute.items?.length
        : 0,
      status: attribute.status,
      // status: (attribute: any) => {
      //   return (
      //     <>
      //       {
      //         attribute.status === "Active" ? (
      //           <span className="py-1 bg-[#dbf3e6] text-[#279F51] font-bold text-xs w-[60px]">active</span>
      //         ) : (
      //           <span className="py-1 bg-[#fff6d6] text-[#FFC600] font-bold text-xs w-[60px]">inactive</span>
      //         )
      //       }
      //     </>
      //   )
      // },
      count_category: attribute.count_category,
      created_at: attribute.created_at,
      onClick: () => openUpdateModal(attribute.id),
    };
  });

  const columns: GridColDef[] = [
    { field: "attribute", headerName: "Attributes", width: 200 },
    { field: "items", headerName: "Items", width: 200 },
    { field: "count_category", headerName: "Category Count  ", width: 200 },
    { field: "created_at", headerName: "Date Added", width: 300 },
    { field: "status", headerName: "STATUS", width: 200 },
  ];

  const removeItem = (index: number) => {
    const payload = {
      key: 'attribute_items',
      value: index
    }
    dispatch({ type: 'remove_item', payload })
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
          width={18}
          height={18}
        />
      ),
      title: "Total Attributes",
    },
    {
      id: 2,
      orders: 242,
      link: "./#",
      image: (
        <Icon
          icon="entypo:bar-graph"
          color="#d65d5b"
          width={18}
          height={18}
        />
      ),
      title: "Total Published Attribute",
    },
    {
      id: 2,
      orders: 242,
      link: "./#",
      image: (
        <Icon
          icon="entypo:bar-graph"
          color="#d65d5b"
          width={18}
          height={18}
        />
      ),
      title: "Total Drafted Attribute",
    },
  ];

  const handleDeleteCategory = async (id: any) => {
    await deleteAttribute(id).then((response) => {
      setSubmit(!submit);
      setIsDeleteModalOpen(false);
    });

    closeModal();
  };

  return (
    <>
      <LayoutComp title="Attributes and Specification">
        <div className="flex flex-col gap-4 bg-[#F5F5F5]">
          {/* <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <p className="text-[36px] font-bold">Product Attributes</p>
            </div>
          </div> */}
          <div className="flex mt-4 flex-row items-center gap-4">
            <Badge badgeData={badgeData} />
          </div>
          <div className="flex justify-center gap-8 items-center w-[75%]">
            <input className="border w-[60%] border-[#B3B7BB] rounded-2xl placeholder:text-center placeholder:text-xs placeholder:text-[#B3B7BB] placeholder:font-bold py-3 bg-[transparent]" type="text" placeholder="Search" />
            <div className="flex relative border justify-center items-center w-[60%] border-[#B3B7BB] rounded-2xl text-xs text-[#B3B7BB] font-bold py-[15px]">
              <p onClick={toggleFilterModal} className="hover:cursor-pointer">
                Filter
              </p>
              {
                isFilterModalOpen && (
                  <div className="flex absolute top-14 z-40 shadow-md text-sm text-[#000] bg-white flex-col py-2 w-full rounded-2xl justify-center items-center">
                    <span onClick={() => getAttributesByStatus("Active")} className="w-full text-center py-2">Active</span>
                    <span onClick={() => getAttributesByStatus("Inactive")} className="w-full text-center py-2">Inactive</span>
                  </div>
                )
              }

            </div>
            <button onClick={() => setIsModalOpen(true)} className="py-[15px] w-[40%] bg-[#D65D5B] text-[#fff] text-xs text-center rounded-2xl font-bold">Create Attribute</button>
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
          <PopUpModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
            <div className="flex flex-col gap-4 p-3">
              <div className="flex justify-between">
                <h1>Delete Product Attribute</h1>
              </div>
              <div className="flex p-3 gap-5 bg-[#F1F4FF] items-end">
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
                      activeAttributeId
                    )
                  }
                >
                  confirm
                </button>
              </div>
            </div>
          </PopUpModal>
          <PopUpModal isOpen={isModalOpen} onClose={closeModal}>
            <div className="flex flex-col justify-between min-h-[500px] gap-3 py-4 px-4">
              {/* <form className="flex h-full flex-col justify-between" action=""> */}
              <div className="flex flex-col pt-14 gap-3 px-14">
                <div className="flex justify-center items-center gap-1 w-full bg-[#efefef] p-4 rounded-lg pr-32">
                  <label className="font-bold" htmlFor="name">Attributes</label>
                  <input className="rounded-2xl border-none outline-none placeholder:text-left px-3 bg-[transparent] placeholder:text-[#B3B7BB] placeholder:font-semibold" onChange={handleInputChange} name={"attribute_name"} value={attribute.attribute_name} placeholder="Enter Attribute Name" type="text" />
                </div>
                <div className="flex w-full">
                  <div className="flex flex-col justify-center  mt-6 items-center gap-2">
                    {
                      attribute.attribute_items.map((attribute_item: any, index: number) => (
                        <div className="flex w-full justify-start items-center gap-2">
                          <input onChange={handleAttributeChange} className="border py-1 outline-none border-[#B3B7BB] rounded-2xl placeholder:text-left placeholder:text-[#B3B7BB] placeholder:text-[8.78px] placeholder:font-bold px-5" value={attribute_item} id={`attribute_items__${index}`} name={`attribute_items__${index}`} type="text" />
                          <div onClick={() => removeItem(index)} className="rounded-full bg-#efefef] p-2">
                            <Icon icon="ic:round-delete" color="#d65d5b" width="15" height="15" />
                          </div>
                        </div>
                      ))
                    }
                    <button onClick={addAttributeItem} className="text-[#279F51] font-bold bg-[transparent]">Add + </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center gap-7">
                <button className="py-[15px] text-xs bg-[transparent] w-[25%] border border-[#D65D5B] text-[#000] text-center rounded-2xl font-bold">Save as draft</button>
                <button onClick={saveAttribute} className="py-[15px] text-xs w-[25%] bg-[#D65D5B] text-[#fff] text-center rounded-2xl font-bold">Create</button>
              </div>
              {/* </form> */}
            </div>
          </PopUpModal>
          <PopUpModal isOpen={isUpdateModalOpen} onClose={closeUpdateModal}>
            <div className="flex flex-col justify-between min-h-[500px] gap-3 py-4 px-4">
              {/* <form className="flex h-full flex-col justify-between" action=""> */}
              <div className="flex flex-col pt-14 gap-3 px-14">
                <div className="flex justify-center items-center gap-1 w-full bg-[#efefef] p-4 rounded-lg pr-32">
                  <label className="font-bold" htmlFor="name">Attributes</label>
                  <input className="rounded-2xl border-none outline-none placeholder:text-left px-3 bg-[transparent] placeholder:text-[#B3B7BB] placeholder:font-semibold" onChange={handleInputChange} name={"attribute_name"} value={attribute.attribute_name} placeholder="Enter Attribute Name" type="text" />
                </div>
                <div className="flex w-full">
                  <div className="flex flex-col justify-center  mt-6 items-center gap-2">
                    {
                      attribute.attribute_items.map((attribute_item: any, index: number) => (
                        <div className="flex w-full justify-start items-center gap-2">
                          <input onChange={handleAttributeChange} className="border py-1 outline-none border-[#B3B7BB] rounded-2xl placeholder:text-left placeholder:text-[#B3B7BB] placeholder:text-[8.78px] placeholder:font-bold px-5" value={attribute_item} id={`attribute_items__${index}`} name={`attribute_items__${index}`} type="text" />
                          <div onClick={() => removeItem(index)} className="rounded-full bg-#efefef] p-2">
                            <Icon icon="ic:round-delete" color="#d65d5b" width="15" height="15" />
                          </div>
                        </div>
                      ))
                    }
                    <button onClick={addAttributeItem} className="text-[#279F51] font-bold bg-[transparent]">Add + </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center gap-7">
                <button onClick={delAttribute} className="py-[15px] text-xs bg-[transparent] w-[25%] border border-[#D65D5B] text-[#000] text-center rounded-2xl font-bold">Delete attribute</button>
                <button onClick={updateAttribute} className="py-[15px] text-xs w-[25%] bg-[#D65D5B] text-[#fff] text-center rounded-2xl font-bold">Save Changes</button>
              </div>
              {/* </form> */}
            </div>
          </PopUpModal>
        </div>
      </LayoutComp>
    </>
  );
}
