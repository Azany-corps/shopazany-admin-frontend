import React, { useState, useEffect } from "react";
import { Switch, FormControlLabel } from "@material-ui/core";

interface SwitchProps {
  onStockStatusChange: (stockStatus: string) => void;
}

const MaterialSwitch: React.FC<SwitchProps> = ({ onStockStatusChange }) => {
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    const stockStatus = isChecked ? "In Stock" : "Out of Stock";
    onStockStatusChange(stockStatus);
  }, [isChecked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const stockStatus = isChecked ? "In Stock" : "Out of Stock";

  return (
    <FormControlLabel
      control={<Switch checked={isChecked} onChange={handleChange} />}
      label={`${stockStatus}`}
      labelPlacement="start"
    />
  );
};

export default MaterialSwitch;

