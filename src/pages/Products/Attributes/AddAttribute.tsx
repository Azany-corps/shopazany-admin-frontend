import { useEffect, useState } from "react";
import Layout from "../../../components/Core/Layout";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

interface SubAttribute {
  name: string;
  description: string;
}

export default function AddAttribute() {
  const [attribute, setAttribute] = useState("");
  const [attributeDescription, setAttributeDescription] = useState("");
  const [subAttributeData, setSubAttributeData] = useState<SubAttribute[]>([]);
  

  const handleSubAttributeChange = (
    index: number,
    fieldName: keyof SubAttribute,
    value: string
  ) => {
    const updatedSubAttributeData = [...subAttributeData];
    updatedSubAttributeData[index][fieldName] = value;
    setSubAttributeData(updatedSubAttributeData);
  };
  useEffect(() => {
    console.log(subAttributeData);
  }, [subAttributeData]);

  return (
    <>
      <Layout>
        <form className="flex flex-col gap-4 bg-[#F5F5F5]">
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <p className="text-[36px] font-bold">Add New Attribute</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4 w-[90%] lgm:w-[65%]">
            <div className="flex flex-col gap-4 shadow-md p-3">
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
                  required={true}
                  placeholder="Enter attribute description"
                  value={attributeDescription}
                  onChange={(e) => setAttributeDescription(e.target.value)}
                />
              </div>
              <div className="form-group flex flex-col gap-1">
                <label htmlFor="attributeItem">Attribute Item</label>
                <input
                  className="p-3 border border-[#51515183] rounded-md"
                  type="text"
                  placeholder="Input Items"
                  value={attribute}
                  required={true}
                  onChange={(e) => setAttribute(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-center items-center w-full">
              <button
                className="border border-[#E51B48] bg-[#E51B48] text-[#fff] p-3 px-4 rounded-sm w-full"
                // onClick={}
              >
                Add Attribute
              </button>
            </div>
          </div>
        </form>
      </Layout>
    </>
  );
}
