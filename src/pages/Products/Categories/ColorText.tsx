import React, { useState, useEffect } from "react";
import { Icon } from '@iconify/react';

interface ColorizedText {
  id: string;
  name: string;
}

interface Attribute {
  id: number;
  name: string;
}

interface TextColorizerProps {
  attributes: Attribute[];
  onAttributesChange: (attributes: Attribute[]) => void;
}

const TextColorizer: React.FC<TextColorizerProps> = ({
  attributes,
  onAttributesChange
}) => {
  const [selectedAttributes, setSelectedAttributes] = useState<Attribute[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event?.target;
    const newAttribute = attributes.find((attribute: Attribute) => {
      if (attribute.id.toString() === value) {
        return attribute
      }
    })
    if (!newAttribute) return
    handleTextClick(newAttribute)
  };

  const handleTextClick = (attribute: Attribute) => {
    // Check if the text is already in the array
    if (!selectedAttributes.find((item) => item.id === attribute.id)) {
      // Choose a random color (you can customize this logic)

      // Add the clicked text and color to the array
      setSelectedAttributes([...selectedAttributes, attribute])
    }
  };

  const handleCancelClick = (id: number) => {
    // Remove the item from the array based on the text
    const newAttributes = selectedAttributes.filter((item) => item.id !== id)

    setSelectedAttributes([...newAttributes]);
  };

  useEffect(() => {
    onAttributesChange(selectedAttributes);
  }, [selectedAttributes]);


  return (
    <div>
      <div className="flex w-full flex-col gap-4">
        <div className="bg-[#fff] border general-font rounded-[16px] min-h-[54px] border-[#B3B7BB] w-full py-5 px-6 flex items-center">
          {selectedAttributes.length !== 0 ?
            selectedAttributes.map((item, index) => (
              <span
                key={index}
                style={{
                  background: "#FFD9D9",
                  padding: "10px",
                  borderRadius: "10px",
                  marginRight: "5px",
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  fontWeight: 400,
                  fontSize: "14px",
                }}
              >
                <span style={{ marginRight: "10px" }}>{item.name}</span>
                <span
                  className="hover:cursor-pointer"
                  onClick={() => handleCancelClick(item.id)}
                >
                  <Icon icon="ic:outline-cancel" />
                </span>
              </span>
            )) : (
              <span className="w-full text-sm text-[#B3B7BB] font-[700] text-center">Select attributes below</span>
            )
          }
        </div>

        {/* Click event listeners for each word */}
        <div className="flex flex-wrap gap-4">
          <div className="w-full">
            <select
              id="attribute"
              name="attribute"
              onChange={handleChange}
              className={`bg-[#F5F5F5] border general-font border-[#C1C1C1] text-[black] text-sm rounded-[10px] focus:ring-[#D65D5B] focus:border-[#D65D5B] block w-full py-5 pl-6`}
            >
              <option selected>Select Attribute</option>
              {attributes.map((attribute: Attribute) => (
                <option key={attribute.id} value={attribute.id}>
                  {attribute.name}
                </option>
              ))}
            </select>
            {/* {error && touched ? <Error error={error} /> : null} */}
          </div>
        </div>
        {/* Add more words and paragraphs with onClick handlers */}
      </div>
    </div>
  );
};

export default TextColorizer;
