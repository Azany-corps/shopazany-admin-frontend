import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const BackButton = () => {
  function handleBack() {
    window.history.back();
  }
  return (
    <button onClick={handleBack} className="px-4 pl-0 flex smm:px-20 items-center gap-2 text-[#515151] ">
      <ArrowBackIcon />
      Back
    </button>
  );
};

export default BackButton;
