import { useEffect, useState } from "react";
import Layout from "../../../components/Core/Layout";
import { Icon } from "@iconify/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getAttributeById } from "../../../services/attribbutes.service";
import { error } from "console";

export default function EditAttribute() {
  const navigate = useNavigate();
  const [attribute, setAttribute] = useState("");
  const [attributeDescription, setAttributeDescription] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [attribute_item, setAttribute_item] = useState<string[]>([]);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: any) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      addWordToArray();
    }
  };
  const { attributeId } = useParams();
  useEffect(() => {
    getAttributeById(String(attributeId))
      .then((response: any) => {
         setAttribute(response.data.data.values[0].attribute_name)
        const items = response.data.data.values[0].attribute_items.map(
          (item: any) => item.item_name
        );
        setAttribute_item(items);
        return;
      })
      .catch((error) => {
        //  console.log(error.message);
        toast.error(error?.response?.data?.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      });
  }, []);

  const addWordToArray = () => {
    const newWord = inputValue.trim();
    if (newWord !== "") {
      setAttribute_item([...attribute_item, newWord]);
      setInputValue("");
    }
  };

  const handleSubmit = (event: any) => {
    event?.preventDefault();
    if (
      attribute.trim() === "" ||
      //    attributeDescription.trim() === "" ||
      attribute_item.some((item) => item.trim() === "")
    ) {
      // Show a toast error message for validation failure
      toast.error("Please fill in all required fields.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    let data = new FormData();
    data.append("attribute_name", attribute);
    data.append("about", attributeDescription);

    attribute_item.forEach((attributeItem, index) => {
      data.append(`attribute_item[${index}]`, attributeItem);
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://test.shopazany.com/api/auth/admin/store/create_attribute",
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
        event.target.reset();
        navigate("/products/categories/attributes");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message, {
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
        <form
          className="flex flex-col gap-4 bg-[#F5F5F5] "
          onSubmit={(e: any) => handleSubmit(e)}
        >
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <p className="text-[36px] font-bold">Edit Attribute</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4 shadow-md w-[90%] lgm:w-[65%]">
            <div className="flex flex-col gap-4  p-3">
              <div className="form-group flex flex-col gap-1">
                <label htmlFor="attribute">Attribute Name</label>
                <input
                  className="p-3 border border-[#51515183] rounded-md"
                  type="text"
                  placeholder="Enter attribute name"
                  value={attribute}
                  required={true}
                  onChange={(e) => setAttribute(e.target.value)}
                />
              </div>
              <div className="form-group flex flex-col gap-1">
                <label htmlFor="attribute-description">
                  Attribute Description
                </label>
                <textarea
                  className="p-3 border border-[#51515183] rounded-md"
                  rows={6}
                  //   required={true}
                  placeholder="Enter attribute description"
                  value={attributeDescription}
                  onChange={(e) => setAttributeDescription(e.target.value)}
                />
              </div>

              <div className="form-group flex flex-col gap-1">
                <label htmlFor="attributeItem">Attribute Item</label>
                <div className="flex min-h-16  gap-2 flex-wrap">
                  {attribute_item.map((word, index) => (
                    <div
                      className="p-1 bg-brand-light-blue rounded-md flex h-fit items-center"
                      key={index}
                    >
                      <span className="mr-1 text-sm">{word}</span>
                      <span
                        className="cursor-pointer p-1"
                        onClick={() => {
                          const updatedItems = attribute_item.filter(
                            (_, i) => i !== index
                          );
                          setAttribute_item(updatedItems);
                        }}
                      >
                        x
                      </span>
                    </div>
                  ))}
                </div>
                <input
                  className="p-3 border border-[#51515183] rounded-md"
                  type="text"
                  placeholder="Input Items"
                  //   required={true}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                />
              </div>
            <div className="flex justify-center items-center w-full">
              <button
                className="border rounded-lg border-[#E51B48] bg-[#E51B48] text-[#fff] p-3 px-4  w-full"
                type="submit"
              >
                Update Attribute
              </button>
            </div>
            </div>
          </div>
        </form>
      </Layout>
    </>
  );
}
