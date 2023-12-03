import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa"; // Import the cancel icon
import { FormSelect } from "../../components/Inputs";

interface ColorizedText {
  id: string;
  text: string[];
}

interface TextColorizerProps {
  attributeText: string[];
  name: string;
  id: string;
  onColorizedTextsChange: (colorizedTexts: ColorizedText) => void;
}

const TextColorizer: React.FC<TextColorizerProps> = ({
  attributeText,
  name,
  id,
  onColorizedTextsChange,
}) => {
  const [colorizedTexts, setColorizedTexts] = useState<ColorizedText>({
    id: id,
    text: [],
  });

  // const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { name, value } = event?.target;
  //   // setFormData({ ...formData, [name]: value });
  // };

  const handleTextClick = (text: string) => {
    // Check if the text is already in the array
    if (!colorizedTexts.text.find((item) => item === text)) {
      // Choose a random color (you can customize this logic)

      // Add the clicked text and color to the array
      setColorizedTexts({
        ...colorizedTexts,
        text: [...colorizedTexts.text, text],
      });
    }
  };

  const handleCancelClick = (textToRemove: string) => {
    // Remove the item from the array based on the text
    const newText = colorizedTexts.text.filter((item) => item !== textToRemove);

    setColorizedTexts({ ...colorizedTexts, text: [...newText] });
  };

  useEffect(() => {
    onColorizedTextsChange(colorizedTexts);
  }, [colorizedTexts]);

  return (
    <div>
      <p className="block text-sm mb-2 font-semibold general-font text-black uppercase">
        {name}
      </p>
      <div className="flex flex-col gap-4">
        <div className="bg-[#F5F5F5] border general-font border-[#C1C1C1] w-full py-5 px-6 rounded-lg flex items-center">
          {/* <FormSelect
            name="Certification"
            id="certification"
            value={"Ff"}
            onChange={handleChange}
            options={[
              { label: "Euro", value: "EUR" },
              { label: "US Dollars", value: "USD" },
            ]}
            optionsLabel="Certifications"
            labelStyle="block text-sm mb-2 font-normal general-font capitalize text-black"
          /> */}
          {colorizedTexts.text.map((item, index) => (
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
              <span style={{ marginRight: "10px" }}>{item}</span>
              <FaTimes
                style={{
                  cursor: "pointer",
                }}
                className="hover:cursor-pointer"
                onClick={() => handleCancelClick(item)}
              />
            </span>
          ))}
        </div>

        {/* Click event listeners for each word */}
        <div className="flex flex-wrap gap-4">
          {attributeText?.map((text) => (
            <span
              key={text}
              className="text-sm hover:cursor-pointer font-normal text-white py-2 px-3 rounded-md bg-gray-600"
              onClick={() => handleTextClick(text)}
            >
              {`${text}`}
            </span>
          ))}
        </div>
        {/* Add more words and paragraphs with onClick handlers */}
      </div>
    </div>
  );
};

export default TextColorizer;
